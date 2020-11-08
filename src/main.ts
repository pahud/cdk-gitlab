import * as ec2 from '@aws-cdk/aws-ec2';
import * as eks from '@aws-cdk/aws-eks';
import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';
import * as runner from './runner';

export interface ProviderProps {
  readonly vpc?: ec2.IVpc;
}

export interface RoleProps {
  readonly accountId: string;
  readonly externalId: string;
}

export interface EksClusterOptions {
  /**
   * create serivce account and rbac ClusterRoleBinding for gitlab
   * @see https://docs.gitlab.com/ee/user/project/clusters/add_remove_clusters.html#add-existing-cluster
   *
   * @default true
   */
  readonly rbac?: boolean;
  /**
   * cluster properties for Amazon EKS cluster
   */
  readonly clusterOptions: eks.ClusterProps;
}

export interface FargateEksClusterOptions {
  /**
   * create serivce account and rbac ClusterRoleBinding for gitlab
   * @see https://docs.gitlab.com/ee/user/project/clusters/add_remove_clusters.html#add-existing-cluster
   *
   * @default true
   */
  readonly rbac?: boolean;
  /**
   * cluster properties for Amazon EKS cluster
   */
  readonly clusterOptions: eks.FargateClusterProps;
}

const gitLabClusterRoleBinding = {
  apiVersion: 'rbac.authorization.k8s.io/v1beta1',
  kind: 'ClusterRoleBinding',
  metadata: { name: 'gitlab-admin' },
  roleRef: {
    apiGroup: 'rbac.authorization.k8s.io',
    kind: 'ClusterRole',
    name: 'cluster-admin',
  },
  subjects: [
    {
      kind: 'ServiceAccount',
      name: 'gitlab',
      namespace: 'kube-system',
    },
  ],
};

/**
 * The Provider to create GitLab Integrations with AWS
 */
export class Provider extends cdk.Construct {
  public gitlabEksRole?: iam.IRole;
  readonly vpc: ec2.IVpc;
  constructor(scope: cdk.Construct, id: string, props: ProviderProps = {}) {
    super(scope, id);

    const stack = cdk.Stack.of(this);

    this.vpc = props.vpc ?? new ec2.Vpc(this, 'Vpc', { natGateways: 1 });

    new cdk.CfnOutput(this, 'Region', { value: stack.region });

  }
  public createFargateRunner(executor?: runner.FargateJobExecutor) {
    const token = this.node.tryGetContext('GITLAB_REGISTRATION_TOKEN') || process.env.GITLAB_REGISTRATION_TOKEN;
    if (!token) {
      throw new Error('missing GITLAB_REGISTRATION_TOKEN in the context variable');
    }
    new runner.FargateRunner(this, 'FargateRunner', {
      vpc: this.vpc,
      registrationToken: this.node.tryGetContext('GITLAB_REGISTRATION_TOKEN'),
      executor,
    });
  }
  public createEksCluster(scope: cdk.Construct, id: string, props: EksClusterOptions ): eks.Cluster {
    const cluster = new eks.Cluster(scope, id, props.clusterOptions);
    if (props.rbac != false) {
      cluster.addServiceAccount('gitlab');
      cluster.addManifest('ClusterRoleBinding', gitLabClusterRoleBinding);
    }
    return cluster;
  }
  public createFargateEksCluster(scope: cdk.Construct, id: string, props: FargateEksClusterOptions): eks.Cluster {
    const cluster = new eks.FargateCluster(scope, id, props.clusterOptions);
    if (props.rbac != false) {
      cluster.addServiceAccount('gitlab');
      cluster.addManifest('ClusterRoleBinding', gitLabClusterRoleBinding);
    }
    return cluster;
  }
  public createSecurityGroup(): ec2.SecurityGroup {
    const sg = new ec2.SecurityGroup(this, 'GitlabEksSecurityGroup', {
      vpc: this.vpc,
    });
    new cdk.CfnOutput(this, 'SecurityGroup', { value: sg.securityGroupName });
    return sg;
  }
  public createEksServiceRole(): iam.Role {
    return new iam.Role(this, 'GitlabEksServiceRole', {
      managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonEKSClusterPolicy')],
      assumedBy: new iam.ServicePrincipal('eks.amazonaws.com'),
    });
  }
  // this.gitlabEksRole = new iam.Role(this, 'GitlabManagedEksRole', {
  //   assumedBy: new iam.AccountPrincipal(props.accountId),
  //   externalIds: [props.externalId],
  //   inlinePolicies: {
  //     default: policy,
  //   },
  // });
  //   new cdk.CfnOutput(this, 'RoleArn', { value: this.gitlabEksRole.roleArn });
  // }
  public createGitlabManagedEksRole(props: RoleProps) {
    const policy = new iam.PolicyDocument({
      statements: [
        new iam.PolicyStatement({
          actions: [
            'autoscaling:CreateAutoScalingGroup',
            'autoscaling:DescribeAutoScalingGroups',
            'autoscaling:DescribeScalingActivities',
            'autoscaling:UpdateAutoScalingGroup',
            'autoscaling:CreateLaunchConfiguration',
            'autoscaling:DescribeLaunchConfigurations',
            'cloudformation:CreateStack',
            'cloudformation:DescribeStacks',
            'ec2:AuthorizeSecurityGroupEgress',
            'ec2:AuthorizeSecurityGroupIngress',
            'ec2:RevokeSecurityGroupEgress',
            'ec2:RevokeSecurityGroupIngress',
            'ec2:CreateSecurityGroup',
            'ec2:createTags',
            'ec2:DescribeImages',
            'ec2:DescribeKeyPairs',
            'ec2:DescribeRegions',
            'ec2:DescribeSecurityGroups',
            'ec2:DescribeSubnets',
            'ec2:DescribeVpcs',
            'eks:CreateCluster',
            'eks:DescribeCluster',
            'iam:AddRoleToInstanceProfile',
            'iam:AttachRolePolicy',
            'iam:CreateRole',
            'iam:CreateInstanceProfile',
            'iam:CreateServiceLinkedRole',
            'iam:GetRole',
            'iam:ListRoles',
            'iam:PassRole',
            'ssm:GetParameters',
          ],
          resources: ['*'],
        }),
      ],
    });

    this.gitlabEksRole = new iam.Role(this, 'GitlabManagedEksRole', {
      assumedBy: new iam.AccountPrincipal(props.accountId),
      externalIds: [props.externalId],
      inlinePolicies: {
        default: policy,
      },
    });
    const eksAdminRole = this.createEksServiceRole();
    this.createSecurityGroup();
    const subnetIds = this.vpc.selectSubnets({
      subnetType: ec2.SubnetType.PRIVATE,
    }).subnetIds;
    new cdk.CfnOutput(this, 'EksClusterSubnetIds', {
      value: subnetIds.join(','),
    });
    new cdk.CfnOutput(this, 'RoleArn', { value: this.gitlabEksRole.roleArn });
    new cdk.CfnOutput(this, 'EksAdminRole', { value: eksAdminRole.roleName });
  }
}
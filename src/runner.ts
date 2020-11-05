import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';

export interface FargateRunnerProps {
  /**
   * VPC for the fargate
   */
  readonly vpc: ec2.IVpc;
  /**
   * tags for the runner
   */
  readonly tags?: string[];
  /**
   * The security group for Fargate CI task
   */
  readonly securityGroup?: ec2.ISecurityGroup;
  /**
   * subnet for fargate CI task
   */
  readonly fargateJobSubnet?: ec2.SubnetSelection;

  /**
   * GitLab registration token for the runner
   */
  readonly registrationToken: string;
}

export class FargateRunner extends cdk.Construct {
  readonly vpc: ec2.IVpc;
  constructor(scope: cdk.Construct, id: string, props: FargateRunnerProps ) {
    super(scope, id);

    this.vpc = props.vpc;

    const stack = cdk.Stack.of(this);

    const fargateSubnet = this.vpc.selectSubnets(props.fargateJobSubnet);

    const cluster = new ecs.Cluster(this, 'Cluster', { vpc: this.vpc });

    const jobsTask = new ecs.FargateTaskDefinition(this, 'JobsTask', {
      cpu: 256,
      memoryLimitMiB: 512,
    });

    jobsTask.addContainer('ci-coordinator', {
      image: ecs.ContainerImage.fromRegistry('registry.gitlab.com/tmaczukin-test-projects/fargate-driver-debian:latest'),
      logging: new ecs.AwsLogDriver({ streamPrefix: 'GitlabRunnerJob', logRetention: 7 }),
    }).addPortMappings({ containerPort: 22 });

    const runnerTask = new ecs.FargateTaskDefinition(this, 'RunnerTask', {
      cpu: 256,
      memoryLimitMiB: 512,
    });

    const fargateSecurityGroup = props.securityGroup ?? this.createSecurityGroup();

    runnerTask.addContainer('runner', {
      image: ecs.ContainerImage.fromRegistry('registry.gitlab.com/pahud/docker-gitlab-runner-fargate-driver'),
      logging: new ecs.AwsLogDriver({ streamPrefix: 'GitlabRunnerManager', logRetention: 7 }),
      environment: {
        GITLAB_REGISTRATION_TOKEN: props.registrationToken,
        FARGATE_REGION: stack.region,
        FARGATE_CLUSTER: cluster.clusterName,
        FARGATE_SUBNET: fargateSubnet.subnetIds[0],
        FARGATE_SECURITY_GROUP: fargateSecurityGroup.securityGroupId,
        FARGATE_TASK_DEFINITION: `${jobsTask.family}`,
        RUNNER_TAG_LIST: this.synthesizeTags(props.tags ?? ['fargate', 'gitlab', 'aws', 'docker']),
      },
    });

    runnerTask.taskRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonECS_FullAccess'));

    new ecs.FargateService(this, 'RunnerManagerService', {
      cluster,
      taskDefinition: runnerTask,
      securityGroups: [fargateSecurityGroup],
    });
  }
  private synthesizeTags(tags: string[]): string {
    return tags.join(',');
  }
  private createSecurityGroup(): ec2.ISecurityGroup {
    const sg = new ec2.SecurityGroup(this, 'FargateSecurityGroup', { vpc: this.vpc });
    sg.connections.allowInternally(ec2.Port.allTraffic());
    return sg;
  }
}
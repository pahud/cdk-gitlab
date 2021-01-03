import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';

/**
 * Amazon ECS Capacity Providers for AWS Fargate
 */
export enum FargateCapacityProviderType {
  FARGATE = 'FARGATE',
  FARGATE_SPOT = 'FARGATE_SPOT'
}

/**
 * The Capacity Provider strategy
 */
export interface CapacityProviderStrategyItem {
  readonly base?: number;
  readonly weight: number;
  readonly capacityProvider: FargateCapacityProviderType;
}

/**
 * Properties for the FargateRunner
 */
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
  readonly registrationToken?: string;

  /**
   * gitlab URL prefix
   *
   * @default - 'https://gitlab.com'
   */
  readonly gitlabURL?: string;

  /**
   * Fargate job executor options
   */
  readonly executor?: FargateJobExecutor;

  /**
   * Default capacity provider strategy for the Amazon ECS cluster
   *
   * @default DEFAULT_CLUSTER_CAPACITY_PROVIDER_STRATEGY
   */
  readonly clusterDefaultCapacityProviderStrategy?: CapacityProviderStrategyItem[];
  /**
   * Default capacity provider strategy for the Amazon ECS service
   *
   * @default DEFAULT_SERVICE_CAPACITY_PROVIDER_STRATEGY
   */
  readonly serviceDefaultCapacityProviderStrategy?: CapacityProviderStrategyItem[];
}

/**
 * The docker image for the job executor
 */
export class JobExecutorImage {
  /**
   * Debian
   * @see https://gitlab.com/tmaczukin-test-projects/fargate-driver-debian
   */
  public static readonly DEBIAN = JobExecutorImage.of('registry.gitlab.com/tmaczukin-test-projects/fargate-driver-debian:latest');
  /**
   * Node
   * @see https://gitlab.com/aws-fargate-driver-demo/docker-nodejs-gitlab-ci-fargate
   */
  public static readonly NODE = JobExecutorImage.of('registry.gitlab.com/aws-fargate-driver-demo/docker-nodejs-gitlab-ci-fargate:latest');
  /**
   * JSII for AWS CDK
   * @see https://gitlab.com/pahud/docker-jsii-cdk-gitlab-ci-fargate
   *
   */
  public static readonly JSII = JobExecutorImage.of('registry.gitlab.com/pahud/docker-jsii-cdk-gitlab-ci-fargate:latest');
  /**
   * Custom image
   * @param image custom image registry URI
   */
  public static of(image: string) { return new JobExecutorImage(image); }
  /**
   *
   * @param image job executor image URI
   */
  private constructor(public readonly uri: string) { }
}

const CLUSTER_DEFAULT_CAPACITY_PROVIDER = [
  FargateCapacityProviderType.FARGATE,
  FargateCapacityProviderType.FARGATE_SPOT,
];

const DEFAULT_CLUSTER_CAPACITY_PROVIDER_STRATEGY: CapacityProviderStrategyItem[] = [{
  base: 0,
  weight: 1,
  capacityProvider: FargateCapacityProviderType.FARGATE_SPOT,
}];

const DEFAULT_SERVICE_CAPACITY_PROVIDER_STRATEGY: CapacityProviderStrategyItem[] = [
  { base: 0, weight: 0, capacityProvider: FargateCapacityProviderType.FARGATE },
  { weight: 1, capacityProvider: FargateCapacityProviderType.FARGATE_SPOT },
];


/**
 * The FargateRunner
 */
export class FargateRunner extends cdk.Construct {
  readonly vpc: ec2.IVpc;
  constructor(scope: cdk.Construct, id: string, props: FargateRunnerProps ) {
    super(scope, id);

    this.vpc = props.vpc;

    const stack = cdk.Stack.of(this);

    const fargateSubnet = this.vpc.selectSubnets(props.fargateJobSubnet);

    const cluster = new ecs.Cluster(this, 'Cluster', { vpc: this.vpc });
    const cfnCluster = cluster.node.tryFindChild('Resource') as ecs.CfnCluster;
    cfnCluster.addPropertyOverride('CapacityProviders', CLUSTER_DEFAULT_CAPACITY_PROVIDER);
    cfnCluster.addPropertyOverride('DefaultCapacityProviderStrategy', props.serviceDefaultCapacityProviderStrategy ?? DEFAULT_CLUSTER_CAPACITY_PROVIDER_STRATEGY);

    const runnerTask = new ecs.FargateTaskDefinition(this, 'RunnerTask', {
      cpu: 256,
      memoryLimitMiB: 512,
    });

    const fargateSecurityGroup = props.securityGroup ?? this.createSecurityGroup();

    const registrationToken = props.registrationToken ?? (this.node.tryGetContext('GITLAB_REGISTRATION_TOKEN') || process.env.GITLAB_REGISTRATION_TOKEN);

    if (!registrationToken) {
      throw new Error('missing GITLAB_REGISTRATION_TOKEN in the context variable');
    }

    runnerTask.addContainer('runner', {
      image: ecs.ContainerImage.fromRegistry('registry.gitlab.com/pahud/docker-gitlab-runner-fargate-driver'),
      logging: new ecs.AwsLogDriver({ streamPrefix: 'GitlabRunnerManager', logRetention: 7 }),
      environment: {
        GITLAB_REGISTRATION_TOKEN: registrationToken,
        GITLAB_URL: props.gitlabURL ?? 'https://gitlab.com',
        FARGATE_REGION: props.executor?.region ?? stack.region,
        FARGATE_CLUSTER: props.executor?.cluster?.clusterName ?? cluster.clusterName,
        FARGATE_SUBNET: props.executor?.subnet?.subnetId ?? fargateSubnet.subnetIds[0],
        FARGATE_SECURITY_GROUP: props.executor?.securityGroup?.securityGroupId ?? fargateSecurityGroup.securityGroupId,
        FARGATE_TASK_DEFINITION: props.executor?.taskDefinitionArn || new FargateJobExecutor(this, 'JobExecutor').taskDefinitionArn,
        RUNNER_TAG_LIST: this.synthesizeTags(props.tags ?? ['fargate', 'gitlab', 'aws', 'docker']),
      },
    });

    runnerTask.taskRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonECS_FullAccess'));

    const svc = new ecs.FargateService(this, 'RunnerManagerService', {
      cluster,
      taskDefinition: runnerTask,
      securityGroups: [fargateSecurityGroup],
    });
    const cfnService = svc.node.tryFindChild('Service') as ecs.CfnService;
    cfnService.addPropertyDeletionOverride('LaunchType');
    cfnService.addPropertyOverride('CapacityProviderStrategy', props.serviceDefaultCapacityProviderStrategy ?? DEFAULT_SERVICE_CAPACITY_PROVIDER_STRATEGY);
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

/**
 * The properties for the FargateJobExecutor
 */
export interface FargateJobExecutorProps {
  /**
   * The docker image for the job executor container
   */
  readonly image?: JobExecutorImage;
  /**
   * AWS region for the job executor
   */
  readonly region?: string;
  readonly cluster?: ecs.ICluster;
  readonly subnet?: ec2.ISubnet;
  readonly securityGroup?: ec2.ISecurityGroup;
}

/**
 * The FargateJobExecutor
 */
export class FargateJobExecutor extends cdk.Construct {
  /**
   * task definition arn
   */
  readonly taskDefinitionArn: string;
  readonly region: string;
  readonly cluster?: ecs.ICluster;
  readonly subnet?: ec2.ISubnet;
  readonly securityGroup?: ec2.ISecurityGroup;
  constructor(scope: cdk.Construct, id:string, props: FargateJobExecutorProps = {}) {
    super(scope, id);

    this.region = props.region ?? cdk.Stack.of(this).region;
    this.cluster = props.cluster;
    this.subnet = props.subnet;
    this.securityGroup = props.securityGroup;

    const task = new ecs.FargateTaskDefinition(this, 'JobsTask', {
      cpu: 256,
      memoryLimitMiB: 512,
    });

    this.taskDefinitionArn = task.taskDefinitionArn;

    const image = props.image ?? JobExecutorImage.DEBIAN;

    task.addContainer('ci-coordinator', {
      image: ecs.ContainerImage.fromRegistry(image.uri.toString()),
      logging: new ecs.AwsLogDriver({ streamPrefix: 'GitlabRunnerJob', logRetention: 7 }),
    }).addPortMappings({ containerPort: 22 });
  }
}
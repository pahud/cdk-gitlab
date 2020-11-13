import * as ec2 from '@aws-cdk/aws-ec2';
import * as eks from '@aws-cdk/aws-eks';
import * as cdk from '@aws-cdk/core';
import { Provider, FargateJobExecutor, FargateRunner, JobExecutorImage } from './';

export interface IntegTestingProps {
  readonly vpc?: ec2.IVpc;
}

export class IntegTesting {
  readonly stack: cdk.Stack[];
  constructor(props: IntegTestingProps = {}) {
    const app = new cdk.App();

    const env = {
      region: process.env.CDK_INTEG_REGION || process.env.CDK_DEFAULT_REGION || 'us-east-1',
      account: process.env.CDK_INTEG_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
    };

    const stack = new cdk.Stack(app, 'integ-stack', { env });

    const vpc = props.vpc ?? getOrCreateVpc(stack);

    const provider = new Provider(stack, 'GitlabProvider', { vpc });

    // create a Amazon EKS cluster
    provider.createFargateEksCluster(stack, 'GitlabEksCluster', {
      clusterOptions: {
        vpc,
        version: eks.KubernetesVersion.V1_18,
      },
    });

    // create a default fargate runner with its job executor
    provider.createFargateRunner();

    // alternatively, create the runner and the executor indivicually.
    // first, create the executor
    const executor = new FargateJobExecutor(stack, 'JobExecutor', {
      image: JobExecutorImage.JSII,
    });

    // second,create the runner with the task definition of the executor
    new FargateRunner(stack, 'FargateRunner', {
      vpc,
      executor,
    });

    this.stack = [stack];
  }
}

process.env.GITLAB_REGISTRATION_TOKEN='mock';
process.env.CDK_INTEG_REGION='us-east-1';

new IntegTesting();


function getOrCreateVpc(scope: cdk.Construct): ec2.IVpc {
  // use an existing vpc or create a new one
  return scope.node.tryGetContext('use_default_vpc') === '1' ?
    ec2.Vpc.fromLookup(scope, 'Vpc', { isDefault: true }) :
    scope.node.tryGetContext('use_vpc_id') ?
      ec2.Vpc.fromLookup(scope, 'Vpc', { vpcId: scope.node.tryGetContext('use_vpc_id') }) :
      new ec2.Vpc(scope, 'Vpc', { maxAzs: 3, natGateways: 1 });
}
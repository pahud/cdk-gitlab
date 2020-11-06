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

    const vpc = props.vpc ?? new ec2.Vpc(stack, 'Vpc', { natGateways: 1 });

    const provider = new Provider(stack, 'GitlabProvider', { vpc });

    // create a Amazon EKS cluster
    provider.createEksCluster(stack, 'GitlabEksCluster', {
      vpc,
      version: eks.KubernetesVersion.V1_18,
    });

    // create a default fargate runner with its job executor
    provider.createFargateRunner();

    // alternatively, create the runner and the executor indivicually.
    // first, create the executor
    const executor = new FargateJobExecutor(stack, 'JobExecutor', {
      image: JobExecutorImage.DEBIAN,
    });

    // second,create the runner with the task definition of the executor
    new FargateRunner(stack, 'FargateRunner', {
      vpc,
      executor: { task: executor.taskDefinitionArn },
    });


    this.stack = [stack];
  }
}

process.env.GITLAB_REGISTRATION_TOKEN='mock';

new IntegTesting();

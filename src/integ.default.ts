import * as ec2 from '@aws-cdk/aws-ec2';
import * as eks from '@aws-cdk/aws-eks';
import * as cdk from '@aws-cdk/core';
import * as gl from './index';


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

    const provider = new gl.Provider(stack, 'GitlabProvider', { vpc });

    // create a Amazon EKS cluster
    provider.createEksCluster(stack, 'GitlabEksCluster', {
      vpc,
      version: eks.KubernetesVersion.V1_18,
    });

    // create the fargate runner
    provider.createFargateRunner();

    this.stack = [stack];
  }
}

process.env.GITLAB_REGISTRATION_TOKEN='mock';

new IntegTesting();

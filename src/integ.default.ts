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

    const vpc = props.vpc;

    const provider = new gl.Provider(stack, 'GitlabProvider');

    // provider.createGitlabManagedEksRole({
    //   accountId: '855262394183',
    //   externalId: '37447cd37a816aae731793fb8ebaf34928393c4d',
    // });

    provider.createEksCluster(stack, 'GitlabEksCluster', {
      vpc,
      version: eks.KubernetesVersion.V1_18,
    });

    this.stack = [stack];

  }
}

new IntegTesting();

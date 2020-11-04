# cdk-gitlab

High level CDK construct to provision GitLab integrations with AWS


# Sample

```ts
import * as gl from 'cdk-gitlab';

const provider = new gl.Provider(stack, 'GitlabProvider');

// create Amazon EKS cluster for the GitLab integration
provider.createEksCluster(stack, 'GitlabEksCluster', {
  version: eks.KubernetesVersion.V1_18,
});

// TBD - create Amazon EC2 runner for the GitLab
provider.createEc2Runner(...);

// TBD - create Fargate runner for the GitLab
provider.createFargateRunner(...);

});

```

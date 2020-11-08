[![NPM version](https://badge.fury.io/js/cdk-gitlab.svg)](https://badge.fury.io/js/cdk-gitlab)
[![PyPI version](https://badge.fury.io/py/cdk-gitlab.svg)](https://badge.fury.io/py/cdk-gitlab)
![Release](https://github.com/pahud/cdk-gitlab/workflows/Release/badge.svg)

# cdk-gitlab

High level CDK construct to provision GitLab integrations with AWS


# Sample

```ts
import { Provider, FargateJobExecutor, FargateRunner, JobExecutorImage } from 'cdk-gitlab';

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
  image: JobExecutorImage.DEBIAN,
});

// second, create the runner with the task definition of the executor
new FargateRunner(stack, 'FargateRunner', {
  vpc,
  executor,
});

// TBD - create Amazon EC2 runner for the GitLab
provider.createEc2Runner(...);

});
```

# Deploy


```sh
cdk deploy -c GITLAB_REGISTRATION_TOKEN=<TOKEN>
```

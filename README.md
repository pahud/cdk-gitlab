[![NPM version](https://badge.fury.io/js/cdk-gitlab.svg)](https://badge.fury.io/js/cdk-gitlab)
[![PyPI version](https://badge.fury.io/py/cdk-gitlab.svg)](https://badge.fury.io/py/cdk-gitlab)
![Release](https://github.com/pahud/cdk-gitlab/workflows/Release/badge.svg)

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

// create the fargate runner
provider.createFargateRunner();

// TBD - create Amazon EC2 runner for the GitLab
provider.createEc2Runner(...);

});
```

# Deploy


```sh
cdk deploy -c GITLAB_REGISTRATION_TOKEN=<TOKEN>
```

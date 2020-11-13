# API Reference

**Classes**

Name|Description
----|-----------
[FargateJobExecutor](#cdk-gitlab-fargatejobexecutor)|The FargateJobExecutor.
[FargateRunner](#cdk-gitlab-fargaterunner)|The FargateRunner.
[JobExecutorImage](#cdk-gitlab-jobexecutorimage)|The docker image for the job executor.
[Provider](#cdk-gitlab-provider)|The Provider to create GitLab Integrations with AWS.


**Structs**

Name|Description
----|-----------
[CapacityProviderStrategyItem](#cdk-gitlab-capacityproviderstrategyitem)|The Capacity Provider strategy.
[EksClusterOptions](#cdk-gitlab-eksclusteroptions)|*No description*
[FargateEksClusterOptions](#cdk-gitlab-fargateeksclusteroptions)|*No description*
[FargateJobExecutorProps](#cdk-gitlab-fargatejobexecutorprops)|The properties for the FargateJobExecutor.
[FargateRunnerProps](#cdk-gitlab-fargaterunnerprops)|Properties for the FargateRunner.
[HelmRunnerOptions](#cdk-gitlab-helmrunneroptions)|*No description*
[ProviderProps](#cdk-gitlab-providerprops)|*No description*
[RoleProps](#cdk-gitlab-roleprops)|*No description*


**Enums**

Name|Description
----|-----------
[FargateCapacityProviderType](#cdk-gitlab-fargatecapacityprovidertype)|Amazon ECS Capacity Providers for AWS Fargate.



## class FargateJobExecutor  <a id="cdk-gitlab-fargatejobexecutor"></a>

The FargateJobExecutor.

__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new FargateJobExecutor(scope: Construct, id: string, props?: FargateJobExecutorProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[FargateJobExecutorProps](#cdk-gitlab-fargatejobexecutorprops)</code>)  *No description*
  * **cluster** (<code>[ICluster](#aws-cdk-aws-ecs-icluster)</code>)  *No description* __*Optional*__
  * **image** (<code>[JobExecutorImage](#cdk-gitlab-jobexecutorimage)</code>)  The docker image for the job executor container. __*Optional*__
  * **region** (<code>string</code>)  AWS region for the job executor. __*Optional*__
  * **securityGroup** (<code>[ISecurityGroup](#aws-cdk-aws-ec2-isecuritygroup)</code>)  *No description* __*Optional*__
  * **subnet** (<code>[ISubnet](#aws-cdk-aws-ec2-isubnet)</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**region** | <code>string</code> | <span></span>
**taskDefinitionArn** | <code>string</code> | task definition arn.
**cluster**? | <code>[ICluster](#aws-cdk-aws-ecs-icluster)</code> | __*Optional*__
**securityGroup**? | <code>[ISecurityGroup](#aws-cdk-aws-ec2-isecuritygroup)</code> | __*Optional*__
**subnet**? | <code>[ISubnet](#aws-cdk-aws-ec2-isubnet)</code> | __*Optional*__



## class FargateRunner  <a id="cdk-gitlab-fargaterunner"></a>

The FargateRunner.

__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new FargateRunner(scope: Construct, id: string, props: FargateRunnerProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[FargateRunnerProps](#cdk-gitlab-fargaterunnerprops)</code>)  *No description*
  * **vpc** (<code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code>)  VPC for the fargate. 
  * **clusterDefaultCapacityProviderStrategy** (<code>Array<[CapacityProviderStrategyItem](#cdk-gitlab-capacityproviderstrategyitem)></code>)  Default capacity provider strategy for the Amazon ECS cluster. __*Default*__: DEFAULT_CLUSTER_CAPACITY_PROVIDER_STRATEGY
  * **executor** (<code>[FargateJobExecutor](#cdk-gitlab-fargatejobexecutor)</code>)  Fargate job executor options. __*Optional*__
  * **fargateJobSubnet** (<code>[SubnetSelection](#aws-cdk-aws-ec2-subnetselection)</code>)  subnet for fargate CI task. __*Optional*__
  * **gitlabURL** (<code>string</code>)  gitlab URL prefix. __*Default*__: 'https://gitlab.com'
  * **registrationToken** (<code>string</code>)  GitLab registration token for the runner. __*Optional*__
  * **securityGroup** (<code>[ISecurityGroup](#aws-cdk-aws-ec2-isecuritygroup)</code>)  The security group for Fargate CI task. __*Optional*__
  * **serviceDefaultCapacityProviderStrategy** (<code>Array<[CapacityProviderStrategyItem](#cdk-gitlab-capacityproviderstrategyitem)></code>)  Default capacity provider strategy for the Amazon ECS service. __*Default*__: DEFAULT_SERVICE_CAPACITY_PROVIDER_STRATEGY
  * **tags** (<code>Array<string></code>)  tags for the runner. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**vpc** | <code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code> | <span></span>



## class JobExecutorImage  <a id="cdk-gitlab-jobexecutorimage"></a>

The docker image for the job executor.



### Properties


Name | Type | Description 
-----|------|-------------
**uri** | <code>string</code> | <span></span>
*static* **DEBIAN** | <code>[JobExecutorImage](#cdk-gitlab-jobexecutorimage)</code> | Debian.
*static* **JSII** | <code>[JobExecutorImage](#cdk-gitlab-jobexecutorimage)</code> | JSII for AWS CDK.
*static* **NODE** | <code>[JobExecutorImage](#cdk-gitlab-jobexecutorimage)</code> | Node.

### Methods


#### *static* of(image) <a id="cdk-gitlab-jobexecutorimage-of"></a>

Custom image.

```ts
static of(image: string): JobExecutorImage
```

* **image** (<code>string</code>)  custom image registry URI.

__Returns__:
* <code>[JobExecutorImage](#cdk-gitlab-jobexecutorimage)</code>



## class Provider  <a id="cdk-gitlab-provider"></a>

The Provider to create GitLab Integrations with AWS.

__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new Provider(scope: Construct, id: string, props?: ProviderProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[ProviderProps](#cdk-gitlab-providerprops)</code>)  *No description*
  * **vpc** (<code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**vpc** | <code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code> | <span></span>
**gitlabEksRole**? | <code>[IRole](#aws-cdk-aws-iam-irole)</code> | __*Optional*__

### Methods


#### createEksCluster(scope, id, props) <a id="cdk-gitlab-provider-createekscluster"></a>



```ts
createEksCluster(scope: Construct, id: string, props: EksClusterOptions): Cluster
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[EksClusterOptions](#cdk-gitlab-eksclusteroptions)</code>)  *No description*
  * **clusterOptions** (<code>[ClusterProps](#aws-cdk-aws-eks-clusterprops)</code>)  cluster properties for Amazon EKS cluster. 
  * **rbac** (<code>boolean</code>)  create serivce account and rbac ClusterRoleBinding for gitlab. __*Default*__: true

__Returns__:
* <code>[Cluster](#aws-cdk-aws-eks-cluster)</code>

#### createEksServiceRole() <a id="cdk-gitlab-provider-createeksservicerole"></a>



```ts
createEksServiceRole(): Role
```


__Returns__:
* <code>[Role](#aws-cdk-aws-iam-role)</code>

#### createFargateEksCluster(scope, id, props) <a id="cdk-gitlab-provider-createfargateekscluster"></a>



```ts
createFargateEksCluster(scope: Construct, id: string, props: FargateEksClusterOptions): Cluster
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[FargateEksClusterOptions](#cdk-gitlab-fargateeksclusteroptions)</code>)  *No description*
  * **clusterOptions** (<code>[FargateClusterProps](#aws-cdk-aws-eks-fargateclusterprops)</code>)  cluster properties for Amazon EKS cluster. 
  * **helmRunnerOptions** (<code>[HelmRunnerOptions](#cdk-gitlab-helmrunneroptions)</code>)  Gitlab helm Chart runner install Options. __*Optional*__
  * **rbac** (<code>boolean</code>)  create serivce account and rbac ClusterRoleBinding for gitlab. __*Default*__: true

__Returns__:
* <code>[Cluster](#aws-cdk-aws-eks-cluster)</code>

#### createFargateRunner(executor?) <a id="cdk-gitlab-provider-createfargaterunner"></a>



```ts
createFargateRunner(executor?: FargateJobExecutor): void
```

* **executor** (<code>[FargateJobExecutor](#cdk-gitlab-fargatejobexecutor)</code>)  *No description*




#### createGitlabManagedEksRole(props) <a id="cdk-gitlab-provider-creategitlabmanagedeksrole"></a>



```ts
createGitlabManagedEksRole(props: RoleProps): void
```

* **props** (<code>[RoleProps](#cdk-gitlab-roleprops)</code>)  *No description*
  * **accountId** (<code>string</code>)  *No description* 
  * **externalId** (<code>string</code>)  *No description* 




#### createSecurityGroup() <a id="cdk-gitlab-provider-createsecuritygroup"></a>



```ts
createSecurityGroup(): SecurityGroup
```


__Returns__:
* <code>[SecurityGroup](#aws-cdk-aws-ec2-securitygroup)</code>



## struct CapacityProviderStrategyItem  <a id="cdk-gitlab-capacityproviderstrategyitem"></a>


The Capacity Provider strategy.



Name | Type | Description 
-----|------|-------------
**capacityProvider** | <code>[FargateCapacityProviderType](#cdk-gitlab-fargatecapacityprovidertype)</code> | <span></span>
**weight** | <code>number</code> | <span></span>
**base**? | <code>number</code> | __*Optional*__



## struct EksClusterOptions  <a id="cdk-gitlab-eksclusteroptions"></a>






Name | Type | Description 
-----|------|-------------
**clusterOptions** | <code>[ClusterProps](#aws-cdk-aws-eks-clusterprops)</code> | cluster properties for Amazon EKS cluster.
**rbac**? | <code>boolean</code> | create serivce account and rbac ClusterRoleBinding for gitlab.<br/>__*Default*__: true



## struct FargateEksClusterOptions  <a id="cdk-gitlab-fargateeksclusteroptions"></a>






Name | Type | Description 
-----|------|-------------
**clusterOptions** | <code>[FargateClusterProps](#aws-cdk-aws-eks-fargateclusterprops)</code> | cluster properties for Amazon EKS cluster.
**helmRunnerOptions**? | <code>[HelmRunnerOptions](#cdk-gitlab-helmrunneroptions)</code> | Gitlab helm Chart runner install Options.<br/>__*Optional*__
**rbac**? | <code>boolean</code> | create serivce account and rbac ClusterRoleBinding for gitlab.<br/>__*Default*__: true



## struct FargateJobExecutorProps  <a id="cdk-gitlab-fargatejobexecutorprops"></a>


The properties for the FargateJobExecutor.



Name | Type | Description 
-----|------|-------------
**cluster**? | <code>[ICluster](#aws-cdk-aws-ecs-icluster)</code> | __*Optional*__
**image**? | <code>[JobExecutorImage](#cdk-gitlab-jobexecutorimage)</code> | The docker image for the job executor container.<br/>__*Optional*__
**region**? | <code>string</code> | AWS region for the job executor.<br/>__*Optional*__
**securityGroup**? | <code>[ISecurityGroup](#aws-cdk-aws-ec2-isecuritygroup)</code> | __*Optional*__
**subnet**? | <code>[ISubnet](#aws-cdk-aws-ec2-isubnet)</code> | __*Optional*__



## struct FargateRunnerProps  <a id="cdk-gitlab-fargaterunnerprops"></a>


Properties for the FargateRunner.



Name | Type | Description 
-----|------|-------------
**vpc** | <code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code> | VPC for the fargate.
**clusterDefaultCapacityProviderStrategy**? | <code>Array<[CapacityProviderStrategyItem](#cdk-gitlab-capacityproviderstrategyitem)></code> | Default capacity provider strategy for the Amazon ECS cluster.<br/>__*Default*__: DEFAULT_CLUSTER_CAPACITY_PROVIDER_STRATEGY
**executor**? | <code>[FargateJobExecutor](#cdk-gitlab-fargatejobexecutor)</code> | Fargate job executor options.<br/>__*Optional*__
**fargateJobSubnet**? | <code>[SubnetSelection](#aws-cdk-aws-ec2-subnetselection)</code> | subnet for fargate CI task.<br/>__*Optional*__
**gitlabURL**? | <code>string</code> | gitlab URL prefix.<br/>__*Default*__: 'https://gitlab.com'
**registrationToken**? | <code>string</code> | GitLab registration token for the runner.<br/>__*Optional*__
**securityGroup**? | <code>[ISecurityGroup](#aws-cdk-aws-ec2-isecuritygroup)</code> | The security group for Fargate CI task.<br/>__*Optional*__
**serviceDefaultCapacityProviderStrategy**? | <code>Array<[CapacityProviderStrategyItem](#cdk-gitlab-capacityproviderstrategyitem)></code> | Default capacity provider strategy for the Amazon ECS service.<br/>__*Default*__: DEFAULT_SERVICE_CAPACITY_PROVIDER_STRATEGY
**tags**? | <code>Array<string></code> | tags for the runner.<br/>__*Optional*__



## struct HelmRunnerOptions  <a id="cdk-gitlab-helmrunneroptions"></a>






Name | Type | Description 
-----|------|-------------
**concurrent**? | <code>number</code> | Number of run job in the same time.<br/>__*Default*__: 10
**gitlabURL**? | <code>string</code> | gitlab URL prefix.<br/>__*Default*__: 'https://gitlab.com'
**jobDefaultImage**? | <code>string</code> | Gitlab runners default image when job start not set "image" in gitlab-ci.yaml.<br/>__*Default*__: alpine:3.11
**namespace**? | <code>string</code> | Gitlab helm chart install namespace.<br/>__*Default*__: default.
**registrationToken**? | <code>string</code> | GitLab registration token for the runner, you put registrationToken in cdk.context.json like "GITLAB_REGISTRATION_TOKEN": "xxxxxxx".<br/>__*Optional*__
**tags**? | <code>Array<string></code> | tags for the runner.<br/>__*Default*__: ['eks', 'fargate', 'runner']



## struct ProviderProps  <a id="cdk-gitlab-providerprops"></a>






Name | Type | Description 
-----|------|-------------
**vpc**? | <code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code> | __*Optional*__



## struct RoleProps  <a id="cdk-gitlab-roleprops"></a>






Name | Type | Description 
-----|------|-------------
**accountId** | <code>string</code> | <span></span>
**externalId** | <code>string</code> | <span></span>



## enum FargateCapacityProviderType  <a id="cdk-gitlab-fargatecapacityprovidertype"></a>

Amazon ECS Capacity Providers for AWS Fargate.

Name | Description
-----|-----
**FARGATE** |
**FARGATE_SPOT** |



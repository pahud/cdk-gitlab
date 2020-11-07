# API Reference

**Classes**

Name|Description
----|-----------
[FargateJobExecutor](#cdk-gitlab-fargatejobexecutor)|*No description*
[FargateRunner](#cdk-gitlab-fargaterunner)|*No description*
[JobExecutorImage](#cdk-gitlab-jobexecutorimage)|The docker image for the job executor.
[Provider](#cdk-gitlab-provider)|*No description*


**Structs**

Name|Description
----|-----------
[FargateJobExecutorProps](#cdk-gitlab-fargatejobexecutorprops)|*No description*
[FargateRunnerProps](#cdk-gitlab-fargaterunnerprops)|*No description*
[JobExecutorOptions](#cdk-gitlab-jobexecutoroptions)|Options for the runner to create the fargate job executor.
[ProviderProps](#cdk-gitlab-providerprops)|*No description*
[RoleProps](#cdk-gitlab-roleprops)|*No description*



## class FargateJobExecutor  <a id="cdk-gitlab-fargatejobexecutor"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new FargateJobExecutor(scope: Construct, id: string, props?: FargateJobExecutorProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[FargateJobExecutorProps](#cdk-gitlab-fargatejobexecutorprops)</code>)  *No description*
  * **image** (<code>[JobExecutorImage](#cdk-gitlab-jobexecutorimage)</code>)  The docker image for the job executor container. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**taskDefinitionArn** | <code>string</code> | task definition arn.



## class FargateRunner  <a id="cdk-gitlab-fargaterunner"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new FargateRunner(scope: Construct, id: string, props: FargateRunnerProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[FargateRunnerProps](#cdk-gitlab-fargaterunnerprops)</code>)  *No description*
  * **executor** (<code>[JobExecutorOptions](#cdk-gitlab-jobexecutoroptions)</code>)  Fargate job executor options. 
  * **vpc** (<code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code>)  VPC for the fargate. 
  * **fargateJobSubnet** (<code>[SubnetSelection](#aws-cdk-aws-ec2-subnetselection)</code>)  subnet for fargate CI task. __*Optional*__
  * **gitlabURL** (<code>string</code>)  gitlab URL prefix. __*Default*__: 'https://gitlab.com'
  * **registrationToken** (<code>string</code>)  GitLab registration token for the runner. __*Optional*__
  * **securityGroup** (<code>[ISecurityGroup](#aws-cdk-aws-ec2-isecuritygroup)</code>)  The security group for Fargate CI task. __*Optional*__
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
createEksCluster(scope: Construct, id: string, props: ClusterProps): Cluster
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[ClusterProps](#aws-cdk-aws-eks-clusterprops)</code>)  *No description*
  * **version** (<code>[KubernetesVersion](#aws-cdk-aws-eks-kubernetesversion)</code>)  The Kubernetes version to run in the cluster. 
  * **clusterName** (<code>string</code>)  Name for the cluster. __*Default*__: Automatically generated name
  * **outputClusterName** (<code>boolean</code>)  Determines whether a CloudFormation output with the name of the cluster will be synthesized. __*Default*__: false
  * **outputConfigCommand** (<code>boolean</code>)  Determines whether a CloudFormation output with the `aws eks update-kubeconfig` command will be synthesized. __*Default*__: true
  * **role** (<code>[IRole](#aws-cdk-aws-iam-irole)</code>)  Role that provides permissions for the Kubernetes control plane to make calls to AWS API operations on your behalf. __*Default*__: A role is automatically created for you
  * **securityGroup** (<code>[ISecurityGroup](#aws-cdk-aws-ec2-isecuritygroup)</code>)  Security Group to use for Control Plane ENIs. __*Default*__: A security group is automatically created
  * **vpc** (<code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code>)  The VPC in which to create the Cluster. __*Default*__: a VPC with default configuration will be created and can be accessed through `cluster.vpc`.
  * **vpcSubnets** (<code>Array<[SubnetSelection](#aws-cdk-aws-ec2-subnetselection)></code>)  Where to place EKS Control Plane ENIs. __*Default*__: All public and private subnets
  * **coreDnsComputeType** (<code>[CoreDnsComputeType](#aws-cdk-aws-eks-corednscomputetype)</code>)  Controls the "eks.amazonaws.com/compute-type" annotation in the CoreDNS configuration on your cluster to determine which compute type to use for CoreDNS. __*Default*__: CoreDnsComputeType.EC2 (for `FargateCluster` the default is FARGATE)
  * **endpointAccess** (<code>[EndpointAccess](#aws-cdk-aws-eks-endpointaccess)</code>)  Configure access to the Kubernetes API server endpoint.. __*Default*__: EndpointAccess.PUBLIC_AND_PRIVATE
  * **kubectlEnvironment** (<code>Map<string, string></code>)  Environment variables for the kubectl execution. __*Default*__: No environment variables.
  * **kubectlLayer** (<code>[ILayerVersion](#aws-cdk-aws-lambda-ilayerversion)</code>)  An AWS Lambda Layer which includes `kubectl`, Helm and the AWS CLI. __*Default*__: the layer provided by the `aws-lambda-layer-kubectl` SAR app.
  * **mastersRole** (<code>[IRole](#aws-cdk-aws-iam-irole)</code>)  An IAM role that will be added to the `system:masters` Kubernetes RBAC group. __*Default*__: a role that assumable by anyone with permissions in the same account will automatically be defined
  * **outputMastersRoleArn** (<code>boolean</code>)  Determines whether a CloudFormation output with the ARN of the "masters" IAM role will be synthesized (if `mastersRole` is specified). __*Default*__: false
  * **defaultCapacity** (<code>number</code>)  Number of instances to allocate as an initial capacity for this cluster. __*Default*__: 2
  * **defaultCapacityInstance** (<code>[InstanceType](#aws-cdk-aws-ec2-instancetype)</code>)  The instance type to use for the default capacity. __*Default*__: m5.large
  * **defaultCapacityType** (<code>[DefaultCapacityType](#aws-cdk-aws-eks-defaultcapacitytype)</code>)  The default capacity type for the cluster. __*Default*__: NODEGROUP
  * **kubectlEnabled** (<code>boolean</code>)  NOT SUPPORTED: We no longer allow disabling kubectl-support. Setting this option to `false` will throw an error. __*Default*__: true
  * **secretsEncryptionKey** (<code>[IKey](#aws-cdk-aws-kms-ikey)</code>)  KMS secret for envelope encryption for Kubernetes secrets. __*Default*__: By default, Kubernetes stores all secret object data within etcd and   all etcd volumes used by Amazon EKS are encrypted at the disk-level   using AWS-Managed encryption keys.

__Returns__:
* <code>[Cluster](#aws-cdk-aws-eks-cluster)</code>

#### createEksServiceRole() <a id="cdk-gitlab-provider-createeksservicerole"></a>



```ts
createEksServiceRole(): Role
```


__Returns__:
* <code>[Role](#aws-cdk-aws-iam-role)</code>

#### createFargateRunner(executor?) <a id="cdk-gitlab-provider-createfargaterunner"></a>



```ts
createFargateRunner(executor?: JobExecutorOptions): void
```

* **executor** (<code>[JobExecutorOptions](#cdk-gitlab-jobexecutoroptions)</code>)  *No description*
  * **cluster** (<code>[ICluster](#aws-cdk-aws-ecs-icluster)</code>)  The ECS clsuter of the job executor fargate task. __*Default*__: the cluster for the runner
  * **region** (<code>string</code>)  AWS region for the job executor. __*Default*__: the region of the stack
  * **securityGroup** (<code>[ISecurityGroup](#aws-cdk-aws-ec2-isecuritygroup)</code>)  security group for the executor. __*Optional*__
  * **subnet** (<code>[ISubnet](#aws-cdk-aws-ec2-isubnet)</code>)  subnet for the executor. __*Optional*__
  * **task** (<code>string</code>)  task definition arn of the executor. __*Optional*__




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



## struct FargateJobExecutorProps  <a id="cdk-gitlab-fargatejobexecutorprops"></a>






Name | Type | Description 
-----|------|-------------
**image**? | <code>[JobExecutorImage](#cdk-gitlab-jobexecutorimage)</code> | The docker image for the job executor container.<br/>__*Optional*__



## struct FargateRunnerProps  <a id="cdk-gitlab-fargaterunnerprops"></a>






Name | Type | Description 
-----|------|-------------
**executor** | <code>[JobExecutorOptions](#cdk-gitlab-jobexecutoroptions)</code> | Fargate job executor options.
**vpc** | <code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code> | VPC for the fargate.
**fargateJobSubnet**? | <code>[SubnetSelection](#aws-cdk-aws-ec2-subnetselection)</code> | subnet for fargate CI task.<br/>__*Optional*__
**gitlabURL**? | <code>string</code> | gitlab URL prefix.<br/>__*Default*__: 'https://gitlab.com'
**registrationToken**? | <code>string</code> | GitLab registration token for the runner.<br/>__*Optional*__
**securityGroup**? | <code>[ISecurityGroup](#aws-cdk-aws-ec2-isecuritygroup)</code> | The security group for Fargate CI task.<br/>__*Optional*__
**tags**? | <code>Array<string></code> | tags for the runner.<br/>__*Optional*__



## struct JobExecutorOptions  <a id="cdk-gitlab-jobexecutoroptions"></a>


Options for the runner to create the fargate job executor.



Name | Type | Description 
-----|------|-------------
**cluster**? | <code>[ICluster](#aws-cdk-aws-ecs-icluster)</code> | The ECS clsuter of the job executor fargate task.<br/>__*Default*__: the cluster for the runner
**region**? | <code>string</code> | AWS region for the job executor.<br/>__*Default*__: the region of the stack
**securityGroup**? | <code>[ISecurityGroup](#aws-cdk-aws-ec2-isecuritygroup)</code> | security group for the executor.<br/>__*Optional*__
**subnet**? | <code>[ISubnet](#aws-cdk-aws-ec2-isubnet)</code> | subnet for the executor.<br/>__*Optional*__
**task**? | <code>string</code> | task definition arn of the executor.<br/>__*Optional*__



## struct ProviderProps  <a id="cdk-gitlab-providerprops"></a>






Name | Type | Description 
-----|------|-------------
**vpc**? | <code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code> | __*Optional*__



## struct RoleProps  <a id="cdk-gitlab-roleprops"></a>






Name | Type | Description 
-----|------|-------------
**accountId** | <code>string</code> | <span></span>
**externalId** | <code>string</code> | <span></span>




# API Reference

**Classes**

Name|Description
----|-----------
[Provider](#cdk-gitlab-provider)|*No description*


**Structs**

Name|Description
----|-----------
[ProviderProps](#cdk-gitlab-providerprops)|*No description*
[RoleProps](#cdk-gitlab-roleprops)|*No description*



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

#### createFargateRunner() <a id="cdk-gitlab-provider-createfargaterunner"></a>



```ts
createFargateRunner(): void
```





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



## struct ProviderProps  <a id="cdk-gitlab-providerprops"></a>






Name | Type | Description 
-----|------|-------------
**vpc**? | <code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code> | __*Optional*__



## struct RoleProps  <a id="cdk-gitlab-roleprops"></a>






Name | Type | Description 
-----|------|-------------
**accountId** | <code>string</code> | <span></span>
**externalId** | <code>string</code> | <span></span>




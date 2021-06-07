const { AwsCdkConstructLibrary, DependenciesUpgradeMechanism } = require('projen');

const AUTOMATION_TOKEN = 'PROJEN_GITHUB_TOKEN';

const project = new AwsCdkConstructLibrary({
  authorAddress: 'pahudnet@gmail.com',
  authorName: 'Pahud Hsieh',
  cdkVersion: '1.82.0',
  name: 'cdk-gitlab',
  repository: 'https://github.com/pahud/cdk-gitlab.git',
  description: 'High level CDK construct to provision GitLab integrations with AWS',
  defaultReleaseBranch: 'main',
  autoDetectBin: false,
  depsUpgrade: DependenciesUpgradeMechanism.githubWorkflow({
    workflowOptions: {
      labels: ['auto-approve'],
    },
  }),
  autoApproveOptions: {
    secret: AUTOMATION_TOKEN,
  },
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-ec2',
    '@aws-cdk/aws-ecs',
    '@aws-cdk/aws-eks',
    '@aws-cdk/aws-iam',
  ],
  python: {
    distName: 'cdk-gitlab',
    module: 'cdk_gitlab',
  },
});

const common_exclude = ['cdk.out', 'cdk.context.json', 'yarn-error.log'];
project.npmignore.exclude(...common_exclude, 'bin', '.devcontainer');
project.gitignore.exclude(...common_exclude);

project.synth();

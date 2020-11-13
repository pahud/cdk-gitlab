const { AwsCdkConstructLibrary, GithubWorkflow } = require('projen');

const AUTOMATION_TOKEN = 'AUTOMATION_GITHUB_TOKEN'

const project = new AwsCdkConstructLibrary({
  authorAddress: "pahudnet@gmail.com",
  authorName: "Pahud Hsieh",
  cdkVersion: "1.71.0",
  name: "cdk-gitlab",
  repository: "https://github.com/pahud/cdk-gitlab.git",
  description: "High level CDK construct to provision GitLab integrations with AWS",
  defaultReleaseBranch: 'main',
  autoDetectBin: false,
  dependabot: false,
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-ec2',
    '@aws-cdk/aws-ecs',
    '@aws-cdk/aws-eks',
    '@aws-cdk/aws-iam',
    '@aws-cdk/assert'
  ],
  python: {
    distName: "cdk-gitlab",
    module: "cdk_gitlab",
  },
});

// create a custom projen and yarn upgrade workflow
const workflow = new GithubWorkflow(project, 'ProjenYarnUpgrade');

workflow.on({
  schedule: [{
    cron: '11 0 * * *'
  }], // 0:11am every day
  workflow_dispatch: {}, // allow manual triggering
});

workflow.addJobs({
  upgrade: {
    'runs-on': 'ubuntu-latest',
    'steps': [
      { uses: 'actions/checkout@v2' },
      { 
        uses: 'actions/setup-node@v1',
        with: {
          'node-version': '10.17.0',
        }
      },
      { run: `yarn upgrade` },
      { run: `yarn projen:upgrade` },
      // submit a PR
      {
        name: 'Create Pull Request',
        uses: 'peter-evans/create-pull-request@v3',
        with: {
          'token': '${{ secrets.' + AUTOMATION_TOKEN + ' }}',
          'commit-message': 'chore: upgrade projen',
          'branch': 'auto/projen-upgrade',
          'title': 'chore: upgrade projen and yarn',
          'body': 'This PR upgrades projen and yarn upgrade to the latest version',
          'labels': 'auto-merge',
        }
      },
    ],
  },
});

const common_exclude = ['cdk.out', 'cdk.context.json', 'yarn-error.log'];
project.npmignore.exclude(...common_exclude, 'bin', '.devcontainer');
project.gitignore.exclude(...common_exclude);

project.synth();

This repository consists of the migrated [amCharts](https://github.com/amcharts/amcharts4) components and stories from the `cp-toolkit` repo. It was at - the time this README was created - not being used and making the bundle size of `cp-toolkit` unnecessarily large as it was including everything, thus the decision to migrate it into its own repo.
### Install and run

1.  Install `NodeJS`. Preferably using [NVM](https://github.com/nvm-sh/nvm) so that you can easily switch node versions if necessary.
2.  Install [Yarn](https://classic.yarnpkg.com/en/docs/install).
3.  Ensure `package.json` file is there and run the command `yarn` to install all dependencies. (If for some reason a dependency failed to install, you can run `yarn add <dependency_name>` to try install it manually)
4.  After successfully installing the dependencies, run `yarn start` to startup the application

## Storybook

You can run the in storybook mode to help you create and visualise certain components within the application. You can run the following command:

```
yarn storybook
```

For more information on storybooks, you can view the docs [here](https://storybook.js.org/docs/react/get-started/whats-a-story)
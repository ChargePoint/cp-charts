const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  features: {
    postcss: false,
  },
  webpackFinal: async (config) => {
    config.resolve.alias = {
      '@common': path.resolve(__dirname, '..', 'src/common'),
      '@components': path.resolve(__dirname, '..', 'src/components'),
    };

    return config;
  },
};

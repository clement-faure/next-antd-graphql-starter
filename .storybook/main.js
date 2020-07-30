const path = require('path');

// https://github.com/storybookjs/storybook/issues/714
// Soft link has been created on public directory

module.exports = {
  stories: ['../stories/**/*.stories.jsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '~': path.join(__dirname, '../src'),
      'next/config': path.join(__dirname, './mocks/next-config.js'),
    };

    config.resolve.extensions.push('.js', '.jsx');

    return config;
  },
};

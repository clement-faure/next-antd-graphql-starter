const path = require('path');

module.exports = {
  stories: [
    '../stories/**/*.stor@(y|ies).[tj]s?(x)',
    '../src/**/stor@(y|ies).[tj]s?(x)',
    '../src/**/*.stor@(y|ies).[tj]s?(x)',
  ],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '~': path.join(__dirname, '../src'),
    };

    config.resolve.extensions.push('.js', '.jsx');

    return config;
  },
};

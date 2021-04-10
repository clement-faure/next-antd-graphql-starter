/* eslint-disable */
const fs = require('fs');
const path = require('path');

const withLess = require('@zeit/next-less');
const lessToJS = require('less-vars-to-js');

const flowRight = require('lodash/fp/flowRight');

const { i18n } = require('./next-i18next.config');
const packageJSON = require('./package.json');

const themeVariables = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, 'src/styles/antd-custom.less'),
    'utf8'
  )
);

if (process.env.ANALYZE === 'true') {
  console.log('Enabling Webpack bundle analyzer');
}

const extendI18n = (nextConfig = {}) => ({
  ...nextConfig,
  i18n,
});

const extendEnv = (nextConfig = {}) => {
  return {
    ...nextConfig,
    env: {
      APP_VERSION: packageJSON.version,
      GRAPHQL_URI: process.env.GRAPHQL_URI,
      ...(nextConfig.env || {}),
    },
  };
};

const extendWebpackConfig = (nextConfig = {}) => {
  let newNextConfig = withLess({
    ...nextConfig,
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables,
    },
    webpack: (config, { isServer }) => {
      if (isServer) {
        const antStyles = /antd\/.*?\/style.*?/;
        const origExternals = [...config.externals];
        config.externals = [
          (context, request, callback) => {
            if (request.match(antStyles)) return callback();
            if (typeof origExternals[0] === 'function') {
              origExternals[0](context, request, callback);
            } else {
              callback();
            }
          },
          ...(typeof origExternals[0] === 'function' ? [] : origExternals),
        ];

        config.module.rules.unshift({
          test: antStyles,
          use: 'null-loader',
        });
      }
      return config;
    },
  });

  // In case analyse bundle mode
  if (process.env.ANALYZE === 'true') {
    const withBundleAnalyzer = require('@next/bundle-analyzer')({
      enabled: process.env.ANALYZE === 'true',
    });

    newNextConfig = withBundleAnalyzer(newNextConfig);
  }

  return newNextConfig;
};

module.exports = (nextConfig = {}) => {
  return flowRight([extendWebpackConfig, extendEnv, extendI18n])(nextConfig);
};

/* eslint-disable */
const withLess = require('@zeit/next-less');
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');

const { nextI18NextRewrites } = require('next-i18next/rewrites');

const packageJSON = require('./package.json');
const { localeSubpaths } = require('./src/lib/i18n/config.ts');

const flowRight = require('lodash/fp/flowRight');

const themeVariables = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, 'src/styles/antd-custom.less'),
    'utf8'
  )
);

if (process.env.ANALYZE === 'true') {
  console.log('Enabling Webpack bundle analyzer');
}

const extendRuntimeConfig = (nextConfig = {}) => ({
  ...nextConfig,
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    localeSubpaths,
  },
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

const extendRewrites = (nextConfig = {}) => ({
  ...nextConfig,
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
});

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
  return flowRight([
    extendWebpackConfig,
    extendRuntimeConfig,
    extendEnv,
    extendRewrites,
  ])(nextConfig);
};

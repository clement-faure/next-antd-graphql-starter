const path = require('path');
const fs = require('fs');
const lessToJS = require('less-vars-to-js');

const { nextI18NextRewrites } = require('next-i18next/rewrites');

const localeSubpaths = {
  en: 'en',
  fr: 'fr',
};

const withLess = require('@zeit/next-less');
const flowRight = require('lodash/fp/flowRight');

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, 'src/styles/antd-custom.less'),
    'utf8'
  )
);

if (process.env.ANALYZE === 'true') {
  console.log('Enabling Webpack bundle analyzer');
}

const extendGlobalConfig = (nextConfig = {}) => ({
  ...nextConfig,
  pageExtensions: ['js', 'jsx'],
});

const extendRuntimeConfig = (nextConfig = {}) => ({
  ...nextConfig,
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    appName: 'NagStarter',
    graphqlUri: process.env.GRAPHQL_URI,
    localeSubpaths,
  },
});

const extendRewrites = (nextConfig = {}) => ({
  ...nextConfig,
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
});

const extendWebpackConfig = (nextConfig = {}) => {
  // Populate themeVariables with environment variables
  themeVariables['@primary-color'] =
    process.env.PRIMARY_COLOR || themeVariables['@primary-color'];

  let newNextConfig = withLess({
    ...nextConfig,
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables,
    },
    webpack: (config, { isServer }) => {
      // Add alias configuration
      config.resolve.alias['~'] = path.resolve(__dirname, './src');

      // Prevent parsing ant design styles files
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

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });

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
    extendRewrites,
    extendGlobalConfig,
  ])(nextConfig);
};

const localeSubpaths = {
  en: 'en',
  fr: 'fr',
};

module.exports.default = function getConfig() {
  return {
    publicRuntimeConfig: {
      localeSubpaths,
    },
    serverRuntimeConfig: {},
  };
};

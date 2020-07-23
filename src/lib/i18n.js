const path = require('path');
const NextI18Next = require('next-i18next').default;
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig;

module.exports = new NextI18Next({
  preload: ['en'],
  defaultLanguage: 'en',
  fallbackLng: 'en',
  otherLanguages: ['fr'],
  localeSubpaths,
  localePath: path.resolve('./public/static/locales'),
});

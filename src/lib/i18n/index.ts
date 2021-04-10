import path from 'path';
import I18N from 'next-i18next';

import { localeSubpaths } from './config';

const i18nInstance = new I18N({
  preload: ['en'],
  defaultLanguage: 'en',
  fallbackLng: 'en',
  otherLanguages: ['fr'],

  defaultNS: 'common',
  localeSubpaths,
  localePath: path.resolve('./public/static/locales'),
});

// Re-export everything
export const {
  Trans,
  Link,
  Router,
  i18n,
  initPromise,
  config,
  useTranslation,
  withTranslation,
  appWithTranslation,
} = i18nInstance;

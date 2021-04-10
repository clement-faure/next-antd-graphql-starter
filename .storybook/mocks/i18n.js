import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEN from '../../public/locales/en/common.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  debug: true,
  resources: {
    en: {
      common: commonEN,
    },
  },
});

export default i18n;

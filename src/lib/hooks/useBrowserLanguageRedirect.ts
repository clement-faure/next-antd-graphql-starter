import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { availableLanguages } from '~/lib/i18n';

const getBrowserLocales = (): readonly string[] | undefined => {
  return navigator.languages === undefined
    ? [navigator.language]
    : navigator.languages;
};

const browserLocaleToI18nLocale = (browserLocale: string): string =>
  browserLocale.split(/-|_/)[0];

const useBrowserLanguageRedirect = () => {
  const router = useRouter();

  // At first client mount
  useEffect(() => {
    const browserLocales = getBrowserLocales();

    if (!browserLocales) {
      return undefined;
    }

    const currentLocale = router.locale;
    const mainBrowserLocale = browserLocaleToI18nLocale(browserLocales[0]);

    // Is browser locale a supported language by the application
    const isSupportedLanguage =
      availableLanguages.indexOf(mainBrowserLocale) > -1;

    // In case user browser main language is not the currentLocale, redirect on the good one
    if (isSupportedLanguage && mainBrowserLocale !== currentLocale) {
      router.push(router.pathname, router.asPath, {
        locale: mainBrowserLocale,
      });
    }
  }, []);
};

export default useBrowserLanguageRedirect;

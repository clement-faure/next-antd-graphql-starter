export const availableLanguages: string[] = ['en', 'fr'];

export const getBrowserLocales = (): readonly string[] | undefined => {
  return navigator.languages === undefined
    ? [navigator.language]
    : navigator.languages;
};

export const browserLocaleToI18nLocale = (browserLocale: string): string =>
  browserLocale.split(/-|_/)[0];

export const computeBrowserLocale = (): string | undefined => {
  const browserLocales = getBrowserLocales();

  if (!browserLocales) {
    return;
  }

  const mainBrowserLocale = browserLocaleToI18nLocale(browserLocales[0]);

  // Is browser locale a supported language by the application
  const isSupportedLanguage =
    availableLanguages.indexOf(mainBrowserLocale) > -1;

  if (isSupportedLanguage) {
    return mainBrowserLocale;
  }
};

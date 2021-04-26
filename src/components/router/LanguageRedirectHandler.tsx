import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { computeBrowserLocale } from '~/lib/i18n';

interface LanguageRedirectHandlerProps {
  children: React.ReactNode;
}

export const LanguageRedirectHandler = ({
  children,
}: LanguageRedirectHandlerProps) => {
  const router = useRouter();

  useEffect(() => {
    const _locale = computeBrowserLocale();

    if (!!_locale && _locale !== router.locale) {
      router.push(router.pathname, router.asPath, {
        locale: _locale,
      });
    }
  }, []);

  return <>{children}</>;
};

export default LanguageRedirectHandler;

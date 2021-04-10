// /!\ This file can only be executed in a server environment, otherwise will throw an error
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const i18nGetStaticProps = (
  namespaces: string[] = ['common']
) => async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, namespaces)),
  },
});

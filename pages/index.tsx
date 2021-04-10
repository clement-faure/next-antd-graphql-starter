import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Layout, Button } from 'antd';

import { useTranslation } from 'next-i18next';
import { i18nGetStaticProps } from '~/lib/i18n/server';

import useBrowserLanguageRedirect from '~/lib/hooks/useBrowserLanguageRedirect';

const { Content } = Layout;

const Homepage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  useBrowserLanguageRedirect();

  return (
    <>
      <Head>
        <title>{`${t('app_name')} - ${t('index.head_title')}`}</title>
      </Head>
      <Content className="padding-50">
        <div>
          <Link href="/" locale={router.locale === 'en' ? 'fr' : 'en'}>
            <Button type="primary">{t('change-locale')}</Button>
          </Link>
        </div>
      </Content>
    </>
  );
};

export const getStaticProps = i18nGetStaticProps(['common']);

export default Homepage;

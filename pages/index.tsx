import Head from 'next/head';

import { Layout } from 'antd';

import { useTranslation } from 'next-i18next';
import { i18nGetStaticProps } from '~/lib/i18n/server';

const { Content } = Layout;

const Homepage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{`${t('app_name')} - ${t('index.head_title')}`}</title>
      </Head>
      <Content className="padding-50">
        <div>
          <p>{t('welcome')}</p>
        </div>
      </Content>
    </>
  );
};

export const getStaticProps = i18nGetStaticProps(['common']);

export default Homepage;

import Head from 'next/head';

import { Layout } from 'antd';

import { useTranslation } from 'next-i18next';
import { i18nGetStaticProps } from '~/lib/i18n/server';

import UsersContainer from '~/views/users/UsersContainer';

const { Content } = Layout;

const UsersNoSSRPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t('app_name')} - ${t('users_no_ssr.head_title')}`}</title>
      </Head>
      <Content className="padding-50">
        <UsersContainer />
      </Content>
    </>
  );
};

export const getStaticProps = i18nGetStaticProps(['common']);

export default UsersNoSSRPage;

import Head from 'next/head';

import { Layout } from 'antd';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { initializeApollo, addApolloState } from '~/lib/apollo';

import UsersContainer from '~/views/users/UsersContainer';
import { USERS_QUERY } from '~/services/UsersService';

const { Content } = Layout;

const UsersPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t('app_name')} - ${t('users.head_title')}`}</title>
      </Head>
      <Content className="padding-50">
        <UsersContainer />
      </Content>
    </>
  );
};

export async function getServerSideProps({ locale }) {
  const apolloClient = await initializeApollo();

  // Fetching users in server side
  await apolloClient.query({
    query: USERS_QUERY,
  });

  return addApolloState(apolloClient, {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  });
}

export default UsersPage;

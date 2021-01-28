import React from 'react';
import PropTypes from 'prop-types';

import Head from 'next/head';

import { Layout } from 'antd';

import { withTranslation } from '~/lib/i18n';
import { initializeApollo } from '~/lib/apollo';

import UsersContainer from '~/views/users/UsersContainer';
import { USERS_QUERY } from '~/services/UsersService';

const { Content } = Layout;

const UsersPage = ({ t }) => (
  <>
    <Head>
      <title>{`${t('app_name')} - ${t('users.head_title')}`}</title>
    </Head>
    <Content className="padding-50">
      <UsersContainer />
    </Content>
  </>
);

// We should use new next.js data fetching methods such as getStaticProps, getServerSideProps.
// Unfortunately, next-i18next do not support yet integration using theses methods
// https://github.com/isaachinman/next-i18next/issues/652

UsersPage.getInitialProps = async () => {
  const apolloClient = await initializeApollo();

  // Fetching users in server side
  await apolloClient.query({
    query: USERS_QUERY,
  });

  return {
    namespacesRequired: ['common'],
    initialApolloState: apolloClient.cache.extract(),
  };
};

UsersPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(UsersPage);

import React from 'react';
import PropTypes from 'prop-types';

import Head from 'next/head';
import getConfig from 'next/config';

import { Layout } from 'antd';

import { withTranslation } from '~/lib/i18n';
import { initializeApollo } from '~/lib/apolloClient';

import UsersContainer, { USERS_QUERY } from '~/views/users/UsersContainer';

const {
  publicRuntimeConfig: { appName },
} = getConfig();

const { Content } = Layout;

const UsersPage = ({ t }) => (
  <>
    <Head>
      <title>{`${appName} - ${t('users.head_title')}`}</title>
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

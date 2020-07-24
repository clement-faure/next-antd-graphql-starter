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

/*
export async function getStaticProps() {
  const apolloClient = await initializeApollo();

  await apolloClient.query({
    query: USERS_QUERY,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    unstable_revalidate: 1,
  };
}
*/

UsersPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

UsersPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(UsersPage);

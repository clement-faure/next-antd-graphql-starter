import React from 'react';
import PropTypes from 'prop-types';

import Head from 'next/head';

import { Layout } from 'antd';

import { withTranslation } from '~/lib/i18n';

import UsersContainer from '~/views/users/UsersContainer';

const { Content } = Layout;

const UsersNoSSRPage = ({ t }) => (
  <>
    <Head>
      <title>{`${t('app_name')} - ${t('users_no_ssr.head_title')}`}</title>
    </Head>
    <Content className="padding-50">
      <UsersContainer />
    </Content>
  </>
);

UsersNoSSRPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

UsersNoSSRPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(UsersNoSSRPage);

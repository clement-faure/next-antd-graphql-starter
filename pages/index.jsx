import React from 'react';
import PropTypes from 'prop-types';

import Head from 'next/head';
import getConfig from 'next/config';

import { Layout, Button, DatePicker } from 'antd';

import { i18n, withTranslation } from '~/lib/i18n';

const {
  publicRuntimeConfig: { appName },
} = getConfig();

const { Content } = Layout;

const Homepage = ({ t }) => (
  <>
    <Head>
      <title>{`${appName} - ${t('index.head_title')}`}</title>
    </Head>
    <Content className="padding-50">
      <div>
        <Button
          type="primary"
          onClick={() => {
            i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
          }}
        >
          {t('change-locale')}
        </Button>
        <DatePicker />
      </div>
    </Content>
  </>
);

Homepage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

Homepage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(Homepage);

import React from 'react';

import App from 'next/app';

import { Layout } from 'antd';

import { appWithTranslation } from '~/lib/i18n';

// Import global style
import '~/styles/global.less';

import NagsHeader from '~/components/layout/NagsHeader';
import NagsFooter from '~/components/layout/NagsFooter';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Layout className="height-100vh">
        <NagsHeader />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
        <NagsFooter />
      </Layout>
    );
  }
}

export default appWithTranslation(MyApp);

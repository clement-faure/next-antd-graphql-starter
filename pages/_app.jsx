import React from 'react';
import PropTypes from 'prop-types';
import App from 'next/app';

import { Layout } from 'antd';
import { ApolloProvider } from '@apollo/client';

// Lib
import { useApollo } from '~/lib/apolloClient';
import { appWithTranslation } from '~/lib/i18n';

// Import global style
import '~/styles/global.less';

import NagsHeader from '~/components/layout/NagsHeader';
import NagsFooter from '~/components/layout/NagsFooter';

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Layout className="height-100vh">
        <NagsHeader />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
        <NagsFooter />
      </Layout>
    </ApolloProvider>
  );
}

MyApp.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired,
  Component: PropTypes.node.isRequired,
};

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default appWithTranslation(MyApp);

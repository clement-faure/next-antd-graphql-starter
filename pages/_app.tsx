import React from 'react';
import App, { AppProps } from 'next/app';
import PropTypes from 'prop-types';

import { Layout } from 'antd';
import { ApolloProvider } from '@apollo/client';

// Import global style
import '~/styles/global.less';

// Lib
import { useApollo } from '~/lib/apollo';
import { appWithTranslation } from '~/lib/i18n';

import NagsHeader from '~/components/layout/NagsHeader';
import NagsFooter from '~/components/layout/NagsFooter';

function MyApp({ Component, pageProps }: AppProps) {
  // Initialize apollo client and populate cache with pageProps
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

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

MyApp.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired,
  Component: PropTypes.elementType.isRequired,
};

export default appWithTranslation(MyApp);

import React from 'react';
import App, { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import { Layout } from 'antd';
import { ApolloProvider } from '@apollo/client';

// Import global style
import '~/styles/global.less';

// Lib
import { useApollo } from '~/lib/apollo';

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

export default appWithTranslation(MyApp);

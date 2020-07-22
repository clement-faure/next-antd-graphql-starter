import React from "react";

import App from "next/app";

import { appWithTranslation } from "~/lib/i18n";

import { Layout, Menu, Breadcrumb } from "antd";
const { Header, Content, Footer } = Layout;

// Import global style
import "~/styles/global.less";

import NagsHeader from "~/components/layout/NagsHeader";
import NagsFooter from "~/components/layout/NagsFooter";
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout className="height-100vh">
        <NagsHeader />
        <Component {...pageProps} />
        <NagsFooter />
      </Layout>
    );
  }
}

export default appWithTranslation(MyApp);

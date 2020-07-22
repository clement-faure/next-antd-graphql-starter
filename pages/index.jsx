import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Head from "next/head";
import getConfig from "next/config";
const {
  publicRuntimeConfig: { appName },
} = getConfig();

import { i18n, withTranslation } from "~/lib/i18n";

import { Layout, Button } from "antd";
const { Content } = Layout;

const Homepage = ({ t }) => (
  <Fragment>
    <Head>
      <title>
        {appName} - {t("index.head_title")}
      </title>
    </Head>
    <Content className="padding-50">
      <div>
        <Button
          onClick={() =>
            i18n.changeLanguage(i18n.language === "en" ? "fr" : "en")
          }
        >
          {t("change-locale")}
        </Button>
      </div>
    </Content>
  </Fragment>
);

Homepage.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

Homepage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(Homepage);

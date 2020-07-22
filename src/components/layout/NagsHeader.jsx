import React from "react";
import PropTypes from "prop-types";

import { Layout, Menu } from "antd";
const { Header } = Layout;

import { withTranslation } from "~/lib/i18n";

const NagsHeader = ({ t }) => {
  return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
  );
};

NagsHeader.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation(["common"])(NagsHeader);

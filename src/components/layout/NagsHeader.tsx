import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import { Layout, Menu } from 'antd';

import { withTranslation, Router } from '~/lib/i18n';

const { Header } = Layout;

const NagsHeader = ({ t }) => {
  const router = useRouter();

  const handleMenuClick = (e) => Router.push(e.key);

  return (
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        onClick={handleMenuClick}
        selectedKeys={[router.pathname]}
        mode="horizontal"
      >
        <Menu.Item key="/">{t('header.home_menu_item')}</Menu.Item>
        <Menu.Item key="/users">{t('header.users_menu_item')}</Menu.Item>
        <Menu.Item key="/users-no-ssr">
          {t('header.users_no_ssr_menu_item')}
        </Menu.Item>
      </Menu>
    </Header>
  );
};

NagsHeader.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation(['common'])(NagsHeader);

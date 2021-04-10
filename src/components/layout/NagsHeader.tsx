import React from 'react';
import { useRouter } from 'next/router';

import { Layout, Menu } from 'antd';

import { useTranslation } from 'next-i18next';

const { Header } = Layout;

const NagsHeader = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleMenuClick = (e) => router.push(e.key);

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

export default NagsHeader;

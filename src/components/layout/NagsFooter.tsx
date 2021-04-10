import React from 'react';

import { Layout } from 'antd';

import { useTranslation } from 'next-i18next';

const { Footer } = Layout;

const NagsFooter = () => {
  const { t } = useTranslation();
  return (
    <Footer className="text-align-center">
      {t('footer')}
      <script> </script>
      {/* Fix bug Chrome that causes CSS transitions to fire */}
    </Footer>
  );
};

export default NagsFooter;

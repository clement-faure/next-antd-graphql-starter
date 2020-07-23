import React from 'react';
import PropTypes from 'prop-types';

import { Layout } from 'antd';

import { withTranslation } from '~/lib/i18n';

const { Footer } = Layout;

const NagsFooter = ({ t }) => {
  return (
    <Footer className="text-align-center">
      {t('footer')}
      <script> </script>
      {/* Fix bug Chrome that causes CSS transitions to fire */}
    </Footer>
  );
};

NagsFooter.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation(['common'])(NagsFooter);

import React from 'react';
import { addDecorator } from '@storybook/react';

import { I18nextProvider } from 'react-i18next';

// We reuse the same config as in our app
import { i18n } from '~/lib/i18n';

// The decorator
const withI18n = (storyFn) => (
  // I needed this suspense to shut off error on page reload, I think Next has a top level Suspense out-of-the-box
  <React.Suspense fallback={'Loading i18n...'}>
    <I18nextProvider i18n={i18n}>{storyFn()}</I18nextProvider>
  </React.Suspense>
);

addDecorator(withI18n);

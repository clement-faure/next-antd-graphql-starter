import { addDecorator } from '@storybook/react';

import { I18nextProvider } from 'react-i18next';
import mockedI18n from './mocks/i18n';

const withI18n = (storyFn) => (
  <React.Suspense fallback={'Loading i18n...'}>
    <I18nextProvider i18n={mockedI18n}>{storyFn()}</I18nextProvider>
  </React.Suspense>
);

addDecorator(withI18n);

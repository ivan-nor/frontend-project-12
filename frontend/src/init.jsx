import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as ReduxProvider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './components/App';
import resources from './locales/index.js';
import store from './slices/index.js';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <I18nextProvider i18n={i18n}>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </I18nextProvider>
  );
};

export default init;

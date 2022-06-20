import { appWithTranslation } from 'next-i18next';
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SWRConfig } from 'swr';

import { wrapper } from 'redux/configStore';

import 'antd/dist/antd.css';
import '../styles/_app.scss';

const onBeforeLift = (store: any) => () => {};

const MyApp = ({ Component, pageProps }: any) => {
  const store = useStore();
  const isClient = typeof window !== 'undefined';

  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <SWRConfig>
      {isClient ? (
        <PersistGate persistor={(store as any).__persistor} loading={null} onBeforeLift={onBeforeLift(store)}>
          {getLayout(<Component {...pageProps} />)}
        </PersistGate>
      ) : (
        <Component {...pageProps} />
      )}
    </SWRConfig>
  );
};

export default wrapper.withRedux(appWithTranslation(MyApp));

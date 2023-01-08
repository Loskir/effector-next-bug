import { AppProps } from 'next/app';
import { FC } from 'react';
import { Provider } from 'effector-react/scope';
import { fork, Scope, serialize} from 'effector';

let clientScope: Scope;

const App: FC<AppProps<{ initialState: any }>> = ({ Component, pageProps }) => {
  const scope = fork({
    values: {
      ...(clientScope && serialize(clientScope)),
      ...pageProps.initialState,
    },
  });

  if (typeof window !== 'undefined') {
    clientScope = scope;
  }

  return (
    <Provider
      // @ts-ignore
      key={scope?.graphite?.id || '0'}
      value={scope}
    >
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;

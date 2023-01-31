import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';
import { CartProvider, UiProvider, AuthProvider } from '../context';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../themes/light-theme';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <AuthProvider>
          <CartProvider>
            <UiProvider>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
            </UiProvider>
          </CartProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  );
}

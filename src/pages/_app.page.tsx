import React from 'react';

import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { Router, useRouter } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import theme from '../theme';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Admin from './admin/adminNav';
import { Footer, Header } from '../components/import-export';
import { apiFetch } from '../redux/redux-api/redux-api';

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});
Router.events.on('routeChangeError', () => {
  console.log('Error');
});

export default function MyApp(props) {
  const { Component, pageProps, categoryes, sideMenue } = props;

  const router = useRouter();

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>

        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {!router.pathname.includes('/admin') ? (
            <Header category={categoryes} menue={sideMenue} />
          ) : (
            <Admin />
          )}
          <Component {...pageProps} />
          <Footer />
        </Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  // Make any initial calls we need to fetch data required for SSR
  const categoryes = await apiFetch({ table: 'menue' });
  const sideMenue = await apiFetch({ table: 'category' });

  // Load the page getInitiaProps
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps({ sideMenue, categoryes, ...ctx });
  }

  return { pageProps, categoryes, sideMenue };
  // Or, if the async data is separate from your page props:
};

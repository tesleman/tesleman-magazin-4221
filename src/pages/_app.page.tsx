import React from 'react';

import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Router, { Router as Rout, useRouter } from 'next/router';
import type { AppContext, AppProps /*, AppContext */ } from 'next/app';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import theme from '../theme';
import { Provider } from 'react-redux';
import store from '../redux/store';

import { Footer, Header } from '../components/import-export';
import { apiFetch } from '../redux/redux-api/redux-api';
import cookie from 'cookie';

NProgress.configure({ showSpinner: false });

Rout.events.on('routeChangeStart', () => {
  NProgress.start();
});
Rout.events.on('routeChangeComplete', () => {
  NProgress.done();
});
Rout.events.on('routeChangeError', () => {
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
        <title>My shop</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={theme}>
        <Provider store={store}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {!router.pathname.includes('/admin') && (
            <Header category={categoryes} menue={sideMenue} />
          )}
          <Component {...pageProps} />
          {!router.pathname.includes('/admin') && <Footer />}
        </Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}
interface AppContextExtends extends AppContext {
  sideMenue: any;
}

MyApp.getInitialProps = async ({ Component, ctx }: AppContextExtends) => {
  let pageProps = {};
  const cooc = ctx.req?.headers.cookie || 'auth=';
  const cookies = cookie.parse(cooc);

  if (ctx.pathname.includes('/admin') && ctx.req) {
    const user = await fetch(`${process.env.DOMAIN}/api/login`, {
      headers: {
        'Content-Type': 'application/json',
        cookies: cookies.auth,
        // Authorization: `Bearer ${cookies.Bearer}`,
      },
    });

    if (user.status === 401 && ctx.pathname.includes('/admin') && ctx.req) {
      ctx.res?.writeHead(302, {
        Location: '/login',
      });
      ctx.res?.end();
    }
    if (user.status === 200 && ctx.pathname.includes('/login') && ctx.req) {
      ctx.res?.writeHead(302, {
        Location: '/admin',
      });
      ctx.res?.end();
    }
  }
  // Make any initial calls we need to fetch data required for SSR
  const categoryes = await apiFetch({ table: 'menue' });
  const sideMenue = await apiFetch({ table: 'category' });

  // Load the page getInitiaProps
  if (Component.getInitialProps) {
    //@ts-ignore
    pageProps = await Component.getInitialProps({ sideMenue, categoryes, ...ctx });
  }

  return { pageProps, categoryes, sideMenue };
  // Or, if the async data is separate from your page props:
};

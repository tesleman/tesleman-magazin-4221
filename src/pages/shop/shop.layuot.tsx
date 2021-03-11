import React from 'react';
import Image from 'next/image';

import { Breadcrumbs, Container, Grid } from '@material-ui/core';

import { useStyles, useStylesType } from './styles/shop.style';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ShopLayuot = ({ children }) => {
  const style: useStylesType = useStyles();
  const routwr = useRouter();
  const breadcrumbs = routwr.query.slug && routwr.query.slug.toString().split('_').join(' ');

  return (
    <div>
      <div className={style.imagin}>
        <Image src="/shop-1.jpg" layout="fill" objectFit="fill" objectPosition="top" />
      </div>
      <Container className={style.root}>
        <div className={style.headerShop}>
          <div className={style.wrapper}>
            <h1>SHOP</h1>
            <Breadcrumbs aria-label="breadcrumb">
              <Link href="/">Home</Link>
              <Link href="/shop">Shop</Link>
              {routwr.query.slug && <Link href={`/shop/${routwr.query.slug}`}>{breadcrumbs}</Link>}
            </Breadcrumbs>
          </div>
        </div>
        <div className={style.head}>
          <Grid container>
            <Grid item xs={6}>
              Showing 1–12 of 76 results
            </Grid>
            <Grid item xs={6}>
              Фильтр
            </Grid>
          </Grid>
        </div>
        {children}
      </Container>
    </div>
  );
};

export default ShopLayuot;

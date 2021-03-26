import React from 'react';
import Image from 'next/image';

import { Breadcrumbs, Container, Grid, Typography } from '@material-ui/core';

import { useStyles, useStylesType } from './style.layout';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Filters from './Filters';

const Layuot = (props) => {
  const {
    breadcrumbsCard = '',
    children,
    src = '/shop-1.jpg',
    category = '',
    baseCategory = { category: '', link: '' },
    frome = '1',
    too = '3',
    all = '3',
  } = props;
  const style: useStylesType = useStyles();
  const routwr = useRouter();
  const breadcrumbsCatregory =
    routwr.query.slug && routwr.query.slug.toString().split('_').join(' ');

 
  return (
    <div>
      <div className={style.imagin}>
        <Image src={src} layout="fill" objectFit="fill" objectPosition="top" />
      </div>
      <Container className={style.root}>
        <div className={style.headerShop}>
          <div className={style.wrapper}>
            <h1>{category}</h1>
            <Breadcrumbs aria-label="breadcrumb">
              <Link href="/">
                <a>Home</a>
              </Link>
              <Link href={baseCategory.link}>
                <a>{baseCategory.category}</a>
              </Link>
              {routwr.query.slug && (
                <Link href={`/shop/${routwr.query.slug}`}>
                  <a>{breadcrumbsCatregory}</a>
                </Link>
              )}
              {routwr.query.card && <Typography color="textPrimary">{breadcrumbsCard}</Typography>}
            </Breadcrumbs>
          </div>
        </div>

        {!routwr.query.card && <Filters frome={frome} too={too} all={all} />}
        {children}
      </Container>
    </div>
  );
};

export default Layuot;

import React from 'react';
import Image from 'next/image';

import { Breadcrumbs, Container, Grid, Typography } from '@material-ui/core';

import { useStyles, useStylesType } from './style.layout';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Layuot = (props) => {
  const {
    breadcrumbsCard = '',
    children,
    src = '/shop-1.jpg',
    category = '',
    baseCategory = { category: '', link: '' },
  } = props;
  const style: useStylesType = useStyles();
  const routwr = useRouter();
  const breadcrumbsCatregory =
    routwr.query.slug && routwr.query.slug.toString().split('_').join(' ');

  console.log();
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
              <Link href="/">Home</Link>
              <Link href={baseCategory.link}>{baseCategory.category}</Link>
              {routwr.query.slug && (
                <Link href={`/shop/${routwr.query.slug}`}>{breadcrumbsCatregory}</Link>
              )}
              {routwr.query.card && <Typography color="textPrimary">{breadcrumbsCard}</Typography>}
            </Breadcrumbs>
          </div>
        </div>

        {children}
      </Container>
    </div>
  );
};

export default Layuot;

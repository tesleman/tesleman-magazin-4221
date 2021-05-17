import React from 'react';
import Image from 'next/image';

import { Breadcrumbs, Container, Typography } from '@material-ui/core';

import { useStyles, useStylesType } from './style.layout';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Filters from './Filters';

interface propsLayuotinterface {
  breadcrumbsCard?: string;
  children: JSX.Element;
  src?: string;
  category?: string;
  baseCategory?: { category: string; link: string };
  frome?: number;
  too?: number;
  all?: number;
  filte?: boolean;
}

const Layuot: React.FC<propsLayuotinterface> = (props) => {
  const {
    breadcrumbsCard = '',
    children,
    src = '/shop-1.jpg',
    category = '',
    baseCategory = { category: '', link: '' },
    frome = 1,
    too = 3,
    all = 3,
    filte = false,
  } = props;
  const style: useStylesType = useStyles();
  const routwr = useRouter();
  const breadcrumbsCatregory =
    routwr.query.slug && routwr.query.slug.toString().split('_').join(' ');

  return (
    <div>
      <div className={style.imagin}>
        <Image src={src} layout="fill" objectFit="fill" objectPosition="50% 100%" />
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
        <div className={style.filterWraapper}>
          {filte && <Filters frome={frome} too={too} all={all} />}
          {children}
        </div>
      </Container>
    </div>
  );
};

export default Layuot;

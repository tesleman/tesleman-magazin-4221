import React from 'react';
import { useStyles, useStylesType } from './header.style';
import Link from 'next/link';
import { Grid } from '@material-ui/core';
import Headercart from './Headercart';

const cat = [
  {
    name: 'name1',
    slug: '/slug',
    subcat: [
      {
        name: 'subcatname1',
        slug: '/subcatslug1',
      },
    ],
  },
  {
    name: 'name2',
    slug: '/slug2',
    subcat: [
      {
        name: 'subcatname2',
        slug: '/subcatslug2',
      },
      {
        name: 'subcatname3',
        slug: '/subcatslug3',
      },
      {
        name: 'subcatname4',
        slug: '/subcatslug4',
      },
    ],
  },
  {
    name: 'name3',
    slug: '/slug3',
  },
];

const Header: React.FC = () => {
  const style: useStylesType = useStyles();
  return (
    <nav className={style.nav}>
      <Grid container direction="row">
        <Grid item xs={2}>
          sad
        </Grid>
        <Grid item xs={8}>
          <ul className={style.ulRoot}>
            {cat.map((el) => (
              <li key={el.slug} className={style.ulli}>
                <Link href={el.slug}>
                  <a> {el.name}</a>
                </Link>
                {el.subcat && (
                  <ul className={style.navulliul}>
                    {el.subcat.map((el) => (
                      <li className={style.li} key={el.slug}>
                        <Link href={el.slug}>
                          <a> {el.name}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item xs={2}>
          <Headercart />
        </Grid>
      </Grid>
    </nav>
  );
};
export default Header;

import React from 'react';
import { useStyles, useStylesType } from './header.style';
import Link from 'next/link';
import { Grid } from '@material-ui/core';
import Headercart from './Headercart';

const Header: React.FC<any> = ({ category }) => {
  const style: useStylesType = useStyles();
  return (
    <nav className={style.nav}>
      <Grid container direction="row">
        <Grid item xs={2}>
          Logo
        </Grid>
        <Grid item xs={8}>
          <ul className={style.ulRoot}>
            {category.length &&
              category.map((el, i) => (
                <li key={el._id + i} className={style.ulli}>
                  <Link href={`/${el.slug}`}>
                    <a> {el.title}</a>
                  </Link>
                  {el.subcat && (
                    <ul className={style.navulliul}>
                      {el.subcat.map((el) => (
                        <Link key={el.createdAt} href={`/${el.slug}`}>
                          <li className={style.li}>{el.title}</li>
                        </Link>
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

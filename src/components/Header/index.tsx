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
            {category &&
              category.map((el, i) => (
                <li key={el._id + i} className={style.ulli}>
                  <Link href={`${el.slug}`}>{el.title}</Link>

                  {el.subcat && (
                    <ul className={style.navulliul}>
                      {el.subcat.map((elem) => (
                        <Link
                          key={elem._id}
                          href={el.title === 'Shop' ? `/shop/${elem.slug}` : `${elem.slug}`}>
                          <li className={style.li}>{elem.title}</li>
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

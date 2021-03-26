import React from 'react';
import { useStyles, useStylesType } from './header.style';
import Link from 'next/link';
import { Grid } from '@material-ui/core';
import Headercart from './Headercart';

interface props {
  _id: string;
  slug: string;
  title: string;
  subcat?: Array<{
    _id: string;
    slug: string;
    title: string;
  }>;
}

const Header: React.FC<{ category: Array<props> }> = ({ category }) => {
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
                <li className={style.ulli}>
                  <Link key={el._id} href={`${el.slug}`}>
                    <a>
                      {el.title}

                      {el.subcat && (
                        <ul className={style.navulliul}>
                          {el.subcat.map((elem) => (
                            <li className={style.li}>
                              <Link
                                key={elem._id}
                                href={el.title === 'Shop' ? `/shop/${elem.slug}` : `${elem.slug}`}>
                                <a>{elem.title}</a>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </a>
                  </Link>
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

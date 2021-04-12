import React from 'react';
import { useStyles, useStylesType } from './header.style';
import Link from 'next/link';
import { Button, Grid } from '@material-ui/core';
import Headercart from './Headercart';
import TemporaryDrawer from './SideMenue';

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

export interface menueI {
  slug: string;
  title: string;
  _id: string;
  meta?: string;
}
const Header: React.FC<{ category: Array<props>; menue: Array<menueI> }> = ({
  category,
  menue,
}) => {
  const style: useStylesType = useStyles();

  return (
    <nav className={style.nav}>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={3}>
          <TemporaryDrawer menue={menue} />
        </Grid>
        <Grid item xs={7}>
          <ul className={style.ulRoot}>
            {category &&
              category.map((el, i) => (
                <li key={el._id} className={style.ulli}>
                  <Link href={`${el.slug}`}>
                    <a>
                      <Button className={style.button}>{el.title}</Button>
                    </a>
                  </Link>
                  {el.subcat && (
                    <ul className={style.navulliul}>
                      {el.subcat.map((elem) => (
                        <li key={elem._id} className={style.li}>
                          <Link href={`${elem.slug}`}>
                            <a>{elem.title}</a>
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

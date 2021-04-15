import React from 'react';

import MenuIcon from '@material-ui/icons/Menu';
import { menueI } from '.';
import Link from 'next/link';
import { useStyles } from './header.style';
import { List, ListItem, ListItemText, Button, Drawer, Grid } from '@material-ui/core';

const TemporaryDrawer: React.FC<{ menue: Array<menueI> }> = ({ menue }) => {
  const style = useStyles();
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open: boolean) => {
    setState(open);
  };

  const list = () => (
    <div
      role="presentation"
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <List>
        {Array.isArray(menue) &&
          menue.map((item: menueI) => (
            <Link href={`/shop/${item.slug}`} key={item._id}>
              <a className={style.sideMenueLink}>
                <ListItem className={style.ListItem} button>
                  <ListItemText primary={item.title} />
                </ListItem>
              </a>
            </Link>
          ))}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={6}>
            <Button className={style.buttonNav} size="large" onClick={() => toggleDrawer(true)}>
              <MenuIcon />
            </Button>
          </Grid>
          <Grid className={style.catalogText} item xs={6}>
            Каталог товаров
          </Grid>
        </Grid>
        <Drawer anchor="left" open={state} onClose={() => toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
};
export default TemporaryDrawer;

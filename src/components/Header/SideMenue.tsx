import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import { menueI } from '.';
import Link from 'next/link';
import { useStyles } from './header.style';

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
      onKeyDown={() => toggleDrawer(false)}>
      <List>
        {menue.map((item: menueI, index: number) => (
          <Link href={`/shop/${item.slug}`} key={item._id}>
            <a className={style.sideMenueLink}>
              <ListItem button>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>

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
        <Button className={style.buttonNav} size="large" onClick={() => toggleDrawer(true)}>
          <MenuIcon />
        </Button>
        <Drawer anchor="left" open={state} onClose={() => toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
};
export default TemporaryDrawer;

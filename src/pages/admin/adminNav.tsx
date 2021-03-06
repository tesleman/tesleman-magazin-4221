import { Container, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';

const menuItem = [
  {
    slug: 'orders',
    title: 'Заказы',
  },
  {
    slug: 'catalog',
    title: 'Каталог',
  },
  {
    slug: 'category',
    title: 'Категории',
  },
];
const AdminNav = ({ children }) => {
  return (
    <Grid container direction="row">
      <Grid item xs={2}>
        <List>
          {menuItem.map((item) => (
            <Link key={item.slug} href={`/admin/${item.slug}`}>
              <a>
                <ListItem button>
                  <ListItemText primary={item.title} />
                </ListItem>
              </a>
            </Link>
          ))}
        </List>
      </Grid>
      <Grid item xs={10}>
        {children}
      </Grid>
    </Grid>
  );
};

export default AdminNav;

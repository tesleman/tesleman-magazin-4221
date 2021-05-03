import { Container, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';

const menuItem = [
  {
    slug: 'orders',
    title: 'Заказы',
  },
  {
    slug: 'add',
    title: 'Добавить крту товара',
  },
  {
    slug: 'catalog',
    title: 'Каталог',
  },
];
const AdminNav = ({ children }) => {
  return (
    <Container>
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
    </Container>
  );
};

export default AdminNav;

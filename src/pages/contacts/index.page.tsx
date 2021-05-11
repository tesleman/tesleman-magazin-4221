import { Container, Grid, Paper } from '@material-ui/core';
import React from 'react';
import PaymentIcon from '@material-ui/icons/Payment';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import StarsIcon from '@material-ui/icons/Stars';
import Layuot from '../../components/LayaupPages';

import { useStyles } from './contact.style';

const Contacts = () => {
  const style = useStyles();
  return (
    <Layuot categor="Contacts" baseCategory={{ category: 'Contacts', link: '/contacts' }}>
      <Grid className={style.wrapper} container direction="row">
        <Grid item xs={3}>
          <Grid
            className={style.containerClass}
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <PaymentIcon className={style.icon} />
            <span className={style.margin}>some payment info</span>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid
            className={style.containerClass}
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <WatchLaterIcon className={style.icon} />
            <span className={style.margin}>some service info</span>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid
            className={style.containerClass}
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <LocalShippingIcon className={style.icon} />
            <span className={style.margin}>some shipping info</span>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid
            className={style.containerClassLast}
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <StarsIcon className={style.icon} />
            <span className={style.margin}>some original info</span>
          </Grid>
        </Grid>
      </Grid>
      <Paper style={{ padding: 35 }} elevation={3}>
        <Container>
          <h1> Some info about company</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur.
          </p>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </Container>
      </Paper>
    </Layuot>
  );
};

export default Contacts;

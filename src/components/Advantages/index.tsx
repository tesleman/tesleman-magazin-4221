import { Container, Grid } from '@material-ui/core';
import TelegramIcon from '@material-ui/icons/Telegram';
import SecurityIcon from '@material-ui/icons/Security';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import React from 'react';
import { useStyles, useStylesType } from './advantages.style';

const Advantages: React.FC = () => {
  const style: useStylesType = useStyles();
  return (
    <Container className={style.root}>
      <Grid justify="center" alignItems="center" container direction="row">
        <Grid className={style.AdvantagesItem} item md={4} xs={12}>
          <TelegramIcon />
          <h3>Fast Delivery</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed eiusmod</p>
        </Grid>
        <Grid className={style.AdvantagesItem} item md={4} xs={12}>
          <SecurityIcon />
          <h3>Fast Delivery</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed eiusmod</p>
        </Grid>
        <Grid className={style.AdvantagesItem} item md={4} xs={12}>
          <CardGiftcardIcon />
          <h3>Fast Delivery</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed eiusmod</p>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Advantages;

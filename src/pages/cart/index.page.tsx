import { Button, Container, Grid } from '@material-ui/core';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListCartItem } from '../../components/AlignItemsList';
import { Layuot } from '../../components/import-export';
import {
  RootState,
  addTooCart,
  plussItmCount,
  minusItmCount,
  removeItem,
} from '../pages_import_export';

import { useStyles } from './style.cart';

const Cart = () => {
  const style = useStyles();

  const { cart, totalCartPrice } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const plusHendl = React.useCallback((id: string) => dispatch(plussItmCount(id)), []);
  const minusHendl = React.useCallback((id: string) => dispatch(minusItmCount(id)), []);
  const removeHendl = React.useCallback((id: string) => dispatch(removeItem(id)), []);
  return (
    <Layuot
      baseCategory={{ category: 'Cart', link: '/cart' }}
      category="Cart"
      src={'/wishlist.jpg'}>
      <Container>
        <Grid container direction="row" justify="center">
          <Grid item xs={6}>
            {cart.map((elem) => (
              <ListCartItem
                elem={elem}
                plusHendl={plusHendl}
                minusHendl={minusHendl}
                removeHendl={removeHendl}
              />
            ))}
          </Grid>
        </Grid>
      </Container>
      {cart && (
        <Button color="secondary" variant="contained">
          Sucess
        </Button>
      )}
    </Layuot>
  );
};

export default Cart;

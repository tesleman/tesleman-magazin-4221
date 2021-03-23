import { Grid } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  ListCartItem,
  minusItmCount,
  plussItmCount,
  removeItem,
  RootState,
} from '../pages_import_export';
import { useStyles } from './style.cart';

export default function CartStepperItem() {
  const style = useStyles();
  const dispatch = useDispatch();
  const { cart, totalCartPrice } = useSelector((state: RootState) => state.cart);

  const plusHendl = React.useCallback((id: string) => dispatch(plussItmCount(id)), []);
  const minusHendl = React.useCallback((id: string) => dispatch(minusItmCount(id)), []);
  const removeHendl = React.useCallback((id: string) => dispatch(removeItem(id)), []);
  return (
    <div>
      <Grid container direction="row" justify="center">
        <Grid item xs={6}>
          {cart.map((elem) => (
            <ListCartItem
              key={elem._id}
              elem={elem}
              plusHendl={plusHendl}
              minusHendl={minusHendl}
              removeHendl={removeHendl}
            />
          ))}
        </Grid>
        <div>
          <div>All Price </div>$ {totalCartPrice}
        </div>
      </Grid>
    </div>
  );
}

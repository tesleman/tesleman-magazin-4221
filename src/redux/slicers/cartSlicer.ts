import { createSlice } from '@reduxjs/toolkit';
import { cardInterface } from '../../components/component-types';

const getTottalPrice = (arr) =>
  arr.reduce((accumulator, currentValue) => accumulator + currentValue.totalPrice, 0);

const getTotalPrice = (state) => {
  const all = getTottalPrice(state.cart);
  state.totalCartPrice = all;
};

export interface cartInterface extends cardInterface {
  totalPrice: number;
  count: number;
}
const initialState: { cart: Array<cartInterface>; totalCartPrice: number } = {
  cart: [],
  totalCartPrice: 0,
};

const CartSlise = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addTooCart(state, action) {
      state.cart.push({ ...action.payload, count: 1, totalPrice: +action.payload.price });
      getTotalPrice(state);
    },
    plussItmCount(state, action) {
      const index = state.cart.findIndex((elem) => elem._id === action.payload);
      console.log(index);
      state.cart[index].count = state.cart[index].count + 1;
      state.cart[index].totalPrice = state.cart[index].price * state.cart[index].count;

      getTotalPrice(state);
    },
  },
});

export const { addTooCart, plussItmCount } = CartSlise.actions;
export default CartSlise.reducer;

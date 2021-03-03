import { createSlice } from '@reduxjs/toolkit';

const initialState = { cart: [] };

const CartSlise = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addTooCart(state, action) {
      state.cart.push({ ...action.payload, count: 1 });
    },
  },
});

export const { addTooCart } = CartSlise.actions;
export default CartSlise.reducer;

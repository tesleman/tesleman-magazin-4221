import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cardInterface } from '../../components/component-types';

const getTottalPrice = (arr: Array<cartInterface>) =>
  arr.reduce((accumulator, currentValue) => accumulator + currentValue.totalPrice, 0);

const getTotalPrice = (state: initialStateInterface) => {
  const all = getTottalPrice(state.cart);
  state.totalCartPrice = all;
};

const findIndex = (state: initialStateInterface, action: PayloadAction<string>) => {
  const index = state.cart.findIndex((elem) => elem._id === action.payload);
  return index;
};

const statePlus = (state: initialStateInterface, index: number) => {
  return state.cart[index].count + 1;
};
const stateMinus = (state: initialStateInterface, index: number) => {
  if (state.cart[index].count <= 0) return;
  return state.cart[index].count - 1;
};
const chang = (
  state: initialStateInterface,
  action: PayloadAction<string>,
  arg: (state: initialStateInterface, index: number) => number,
) => {
  const index = findIndex(state, action);
  state.cart[index].count = arg(state, index);

  state.cart[index].totalPrice = +state.cart[index].price * +state.cart[index].count;
};

export interface cartInterface extends cardInterface {
  totalPrice: number;
  count: number;
}
interface initialStateInterface {
  cart: Array<cartInterface>;
  totalCartPrice: number;
}
const initialState: initialStateInterface = {
  cart: [],
  totalCartPrice: 0,
};

const CartSlise = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addTooCart(state: initialStateInterface, action: PayloadAction<cardInterface>) {
      const cartItemCount = action.payload.count ? action.payload.count : 1;
      state.cart.push({
        ...action.payload,
        count: cartItemCount,
        totalPrice: +action.payload.price * cartItemCount,
      });
      getTotalPrice(state);
    },
    plussItmCount(state: initialStateInterface, action: PayloadAction<string>) {
      chang(state, action, statePlus);
      getTotalPrice(state);
    },
    minusItmCount(state: initialStateInterface, action: PayloadAction<string>) {
      chang(state, action, stateMinus);
      getTotalPrice(state);
    },
    removeItem(state: initialStateInterface, action: PayloadAction<string>) {
      state.cart = state.cart.filter((elem) => elem._id !== action.payload);
      getTotalPrice(state);
    },
  },
});

export const { addTooCart, plussItmCount, minusItmCount, removeItem } = CartSlise.actions;
export default CartSlise.reducer;

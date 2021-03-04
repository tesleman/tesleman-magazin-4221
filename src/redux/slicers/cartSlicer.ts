import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
const chang = (
  state: initialStateInterface,
  action: PayloadAction<string>,
  arg: 'pluss' | 'minus',
) => {
  const index = findIndex(state, action);
  state.cart[index].count =
    arg === 'pluss' ? state.cart[index].count + 1 : state.cart[index].count - 1;
  state.cart[index].totalPrice = state.cart[index].price * state.cart[index].count;
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
      state.cart.push({ ...action.payload, count: 1, totalPrice: +action.payload.price });
      getTotalPrice(state);
    },
    plussItmCount(state: initialStateInterface, action: PayloadAction<string>) {
      chang(state, action, 'pluss');
      getTotalPrice(state);
    },
    minusItmCount(state: initialStateInterface, action: PayloadAction<string>) {
      chang(state, action, 'minus');
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

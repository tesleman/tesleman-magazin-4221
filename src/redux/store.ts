import { configureStore } from '@reduxjs/toolkit';
import CardSlise from './slicers/cardSlice';
import CartSlise from './slicers/cartSlicer';
// ...

const store = configureStore({
  reducer: {
    card: CardSlise,
    cart: CartSlise,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export const getCard = createAsyncThunk('card/fetch', async (val: string) => {
  const card = await fetch(`http://localhost:3000/api/card?limit=3&category=${val}`);
  const data = await card.json();
  return data.data;
});

const initialState = { entities: [], loading: 'idle', currentRequestId: undefined, error: null };

const CardSlise = createSlice({
  name: 'card',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCard.fulfilled, (state, { payload }) => {
      state.entities = payload;
    });
  },
});

export const {} = CardSlise.actions;
export default CardSlise.reducer;

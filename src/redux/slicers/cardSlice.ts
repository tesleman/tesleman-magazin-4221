import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetch } from '../redux-api/redux-api';

export const getCard = createAsyncThunk('card/fetch', async (payload: any) => {
  const card = await apiFetch(payload);

  return card;
});

const initialState = { entities: [], loading: 'idle', currentRequestId: undefined, error: null };

const CardSlise = createSlice({
  name: 'card',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCard.fulfilled, (state, actyon) => {
      state.entities = actyon.payload;
    });
  },
});

export const {} = CardSlise.actions;
export default CardSlise.reducer;

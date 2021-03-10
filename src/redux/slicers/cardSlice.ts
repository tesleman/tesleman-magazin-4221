import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetch } from '../redux-api/redux-api';

export const getCard = createAsyncThunk('card/fetch', async (payload: any) => {
  const card = await apiFetch(payload);

  return card;
});

const initialState = {
  pageLenght: 0,
  totalCount: 0,
  entities: [],
  loading: 'idle',
  currentRequestId: undefined,
  error: null,
};

const CardSlise = createSlice({
  name: 'card',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCard.fulfilled, (state, actyon) => {
      state.entities = actyon.payload.data;
      state.totalCount = actyon.payload.totalCount;
      state.pageLenght = actyon.payload.pageLenght;
    });
  },
});

export const {} = CardSlise.actions;
export default CardSlise.reducer;

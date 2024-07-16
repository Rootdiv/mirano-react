import { createSlice } from '@reduxjs/toolkit';
import { registerCart, fetchCart, addItemToCard } from '@/redux/thunks/cartThunk';

const initialState = {
  isOpen: false,
  items: [],
  totalPrice: 0,
  status: 'idle',
  accessKey: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerCart.pending, state => {
        state.status = 'loading';
      })
      .addCase(registerCart.fulfilled, (state, action) => {
        state.status = 'success';
        state.accessKey = action.payload.accessKey;
      })
      .addCase(registerCart.rejected, (state, action) => {
        state.status = 'failed';
        state.accessKey = '';
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchCart.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;
        state.totalPrice = state.items.reduce(
          (acc, { price, quantity }) => acc + price * quantity,
          0,
        );
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(addItemToCard.pending, state => {
        state.status = 'loading';
      })
      .addCase(addItemToCard.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;
        state.totalPrice = state.items.reduce(
          (acc, { price, quantity }) => acc + price * quantity,
          0,
        );
      })
      .addCase(addItemToCard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { toggleCart } = cartSlice.actions;

export default cartSlice.reducer;

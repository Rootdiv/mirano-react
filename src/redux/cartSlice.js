import { API_URL } from '@/const';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const registerCart = createAsyncThunk('cart/registerCart', async () => {
  const response = await fetch(`${API_URL}/api/cart/register`, {
    method: 'POST',
    credentials: 'include',
  });
  return response.json();
});

const initialState = {
  isOpen: false,
  items: JSON.parse(localStorage.getItem('cartItems') || '[]'),
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
    addItemToCard(state, action) {
      const { id, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
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
        state.error = action.error.message;
      });
  },
});

export const { toggleCart, addItemToCard } = cartSlice.actions;

export default cartSlice.reducer;

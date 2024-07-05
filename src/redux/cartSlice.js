import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  items: JSON.parse(localStorage.getItem('cartItems') || '[]'),
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
});

export const { toggleCart, addItemToCard } = cartSlice.actions;

export default cartSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/redux/cartSlice';
import modalReducer from '@/redux/modalSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
  },
});

export default store;

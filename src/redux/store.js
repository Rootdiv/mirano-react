import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/redux/cartSlice';
import orderReducer from '@/redux/orderSlice';
import goodsReducer from '@/redux/goodsSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    goods: goodsReducer,
  },
});

export default store;

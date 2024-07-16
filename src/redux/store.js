import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/redux/slices/cartSlice';
import orderReducer from '@/redux/slices/orderSlice';
import goodsReducer from '@/redux/slices/goodsSlice';
import filtersReducer from '@/redux/slices/filtersSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    goods: goodsReducer,
    filters: filtersReducer,
  },
});

export default store;

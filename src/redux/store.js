import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/redux/cartSlice';
import orderReducer from '@/redux/orderSlice';
import goodsReducer from '@/redux/goodsSlice';
import filtersReducer from '@/redux/filtersSlice';
import searchReducer from '@/redux/searchSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    goods: goodsReducer,
    filters: filtersReducer,
    search: searchReducer,
  },
});

export default store;

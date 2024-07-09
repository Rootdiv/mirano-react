import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: 'bouquets',
  typeName: 'Цветы',
  minPrice: '',
  maxPrice: '',
  category: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    typeChange(state, action) {
      state.type = action.payload.type;
      state.typeName = action.payload.typeName;
      state.minPrice = '';
      state.maxPrice = '';
      state.category = '';
    },
    minPriceChange(state, action) {
      state.minPrice = action.payload.minPrice;
    },
    maxPriceChange(state, action) {
      state.maxPrice = action.payload.maxPrice;
    },
  },
});

export const { typeChange, minPriceChange, maxPriceChange } = filtersSlice.actions;

export default filtersSlice.reducer;

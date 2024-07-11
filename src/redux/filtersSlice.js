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
    priceChange(state, action) {
      state[action.payload.name] = action.payload.value;
    },
  },
});

export const { typeChange, priceChange } = filtersSlice.actions;

export default filtersSlice.reducer;

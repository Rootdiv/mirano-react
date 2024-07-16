import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: 'bouquets',
  typeName: 'Цветы',
  minPrice: '',
  maxPrice: '',
  category: '',
  search: '',
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
      state.search = '';
    },
    priceChange(state, action) {
      state[action.payload.name] = action.payload.value;
    },
    categoryChange(state, action) {
      state.category = action.payload;
    },
    searchChange(state, action) {
      state.type = '';
      state.typeName = 'Результат поиска';
      state.minPrice = '';
      state.maxPrice = '';
      state.category = '';
      state.search = action.payload;
    },
  },
});

export const { typeChange, priceChange, categoryChange, searchChange } = filtersSlice.actions;

export default filtersSlice.reducer;

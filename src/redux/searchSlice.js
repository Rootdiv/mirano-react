import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  text: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchText(state, action) {
      state.text = action.payload;
    },
  },
});

export const { searchText } = searchSlice.actions;

export default searchSlice.reducer;

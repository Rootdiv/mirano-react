import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    closeModal(state) {
      state.isOpen = false;
    },
    openOrder(state) {
      state.isOpen = true;
    },
  },
});

export const { closeModal } = modalSlice.actions;
export const { openOrder } = modalSlice.actions;

export default modalSlice.reducer;

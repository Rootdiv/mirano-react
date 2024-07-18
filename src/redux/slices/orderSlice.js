import { createSlice } from '@reduxjs/toolkit';
import { sendOrder } from '@/redux/thunks/orderThunk';

const initialState = {
  isOpen: false,
  orderId: '',
  status: 'idle',
  error: null,
  data: {
    bayerName: '',
    bayerPhone: '',
    recipientName: '',
    recipientPhone: '',
    street: '',
    house: '',
    flat: '',
    paymentOnline: true,
    deliveryDate: '',
    deliveryTime: '',
  },
};

const modalSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    openModal(state) {
      state.isOpen = true;
      state.orderId = '';
    },
    closeModal(state) {
      state.isOpen = false;
    },
    clearOrder(state) {
      state.data = {
        bayerName: '',
        bayerPhone: '',
        recipientName: '',
        recipientPhone: '',
        street: '',
        house: '',
        flat: '',
        paymentOnline: true,
        deliveryDate: '',
        deliveryTime: '',
      };
    },
    updateOrderData(state, action) {
      state.data = { ...state.data, ...action.payload };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(sendOrder.pending, state => {
        state.status = 'loading';
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.status = 'success';
        state.orderId = action.payload.orderId;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { openModal, closeModal, clearOrder, updateOrderData } = modalSlice.actions;

export default modalSlice.reducer;

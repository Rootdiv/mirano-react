import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCart, toggleCart } from '@/redux/cartSlice';
import { API_URL } from '@/const';

export const sendOrder = createAsyncThunk(
  'order/sendOrder',
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const {
        order: {
          data: {
            bayerName,
            bayerPhone,
            recipientName,
            recipientPhone,
            street,
            house,
            flat,
            paymentOnline,
            deliveryDate,
            deliveryTime,
          },
        },
      } = getState();

      const orderData = {
        buyer: {
          name: bayerName,
          phone: bayerPhone,
        },
        recipient: {
          name: recipientName,
          phone: recipientPhone,
        },
        address: `${street}, ${house}, ${flat}`,
        paymentOnline,
        deliveryDate,
        deliveryTime,
      };

      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Не удалось отправить заказ');
      }

      dispatch(toggleCart());
      dispatch(fetchCart());

      return await response.json();
    } catch (error) {
      rejectWithValue(error.message);
    }
  },
);

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
      state.data = action.payload;
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

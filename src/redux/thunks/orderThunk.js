import { createAsyncThunk } from '@reduxjs/toolkit';
import { toggleCart } from '@/redux/slices/cartSlice';
import { fetchCart } from '@/redux/thunks/cartThunk';
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

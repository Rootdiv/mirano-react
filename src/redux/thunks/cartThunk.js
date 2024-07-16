import { API_URL } from '@/const';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const registerCart = createAsyncThunk(
  'cart/registerCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/cart/register`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Не удалось зарегистрировать корзину');
      }

      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/api/cart`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Не удалось получить данные корзины');
    }

    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addItemToCard = createAsyncThunk(
  'cart/addItemToCard',
  async ({ productId, quantity }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const cartItems = state.cart.items;

      if (isNaN(parseInt(quantity))) {
        const cartItem = cartItems.find(item => item.id === productId);
        quantity = cartItem ? cartItem.quantity + 1 : 1;
      }

      const response = await fetch(`${API_URL}/api/cart/items`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        throw new Error('Не удалось отправить товар в корзину');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

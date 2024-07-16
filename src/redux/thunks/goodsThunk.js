import { API_URL } from '@/const';
import { createAsyncThunk } from '@reduxjs/toolkit';

const formatQueryString = params => {
  if (!params || Object.keys(params).length === 0) {
    return '';
  }

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, value);
  });

  return `?${searchParams.toString()}`;
};

export const fetchGoods = createAsyncThunk(
  'goods/fetchGoods',
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/products${formatQueryString(params)}`);

      if (!response.ok) {
        throw new Error('Не удалось получить товары');
      }

      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

import { API_URL } from '@/const';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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

export const fetchGoods = createAsyncThunk('goods/fetchGoods', async params => {
  const response = await fetch(`${API_URL}/api/products${formatQueryString(params)}`);

  if (!response.ok) {
    throw new Error('Не удалось получить товары');
  }

  return response.json();
});

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  categories: [],
};

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchGoods.pending, state => {
        state.status = 'loading';
        state.categories = [];
      })
      .addCase(fetchGoods.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;
        action.payload.forEach(product => {
          if (product.categories) {
            product.categories.forEach(category => {
              if (!state.categories.includes(category)) {
                state.categories.push(category);
              }
            });
          }
        });
      })
      .addCase(fetchGoods.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default goodsSlice.reducer;

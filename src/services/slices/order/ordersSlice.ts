import { getFeedsApi } from '@api';
import {
  SerializedError,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface ordersState {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
  error: SerializedError | null | unknown;
  ordersLoading: boolean;
}

const initialState: ordersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: '',
  ordersLoading: false
};

export const getOrders = createAsyncThunk('burger/orders', getFeedsApi);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.error = null;
        state.ordersLoading = true;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.error = action.payload;
        state.ordersLoading = false;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.ordersLoading = false;
      });
  },
  selectors: {
    getOrdersSelector: (state) => state.orders,
    getTotalsSelector: (state) => state.total,
    getTotalTodaySelector: (state) => state.totalToday,
    loadingSelector: (state) => state.ordersLoading
  }
});

export const ordersReduсer = ordersSlice.reducer;
export const { getOrdersSelector, getTotalsSelector, getTotalTodaySelector } =
  ordersSlice.selectors;

import { getFeedsApi, getOrderByNumberApi } from '@api';
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
  order: Array<TOrder>;
}

const initialState: ordersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: '',
  ordersLoading: false,
  order: []
};

export const getOrders = createAsyncThunk('burger/orders', getFeedsApi);

export const getOrder = createAsyncThunk('burger/order', getOrderByNumberApi);

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
      })
      .addCase(getOrder.pending, (state) => {
        state.error = null;
        state.ordersLoading = true;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.error = action.payload;
        state.ordersLoading = false;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.order = action.payload.orders;
        state.ordersLoading = false;
      });
  },
  selectors: {
    getOrdersSelector: (state) => state.orders,
    getTotalsSelector: (state) => state.total,
    getTotalTodaySelector: (state) => state.totalToday,
    loadingSelector: (state) => state.ordersLoading,
    selectOrder: (state) => state.order
  }
});

export const ordersReduсer = ordersSlice.reducer;
export const {
  getOrdersSelector,
  getTotalsSelector,
  getTotalTodaySelector,
  selectOrder
} = ordersSlice.selectors;

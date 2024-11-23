import { getOrdersApi, orderBurgerApi } from '../../../utils/burger-api';
import {
  SerializedError,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface IOrderSliceState {
  order: TOrder | null;
  name: string;
  error: SerializedError | null | unknown;
  ordersLoading: boolean;
  orderRequest: boolean;
  orders: TOrder[];
}

export const initialState: IOrderSliceState = {
  order: null,
  ordersLoading: false,
  error: null,
  name: '',
  orderRequest: false,
  orders: []
};

export const makeOrder = createAsyncThunk('order/makeOrder', orderBurgerApi);

export const getMyOrders = createAsyncThunk('order/getOrder', getOrdersApi);

export const myOrdersSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state) => {
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(makeOrder.rejected, (state, action) => {
        state.error = action.payload;
        state.orderRequest = false;
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.name = action.payload.name;
        state.orderRequest = false;
      })
      .addCase(getMyOrders.pending, (state) => {
        state.error = null;
        state.ordersLoading = true;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.error = action.payload;
        state.ordersLoading = false;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.ordersLoading = false;
      });
  },
  selectors: {
    getOrderSelector: (state) => state.order,
    getNameSelector: (state) => state.name,
    getOrderRequestSelector: (state) => state.orderRequest,
    getMyOrdersSelector: (state) => state.orders
  }
});

export const { clearOrder } = myOrdersSlice.actions;
export const orderReduсer = myOrdersSlice.reducer;
export const {
  getOrderSelector,
  getNameSelector,
  getOrderRequestSelector,
  getMyOrdersSelector
} = myOrdersSlice.selectors;

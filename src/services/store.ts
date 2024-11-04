import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientReduсer } from './slices/burger/ingredientSlice';
import { constructorReduсer } from './slices/burger/constructorSlice';
import { ordersReduсer } from './slices/order/ordersSlice';
import { userReduсer } from './slices/auth/userSlice';
import { orderReduсer } from './slices/order/myOrderSlice';

const rootReducer = combineReducers({
  ingredients: ingredientReduсer,
  burger: constructorReduсer,
  orders: ordersReduсer,
  user: userReduсer,
  order: orderReduсer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;

import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../../utils/cookie';

export interface UserState {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  data: null | TUser;
  UserError: null | string;
  UserRequest: boolean;
}

const initialState: UserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: null,
  UserError: null,
  UserRequest: false
};

export const loginUserThunk = createAsyncThunk(
  'users/loginUser',
  async (data: TLoginData) => {
    const dataReg = await loginUserApi(data);
    setCookie('accessToken', dataReg.accessToken);
    localStorage.setItem('refreshToken', dataReg.refreshToken);
    return dataReg.user;
  }
);

export const registerUserThunk = createAsyncThunk(
  'users/registerUser',
  async (data: TRegisterData) => {
    const dataReg = await registerUserApi(data);
    setCookie('accessToken', dataReg.accessToken);
    localStorage.setItem('refreshToken', dataReg.refreshToken);
    return dataReg.user;
  }
);

export const getUserThunk = createAsyncThunk('users/getUser', getUserApi);
export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  updateUserApi
);
export const logoutUserThunk = createAsyncThunk('user/logout', async () => {
  logoutApi().then(() => {
    localStorage.clear();
    deleteCookie('accessToken');
  });
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, (state) => {
      state.UserRequest = true;
      state.UserError = null;
    });
    builder.addCase(loginUserThunk.rejected, (state) => {
      state.UserRequest = false;
      state.isAuthChecked = true;
      state.UserError = 'Неверные данные пользователя';
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.isAuthChecked = true;
      state.isAuthenticated = true;
      state.data = action.payload;
    });
    builder.addCase(registerUserThunk.pending, (state) => {
      state.UserRequest = true;
      state.UserError = null;
    });
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      state.UserRequest = false;
      state.isAuthChecked = true;
      state.UserError = 'Неверные данные пользователя';
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.isAuthChecked = true;
      state.isAuthenticated = true;
      state.data = action.payload;
    });
    builder.addCase(getUserThunk.pending, (state) => {
      state.UserRequest = true;
      state.UserError = null;
    });
    builder.addCase(getUserThunk.rejected, (state) => {
      state.isAuthChecked = true;
      state.UserRequest = false;
      state.UserError = 'Ошибка получения пользователя';
    });
    builder.addCase(getUserThunk.fulfilled, (state, { payload }) => {
      state.isAuthChecked = true;
      state.isAuthenticated = true;
      state.data = payload.user;
    });
    builder.addCase(updateUserThunk.pending, (state) => {
      state.UserRequest = true;
      state.UserError = null;
    });
    builder.addCase(updateUserThunk.rejected, (state) => {
      state.isAuthChecked = true;
      state.UserRequest = false;
      state.UserError = 'Ошибка обновления данных пользователя';
    });
    builder.addCase(updateUserThunk.fulfilled, (state, { payload }) => {
      state.isAuthChecked = true;
      state.data = payload.user;
    });
    builder.addCase(logoutUserThunk.pending, (state) => {
      state.UserRequest = true;
      state.UserError = null;
    });
    builder.addCase(logoutUserThunk.rejected, (state) => {
      state.isAuthChecked = true;
      state.UserRequest = false;
      state.UserError = 'Ошибка выхода из аккаунта';
    });
    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.isAuthChecked = true;
      state.isAuthenticated = false;
      state.data = null;
    });
  },
  selectors: {
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    isAuthenticatedSelector: (state) => state.isAuthenticated,
    dataSelector: (state) => state.data
  }
});
export const userReduсer = userSlice.reducer;
export const { isAuthCheckedSelector, isAuthenticatedSelector, dataSelector } =
  userSlice.selectors;

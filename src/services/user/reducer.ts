import { createSlice } from '@reduxjs/toolkit';

import { checkAuth, postLogin, postLogout } from './actions';

import type { IUser, IUserState } from '@/utils/types';
import type { PayloadAction } from '@reduxjs/toolkit';

export const initialState: IUserState = {
  user: null,
  isAuthChecked: false,
  forgotPassword: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
      state.user && (state.isAuthChecked = true);
    },
    setForgotPassword: (state, action: PayloadAction<boolean>) => {
      state.forgotPassword = action.payload;
    },
  },
  selectors: {
    getAuth: (state) => state.isAuthChecked,
    getUser: (state) => state.user,
    getForgotPassword: (state) => state.forgotPassword,
  },
  extraReducers: (builder) => {
    builder
      .addCase(postLogin.fulfilled, (state, action) => {
        state.user = (action as PayloadAction<IUser | null>).payload;
        state.isAuthChecked = state.user !== null;
      })
      .addCase(postLogout.fulfilled, (state: IUserState) => {
        state.user = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload ?? null;
        state.isAuthChecked = true;
      });
  },
});

export const { setAuth, setUser, setForgotPassword } = userSlice.actions;
export const { getAuth, getUser, getForgotPassword } = userSlice.selectors;

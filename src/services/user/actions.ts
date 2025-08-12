import { API_POINTS } from '@/utils/constants';
import { request } from '@/utils/request';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type {
  IEmail,
  IPasswordUpdate,
  IRegistration,
  ITokenUpdate,
  IUserAuth,
  IUserData,
  IUserPatch,
  IUserReg,
  TResponse,
} from '@/utils/types';

export const postRegistration = createAsyncThunk(
  'user/registration',
  async ({ name, email, password }: IUserReg) => {
    try {
      const registration = await request<IRegistration>(API_POINTS.register, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ name, email, password }),
      });
      localStorage.setItem('refreshToken', registration.refreshToken ?? '');
      localStorage.setItem('accessToken', registration.accessToken ?? '');
      return Promise.resolve(registration.user);
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const postLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }: IUserAuth) => {
    try {
      const login = await request<IRegistration>(API_POINTS.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem('refreshToken', login.refreshToken ?? '');
      localStorage.setItem('accessToken', login.accessToken ?? '');
      return Promise.resolve(login.user);
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const postLogout = createAsyncThunk('user/logout', async () => {
  try {
    const token = localStorage.getItem('refreshToken');
    if (token !== '') {
      postRefreshToken();
    }
    const logout = await request<TResponse>(API_POINTS.logout, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ token }),
    });
    if (logout.success) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(error);
  }
});

export const postRefreshToken = createAsyncThunk('user/token', async () => {
  try {
    const token = localStorage.getItem('refreshToken');
    const newToken = await request<ITokenUpdate>(API_POINTS.token, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ token }),
    });
    localStorage.setItem('refreshToken', newToken.refreshToken ?? '');
    localStorage.setItem('accessToken', newToken.accessToken ?? '');
    return newToken;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const postForgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async ({ email }: IEmail) => {
    try {
      const forgotPassword = await request<TResponse>(API_POINTS.forgotPassword, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      // console.log('forgotPassword', forgotPassword);
      return Promise.resolve(forgotPassword);
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const postUpdatePassword = createAsyncThunk(
  'user/resetPassword',
  async ({ password, code }: IPasswordUpdate) => {
    try {
      const resetPassword = await request<TResponse>(API_POINTS.resetPassword, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, token: code }),
      });
      // console.log(resetPassword);
      return Promise.resolve(resetPassword);
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const getProfile = createAsyncThunk('user/profile', async () => {
  try {
    const token = localStorage.getItem('accessToken') ?? '';
    if (token !== '') {
      postRefreshToken();
    }
    const userData = await request<IUserData>(API_POINTS.profile, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token,
      },
    });
    // console.log('userData', userData);
    return Promise.resolve(userData.user);
  } catch (error) {
    return Promise.reject(error);
  }
});

export const patchProfile = createAsyncThunk(
  'user/profile',
  async ({ name, email, password }: IUserReg) => {
    try {
      const token = localStorage.getItem('accessToken') ?? '';
      if (token !== '') {
        postRefreshToken();
      }
      const updateUser: IUserPatch = { name, email };
      if (password !== '') updateUser.password = password;
      const userData = await request<IUserData>(API_POINTS.profile, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: token,
        },
        body: JSON.stringify(updateUser),
      });
      // console.log('patchProfile', userData);
      return Promise.resolve(userData.user);
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

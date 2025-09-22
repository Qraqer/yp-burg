import { API_POINTS } from '@/utils/constants';
import { request } from '@/utils/request';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { setAuth, setUser } from './reducer';

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

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (__dirname, { dispatch }) => {
    if (localStorage.getItem('accessToken')) {
      try {
        dispatch(getProfile());
        dispatch(setAuth(true));
        return Promise.resolve('success');
      } catch (err) {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        dispatch(setUser(null));
        return Promise.reject(`No user found: ${err}`);
      }
    }
  }
);

const catchTokenError = <T>(promise: Promise<T>): Promise<[undefined, T] | [Error]> => {
  return promise
    .then((result) => [undefined, result] as [undefined, T])
    .catch((error) => [error]);
};

export const refreshToken = async <T extends TResponse>(): Promise<T | ITokenUpdate> => {
  const token = localStorage.getItem('refreshToken') ?? '';
  if (token === '') {
    return Promise.reject('Empty refresh token');
  }
  const [error, refreshResult] = await catchTokenError(
    request<ITokenUpdate>(API_POINTS.token, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ token }),
    })
  );
  if (error) {
    return Promise.reject(error);
  }
  localStorage.setItem('refreshToken', refreshResult.refreshToken ?? '');
  localStorage.setItem('accessToken', refreshResult.accessToken ?? '');
  return refreshResult;
};

const requestWithCheck = async <T extends TResponse>(
  url: string,
  options: RequestInit
): Promise<T> => {
  const [error, result] = await catchTokenError(request<T>(url, options));
  if (result) {
    return result;
  }
  if (error?.message === 'jwt expired') {
    const [refreshError, refreshResult] = await catchTokenError(refreshToken());
    if (refreshError) {
      return Promise.reject(refreshError);
    }
    if (!(refreshResult as ITokenUpdate).accessToken) {
      return Promise.reject('Empty refresh token');
    }
    options.headers = {
      ...options.headers,
      Authorization: (refreshResult as ITokenUpdate).accessToken ?? '',
    };
    return await request(url, options);
  }
  return Promise.reject(error);
};

export const postRegistration = createAsyncThunk(
  'user/registration',
  async ({ name, email, password }: IUserReg, { dispatch }) => {
    try {
      const registration = await request<IRegistration>(API_POINTS.register, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ name, email, password }),
      });
      localStorage.setItem('refreshToken', registration.refreshToken ?? '');
      localStorage.setItem('accessToken', registration.accessToken ?? '');
      dispatch(setUser(registration.user ?? null));
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

export const postLogout = createAsyncThunk('user/logout', async (_, { dispatch }) => {
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
      dispatch(setUser(null));
    }
    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(error);
  }
});

export const postRefreshToken = createAsyncThunk(
  'user/token',
  async (_, { dispatch }) => {
    try {
      const token = localStorage.getItem('refreshToken');
      const newToken = await request<ITokenUpdate>(API_POINTS.token, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ token }),
      });
      localStorage.setItem('refreshToken', newToken.refreshToken ?? '');
      localStorage.setItem('accessToken', newToken.accessToken ?? '');
      dispatch(setAuth(true));
      return newToken;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const postForgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async ({ email }: IEmail) => {
    try {
      const forgotPassword = await request<TResponse>(API_POINTS.forgotPassword, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
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
      return Promise.resolve(resetPassword);
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const getProfile = createAsyncThunk('user/profile', async (_, { dispatch }) => {
  if (!localStorage.getItem('accessToken')) {
    return Promise.reject('User is unauthorized');
  }
  const token = localStorage.getItem('accessToken') ?? '';
  if (token === '') {
    return Promise.reject('No token found');
  }
  const userData = await requestWithCheck<IUserData>(API_POINTS.profile, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: token,
    },
  });
  if (userData.success) {
    dispatch(setUser(userData.user));
    return Promise.resolve(userData.user);
  }
  return Promise.reject('Error refreshing token');
});

export const patchProfile = createAsyncThunk(
  'user/profile',
  async ({ name, email, password }: IUserReg, { dispatch }) => {
    if (!localStorage.getItem('accessToken')) {
      return Promise.reject('User is unauthorized');
    }
    const token = localStorage.getItem('accessToken') ?? '';
    if (token === '') {
      return Promise.reject('No token found');
    }
    const updateUser: IUserPatch = { name, email };
    if (password !== '') updateUser.password = password;
    const userData = await requestWithCheck<IUserData>(API_POINTS.profile, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token,
      },
      body: JSON.stringify(updateUser),
    });
    if (userData.success) {
      dispatch(setUser(userData.user));
      return Promise.resolve(userData.user);
    }
  }
);

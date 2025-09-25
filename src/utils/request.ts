import { API_POINTS } from './constants';

import type { ITokenUpdate, TResponse } from './types';

type TError = {
  success: boolean;
  message?: string;
  [key: string]: unknown;
};

const handleResponse = <T>(result: Response): Promise<T> => {
  return result.json();
};

const handleResult = <T extends TResponse>(result: T): Promise<T> => {
  return result.success ? Promise.resolve(result) : Promise.reject(result);
};

export const request = <T extends TResponse>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  return fetch(url, options)
    .then(handleResponse<T>)
    .then(handleResult<T>);
};

const checkResult = <T>(result: Response): Promise<T> => {
  if (result.ok) {
    return result.json();
  }

  return result.json().then(({ message }: TError) => {
    throw new Error(message);
  });
};

export const fetchData = async <T extends TResponse>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  return await fetch(url, options).then((result: Response) => {
    return checkResult<T>(result);
  });
};

const refetchToken = async (): Promise<ITokenUpdate> => {
  return await fetchData<ITokenUpdate>(API_POINTS.token, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  });
};

export const fetchDataWithToken = async <T extends TResponse>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  try {
    const result = await fetch(url, options);
    return await checkResult(result);
  } catch (err) {
    if (err instanceof Error && err.message === 'jwt expired') {
      await refetchToken().then((result) => {
        localStorage.setItem('refreshToken', result.refreshToken ?? '');
        localStorage.setItem('accessToken', result.accessToken ?? '');
      });

      const newTry: RequestInit = {
        ...options,
        headers: {
          ...options?.headers,
          Authorization: localStorage.getItem('accessToken') ?? '',
        },
      };

      const result = await fetch(url, newTry);
      return await checkResult(result);
    } else {
      throw err;
    }
  }
};

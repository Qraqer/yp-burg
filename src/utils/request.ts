import type { TResponse } from './types';

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

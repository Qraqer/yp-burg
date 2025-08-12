import type { TResponse } from './types';

const handleResponse = <T>(result: Response): Promise<T> => {
  return result.ok
    ? result.json()
    : Promise.reject(new Error(`Error in response: ${result.status}`));
};

const handleResult = <T extends TResponse>(result: T): Promise<T> => {
  return result.success
    ? Promise.resolve(result)
    : Promise.reject(new Error(`Error in result: ${result || ''}`));
};

export const request = <T extends TResponse>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  return fetch(url, options)
    .then(handleResponse<T>)
    .then(handleResult<T>);
};

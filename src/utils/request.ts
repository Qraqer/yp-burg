import type { IResponse } from './types';

const handleResponse = <T>(result: Response): Promise<T> => {
  return result.ok
    ? result.json()
    : Promise.reject(new Error(`Error in response: ${result.status}`));
};

const handleResult = <T extends IResponse>(result: T): Promise<T> => {
  return result.success
    ? Promise.resolve(result)
    : Promise.reject(new Error(`Error in result: ${result || ''}`));
};

export const request = <T extends IResponse>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  return fetch(url, options)
    .then(handleResponse<T>)
    .then(handleResult<T>);
};

/* import { TIngredient } from "./types";
import { API_POINTS } from "./constants";

const handleResult = async (result: Response) => {
  return result.ok ? result.json() : Promise.reject(`Error in response: ${result.status}`);
}

export const request = async <T>( url: string, options?: RequestInit ): Promise<T> => {
  const result = await fetch(url, options);
  return handleResult(result);
}

export const getIngredients = (): Promise<TIngredient[]> => 
  request<{ data: TIngredient[] }>(API_POINTS.ingredients)
    .then(response => response.data);
 */

/* const handleError = <never>(err: string): PromiseLike<never> => {
  console.log(`Catch error: ${err}`);
  return Promise.reject(new Error(err));
} */
/* */

/* fetch(API)
  .then((result) => {
    return result.ok
      ? Promise.resolve(result.json())
      : Promise.reject(new Error(`Error: ${result.status}`));
  })
  .then((response: IResponseData) => {
    return response.success
      ? Promise.resolve(response.data!)
      : Promise.reject(new Error('Error in response'));
  })
  .then((data: TIngredient[]) => {
    setIngredients(data);
    // TODO: delete after sprint 1 / step 2
    setSelectedIngredients(data);
    setError(false);
  })
  .catch((error) => {
    console.log(`Error fetching data from server: ${error}`);
  })
  .finally(() => {
    setLoading(false);
  }); */

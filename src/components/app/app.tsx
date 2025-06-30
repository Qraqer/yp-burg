import { useState, useEffect } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { API } from '@utils/constants';

import type { TIngredient } from '@utils/types';

import styles from './app.module.css';

type IResponseData = {
  success: boolean;
  data?: string;
};

const getIngredients = (): Promise<T> => {
  return fetch(API)
    .then((result) => {
      return result.ok
        ? Promise.resolve(result.json())
        : Promise.reject(new Error(`Error: ${result.status}`));
    })
    .then((response: IResponseData) => {
      return response.success
        ? Promise.resolve(response)
        : Promise.reject(new Error(response?.data ?? 'Error in response'));
    });
};

export const App = (): React.JSX.Element => {
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [selectedIngredients, setSelectedIngredients] = useState<TIngredient[]>([]);

  useEffect(() => {
    getIngredients()
      .then(({ success, data }) => {
        if (success) {
          setIngredients(data as TIngredient[]);
          // TODO: delete after sprint 1 / step 2
          setSelectedIngredients(data as TIngredient[]);
          setError(false);
        } else {
          setError(true);
        }
      })
      .catch((error) => {
        console.log(`Error fetching data from server: ${error}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      {!loading && !error && (
        <main className={`${styles.main} pl-5 pr-5`}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor ingredients={selectedIngredients} />
        </main>
      )}
    </div>
  );
};

export default App;

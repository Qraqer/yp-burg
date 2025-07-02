import { useState, useEffect } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { API } from '@utils/constants';

import type { TIngredient } from '@utils/types';

import styles from './app.module.css';

type IResponseData = {
  success: boolean;
  data?: TIngredient[];
};

export const App = (): React.JSX.Element => {
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [selectedIngredients, setSelectedIngredients] = useState<TIngredient[]>([]);

  useEffect(() => {
    fetch(API)
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

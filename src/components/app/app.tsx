// import { API } from '@utils/constants';
import { getIngredients } from '@/services/burger-ingredients/actions';
// import { useSelector } from 'react-redux'
// import { useDispatch, useSelector } from 'react-redux'
// import { useDispatch } from '@/services/store';
import { useDispatch } from '@/services/store';
import { useEffect } from 'react';

import { AppHeader } from '@components/app-header/app-header';
// import { BurgerConstructor } from '@components/burger-contructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

// import { getIngredients } from '@/utils/request';
// import type { TIngredient, IResponseData } from '@utils/types';
import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  // const [ingredients, setIngredients] = useState<TIngredient[]>([]);
  /* useEffect(() => {
    const i = getIngredients();
    console.log('getIngredients', i);
  }) */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  /* const store = useSelector(store => store);

  console.log('store', store); */

  /* const [ingredients, setIngredients] = useState<TIngredient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false); */
  // const [selectedIngredients, setSelectedIngredients] = useState<TIngredient[]>([]);
  /* const selectedIngredients: TIngredient[] = []; //useSelector(store => store.ingredients);
  const ingredients = useSelector(store => store.ingredients);
   */

  /* useEffect(() => {
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
  }, []); */

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
      </main>
    </div>
  );
};

/*
      {!loading && !error && (
        <main className={`${styles.main} pl-5 pr-5`}>
          
          <BurgerConstructor ingredients={selectedIngredients} />
        </main>
      )}

*/

export default App;

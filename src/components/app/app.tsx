import { getIngredients } from '@/services/burger-ingredients/actions';
import { useDispatch } from '@/services/store';
import { useEffect } from 'react';

import { BurgerConstructor } from '../burger-contructor/burger-constructor';
import { AppHeader } from '@components/app-header/app-header';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
        <div className="rightContent">
          <BurgerConstructor />
        </div>
      </main>
    </div>
  );
};

export default App;

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BurgerConstructor } from '@components/burger-contructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import type { FC } from 'react';

import styles from './home.module.css';

export const Home: FC = (): React.JSX.Element => {
  return (
    <>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <DndProvider backend={HTML5Backend}>
        <main className={`main pl-5 pr-5`}>
          <BurgerIngredients />
          <div className="rightContent">
            <BurgerConstructor />
          </div>
        </main>
      </DndProvider>
    </>
  );
};

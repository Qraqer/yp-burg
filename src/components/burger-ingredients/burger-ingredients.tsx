import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { Modal } from '../modal/modal';
import { IngredientDetails } from './ingredient-details/ingredient-details';
import { IngredientItem } from './ingredient-item/ingredient-item';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const [currentTab, setCurrentTab] = useState('bun');
  const [currentItem, setCurrentItem] = useState<TIngredient | null>(null);

  const tabsList = [
    {
      id: 'bun',
      name: 'Булки',
    },
    {
      id: 'main',
      name: 'Начинки',
    },
    {
      id: 'sauce',
      name: 'Соусы',
    },
  ];

  function clickItem(item: TIngredient): void {
    setCurrentItem(item);
  }

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          {tabsList.map((tab) => (
            <Tab
              key={tab.id}
              value={tab.id}
              active={tab.id === currentTab}
              onClick={() => {
                setCurrentTab(tab.id);
              }}
            >
              {tab.name}
            </Tab>
          ))}
        </ul>
      </nav>

      <section className={styles.category__list}>
        <div className={styles.view__list}>
          {tabsList.map((tab) => {
            return (
              <div className={styles.category__box} key={tab.id}>
                <h2 className={`text text_type_main-medium ${styles.category__title}`}>
                  {tab.name}
                </h2>
                <div className={styles.item__list}>
                  {ingredients
                    .filter((item) => item.type === tab.id)
                    .map((item) => (
                      <IngredientItem
                        key={item._id}
                        ingredient={item}
                        onClick={() => clickItem(item)}
                        counter={0}
                      />
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {currentItem && (
        <Modal title="Детали ингредиента" onClose={() => setCurrentItem(null)}>
          <IngredientDetails ingredient={currentItem} />
        </Modal>
      )}
    </section>
  );
};

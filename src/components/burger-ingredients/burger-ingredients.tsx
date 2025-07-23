import { useSelector } from '@/services/store';
import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState, useRef, useEffect /* , RefObject */ } from 'react';
import { useInView } from 'react-intersection-observer';

import { Modal } from '../modal/modal';
import { IngredientDetails } from './ingredient-details/ingredient-details';
import { IngredientItem } from './ingredient-item/ingredient-item';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

// type TBurgerIngredientsProps = {
//   ingredients: TIngredient[];
// };

export const BurgerIngredients = (): React.JSX.Element => {
  const [currentTab, setCurrentTab] = useState('bun');
  const [currentItem, setCurrentItem] = useState<TIngredient | null>(null);

  const refBox = useRef<HTMLDivElement | null>(null);

  const { ingredients } = useSelector((store) => store.ingredients);

  const { ref: refBun, inView: inViewBun } = useInView({
    threshold: 0.35,
  });
  const { ref: refMain, inView: inViewMain } = useInView({
    threshold: 0.35,
  });
  const { ref: refSauce, inView: inViewSauce } = useInView({
    threshold: 0.35,
  });

  const tabsList = [
    {
      id: 'bun',
      name: 'Булки',
      thisRef: refBun,
    },
    {
      id: 'main',
      name: 'Начинки',
      thisRef: refMain,
    },
    {
      id: 'sauce',
      name: 'Соусы',
      thisRef: refSauce,
    },
  ];

  const clickItem = (item: TIngredient): void => {
    setCurrentItem(item);
  };

  useEffect(() => {
    if (inViewBun) {
      setCurrentTab('bun');
    } else if (inViewMain) {
      setCurrentTab('main');
    } else if (inViewSauce) {
      setCurrentTab('sauce');
    }
  }, [inViewBun, inViewMain, inViewSauce]);

  /* const scrollToCategory = (ref: RefObject<HTMLDivElement | null>): void => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  const scrollBox = () => {
    const cats = tabsList.filter((tab) => tab.thisRef && tab.thisRef.current).length === tabsList.length;
    if (cats && refBox.current) {
      const box = refBox.current.getBoundingClientRect();
      const tabs
    }
  } */

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
                /* scrollToCategory(tab.thisRef) */
              }}
            >
              {tab.name}
            </Tab>
          ))}
        </ul>
      </nav>

      <section className={styles.category__list}>
        <div className={styles.view__list} ref={refBox}>
          {tabsList.map((tab) => {
            return (
              <div className={styles.category__box} key={tab.id} ref={tab.thisRef}>
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

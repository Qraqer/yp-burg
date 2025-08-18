import { setShowModal } from '@/services/burger-ingredients/reducer';
// import { clearIngregient, showIngredient } from '@/services/burger-ingredients/reducer';
import { useDispatch, useSelector } from '@/services/store';
import { ROUTES } from '@/utils/constants';
import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLocation, useNavigate } from 'react-router-dom';

import { IngredientItem } from './ingredient-item/ingredient-item';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = (): React.JSX.Element => {
  const [currentTab, setCurrentTab] = useState('bun');
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const refBox = useRef<HTMLDivElement | null>(null);

  const { ingredients } = useSelector((state) => state.ingredients);

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

  useEffect(() => {
    if (inViewBun) {
      setCurrentTab('bun');
    } else if (inViewMain) {
      setCurrentTab('main');
    } else if (inViewSauce) {
      setCurrentTab('sauce');
    }
  }, [inViewBun, inViewMain, inViewSauce]);

  const showCurrentIngredient = (item: TIngredient): void => {
    dispatch(setShowModal(true));
    navigate(`${ROUTES.ingredientsBase}${item._id}`, {
      state: { background: location },
    });
  };

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          {tabsList.map((tab) => (
            <Tab
              key={tab.id}
              value={tab.id}
              active={tab.id === currentTab}
              onClick={() => setCurrentTab(tab.id)}
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
                        onClick={() => showCurrentIngredient(item)}
                      />
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
};

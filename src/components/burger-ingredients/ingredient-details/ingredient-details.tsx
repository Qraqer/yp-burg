import { Error404 } from '@/pages/error404/error404';
import { getIngredients } from '@/services/burger-ingredients/actions';
import { useDispatch, useSelector } from '@/services/store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './ingredient-details.module.css';

export const IngredientDetails = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { ingredients } = useSelector((state) => state.ingredients);
  const ingredient = ingredients.find((item) => item._id === id);

  useEffect(() => {
    if (!ingredients) {
      dispatch(getIngredients());
    }
  }, [ingredients, dispatch]);

  if (!ingredient) {
    return <Error404 />;
  }

  const nutrition = [
    {
      value: ingredient.calories,
      name: 'Калории, ккал',
    },
    {
      value: ingredient.proteins,
      name: 'Белки, г',
    },
    {
      value: ingredient.fat,
      name: 'Жиры, г',
    },
    {
      value: ingredient.carbohydrates,
      name: 'Углеводы, г',
    },
  ];

  return (
    <div className={styles.details}>
      <div className={styles.details__img}>
        <img src={ingredient.image_large} alt={ingredient.name} />
      </div>
      <div className={`text text_type_main-medium mb-8 ${styles.details__name}`}>
        {ingredient.name}
      </div>
      <ul className={styles.details__nutrition}>
        {nutrition.map((item) => (
          <li
            className={`text text_type_main-default text_color_inactive ${styles.details__prop}`}
            key={item.name}
          >
            <div className={styles.details__label}>{item.name}</div>
            <div
              className={`text text_type_main-default text_color_inactive ${styles.details__value}`}
            >
              {item.value}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

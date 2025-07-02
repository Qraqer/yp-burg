import type { TIngredient } from '@utils/types';

import styles from './ingredient-details.module.css';

type TIngredientDetailProps = {
  ingredient: TIngredient;
};

export const IngredientDetails = ({
  ingredient,
}: TIngredientDetailProps): React.JSX.Element => {
  const { image_large, name } = ingredient;
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
        <img src={image_large} alt={name} />
      </div>
      <div className={`text text_type_main-medium mb-8 ${styles.details__name}`}>
        {name}
      </div>
      <ul className={styles.details__nutrition}>
        {nutrition.map((item) => (
          <li
            className={`text text_type_main-default text_color_inactive ${styles.details__prop}`}
            key={item.value}
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

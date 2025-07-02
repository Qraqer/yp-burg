import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@utils/types';

import styles from './ingredient-item.module.css';

type IIngredientItemProps = {
  ingredient: TIngredient;
  counter: number;
  onClick: () => void;
};

export const IngredientItem = ({
  ingredient,
  counter = 0,
  onClick,
}: IIngredientItemProps): React.JSX.Element => {
  const { image, name, price } = ingredient;

  return (
    <div className={styles.item} onClick={onClick}>
      {counter > 0 && false}
      <Counter count={counter} size="default" extraClass="m-1" />
      <div className={styles.item__img}>
        <img src={image} alt={name} width="240" height="120"></img>
      </div>
      <div className={styles.item__price}>
        <span className="text text_type_digits-small mr-2">{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <div className={`text text_type_main-default ${styles.item__name}`}>{name}</div>
    </div>
  );
};

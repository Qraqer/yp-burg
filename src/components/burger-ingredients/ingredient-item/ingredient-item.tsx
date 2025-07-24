import { useSelector } from '@/services/store';
import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';

import type { TIngredient } from '@utils/types';

import styles from './ingredient-item.module.css';

type IIngredientItemProps = {
  ingredient: TIngredient;
  onClick: () => void;
};

export const IngredientItem = ({
  ingredient,
  onClick,
}: IIngredientItemProps): React.JSX.Element => {
  const { image, name, price } = ingredient;
  const dragRef = useRef(null);
  const [counter, setCount] = useState(0);
  const { orderBun, orderItems } = useSelector((state) => state.order);

  useEffect(() => {
    const count = [orderBun, orderBun, ...orderItems].filter(
      (i) => i?._id === ingredient._id
    ).length;
    setCount(count);
  }, [orderBun, orderItems, ingredient]);

  const [, drag] = useDrag({
    type: 'ingredient',
    item: ingredient,
  });

  drag(dragRef);

  return (
    <div className={styles.item} onClick={onClick} ref={dragRef}>
      {counter > 0 && <Counter count={counter} size="default" extraClass="m-1" />}
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

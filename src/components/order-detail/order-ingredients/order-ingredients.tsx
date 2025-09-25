import { IngredientImg } from '@/components/ingredient-img/ingredient-img';
import { useSelector } from '@/services/store';
import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useMemo, type FC } from 'react';

import type { TIngredient, TOrder } from '@/utils/types';

import styles from './order-ingredients.module.scss';

type TOrderIngredientsProps = {
  order: TOrder;
};

type TOrderIngredientsList = TIngredient & {
  count: number;
};

export const OrderIngredients: FC<TOrderIngredientsProps> = ({
  order,
}): React.JSX.Element => {
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  const orderIngredients = useMemo(() => {
    if (!order) return null;

    const ingredientsIds = Array.from(new Set(order?.ingredients));
    return ingredientsIds.map((id) => {
      const item = ingredients.find((item) => item._id === id);
      const count = order.ingredients.filter((i) => i === id).length;
      return { ...item, count } as TOrderIngredientsList;
    });
  }, [order, ingredients]);

  return (
    <div className={`${styles.ingredients} mt-6`}>
      {orderIngredients?.map((item, index) => (
        <div key={index} className={styles.box}>
          <div className={[styles.box, styles.imgbox].join(' ')}>
            <IngredientImg src={item?.image_mobile} />
            <p className="text text_type_main-default ml-4">{item?.name}</p>
          </div>
          <div className={styles.box}>
            <p className="text text_type_digits-default mr-2">
              {item.count} x {item.price}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      ))}
    </div>
  );
};

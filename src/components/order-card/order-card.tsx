import { useSelector } from '@/services/store';
import {
  CurrencyIcon,
  FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';

import { IngredientImg } from '../ingredient-img/ingredient-img';

import type { TOrder } from '@/utils/types';
import type { FC } from 'react';

import styles from './order-card.module.scss';

type TOrderCardProps = {
  order: TOrder;
  showStatus?: boolean;
  onClick?: () => void;
};

const orderStatus = {
  done: 'Выполнен',
  pending: 'Готовится',
  created: 'Создан',
};

export const OrderCard: FC<TOrderCardProps> = ({
  order,
  showStatus = false,
  onClick,
}): React.JSX.Element => {
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  const ingredientsList =
    order?.ingredients?.map((id) => ingredients.find((item) => item._id === id)) ?? [];

  const price = ingredientsList.reduce((acc, item) => acc + (item?.price ?? 0), 0);

  return (
    <>
      <div className={styles.card} onClick={onClick}>
        <div className={styles.title}>
          <div className="text text_type_digits-default">#{order.number}</div>
          <FormattedDate
            className="text text_type_main-default text_color_inactive"
            date={new Date(order.createdAt)}
          />
        </div>
        <div className={styles.body}>
          <div className="text text_type_main-medium">{order.name}</div>
          {showStatus && (
            <div className="text text_type_main-default">
              {orderStatus[order.status]}
            </div>
          )}
        </div>
        <div className={styles.footer}>
          <div className={styles.list}>
            {ingredientsList.slice(0, 6).map((item, index) => {
              const child =
                ingredientsList.length > 6 && index === 5 ? (
                  <div className={styles.more}>
                    <span className="text text_type_main-default">
                      +{ingredientsList.length - 6}
                    </span>
                  </div>
                ) : (
                  <></>
                );
              return (
                <IngredientImg
                  key={index}
                  src={item?.image_mobile ?? ''}
                  style={{ zIndex: 6 - index }}
                  alt={item?.name}
                >
                  {child}
                </IngredientImg>
              );
            })}
          </div>
          <div className={styles.price}>
            <p className="text text_type_digits-default">{price}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </>
  );
};

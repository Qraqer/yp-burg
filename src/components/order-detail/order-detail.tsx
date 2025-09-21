import { getOrder } from '@/services/burger-contructor/actions';
import { useDispatch, useSelector } from '@/services/store';
import {
  CurrencyIcon,
  FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { IngredientImg } from '../ingredient-img/ingredient-img';
import { Loader } from '../loader/loader';

import type { TIngredient } from '@/utils/types';
import type { FC } from 'react';

import styles from './order-detail.module.scss';

type TOrderIngredient = TIngredient & {
  count: number;
};

export const OrderDetail: FC = (): React.JSX.Element => {
  const { id } = useParams();
  const order = useSelector((state) => {
    return id
      ? (state.ordersUser.orders.find((order) => String(order.number) === id) ??
          state.ordersFeed.orders.find((order) => String(order.number) === id))
      : null;
  });
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id && !order) {
      dispatch(getOrder(id));
    }
  });

  const orderIngredients = useMemo(() => {
    if (!order) return null;

    const ingredientsIds = Array.from(new Set(order?.ingredients));
    return ingredientsIds.map((id) => {
      const item = ingredients.find((item) => item._id === id);
      const count = order.ingredients.filter((i) => i === id).length;
      return { ...item, count } as TOrderIngredient;
    });
  }, [order]);

  const price = order?.ingredients.reduce(
    (acc, id) => acc + (ingredients.find((item) => item._id === id)?.price ?? 0),
    0
  );

  return (
    <>
      {!order && <Loader text="Ищем заказ..." />}
      {order && (
        <div className={styles.container}>
          <h1 className={`${styles.h1} text text_type_digits-default`}>
            #{order.number}
          </h1>
          <div className="text text_type_main-medium mt-10">{order.name}</div>
          <div className="text text_type_main-default text-blue mt-3">
            {order.status === 'done' ? 'Выполнен' : 'Готовится'}
          </div>
          <div className="text text_type_main-medium mt-15">Состав:</div>
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
          <div className={`${styles.box} mt-10`}>
            <FormattedDate
              className="text text_type_main-default text_color_inactive"
              date={new Date(order.updatedAt)}
            />
            <div className={styles.box}>
              <p className="text text_type_digits-default mr-2">{price}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

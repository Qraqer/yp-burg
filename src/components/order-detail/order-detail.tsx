import { getOrder } from '@/services/burger-contructor/actions';
import { useDispatch, useSelector } from '@/services/store';
import {
  CurrencyIcon,
  FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from '../loader/loader';
import { OrderIngredients } from './order-ingredients/order-ingredients';
import { OrderPrice } from './order-price/order-price';

import type { FC } from 'react';

import styles from './order-detail.module.scss';

export const OrderDetail: FC = (): React.JSX.Element => {
  const { id } = useParams();
  const ordersFeed = useSelector((state) => state.ordersFeed.orders);
  const ordersUser = useSelector((state) => state.ordersUser.orders);
  const dispatch = useDispatch();

  const order = useMemo(() => {
    return id
      ? (ordersUser.find((order) => String(order.number) === id) ??
          ordersFeed.find((order) => String(order.number) === id))
      : null;
  }, [ordersFeed, ordersUser, id]);

  useEffect(() => {
    if (id && !order) {
      dispatch(getOrder(id));
    }
  });

  return (
    <>
      {order ? (
        <div className={styles.container}>
          <h1 className={`${styles.h1} text text_type_digits-default`}>
            #{order.number}
          </h1>
          <div className="text text_type_main-medium mt-10">{order.name}</div>
          <div className="text text_type_main-default text-blue mt-3">
            {order.status === 'done' ? 'Выполнен' : 'Готовится'}
          </div>
          <div className="text text_type_main-medium mt-15">Состав:</div>
          <OrderIngredients order={order} />
          <div className={`${styles.box} mt-10`}>
            <FormattedDate
              className="text text_type_main-default text_color_inactive"
              date={new Date(order.updatedAt)}
            />
            <div className={styles.box}>
              <OrderPrice order={order} />
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      ) : (
        <Loader text="Ищем заказ..." />
      )}
    </>
  );
};

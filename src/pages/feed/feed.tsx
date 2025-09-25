import { Loader } from '@/components/loader/loader';
import { OrderCard } from '@/components/order-card/order-card';
import { OrdersFeedActions } from '@/services/orders-feed/actions';
import { useDispatch, useSelector } from '@/services/store';
import { API_POINTS, ROUTES } from '@/utils/constants';
import { useEffect, type FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import type { TFuncVoid } from '@/utils/types';

import styles from './feed.module.scss';

export const Feed: FC = (): React.JSX.Element => {
  const { orders, total, totalToday } = useSelector((state) => state.ordersFeed);
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const ordersDone = orders.filter((order) => order.status === 'done');
  const ordersPending = orders.filter((order) => order.status === 'pending');

  useEffect((): TFuncVoid => {
    dispatch(OrdersFeedActions.connect(API_POINTS.ordersAll));

    return (): void => {
      dispatch(OrdersFeedActions.disconnect());
    };
  }, [dispatch]);

  const openOrderDetails = (id: number): void => {
    navigate(ROUTES.feedOrder.replace(':id', String(id)), {
      state: {
        background: location,
      },
    });
  };

  return (
    <>
      <h1 className="text text_type_main-large mt-10 mb-5 pl-5">Лента заказов</h1>
      <div className={styles.feed}>
        <div className={styles.left}>
          {orders?.length > 0 ? (
            <div className={styles.list}>
              {orders.map((order, index) => (
                <OrderCard
                  order={order}
                  key={index}
                  onClick={() => openOrderDetails(order.number)}
                />
              ))}
            </div>
          ) : (
            <Loader text="Проверем заказы..." />
          )}
        </div>
        <div className={styles.right}>
          <div className={styles.processing}>
            <div className={styles.orders}>
              <div className="text text_type_main-medium mb-6">Готовы:</div>
              <div className={styles.columns}>
                {ordersDone.map((order, index) => (
                  <span
                    key={index}
                    className="mb-1 text text_type_digits-default text-blue"
                  >
                    {order.number}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.orders}>
              <div className="text text_type_main-medium mb-6">В работе:</div>
              <div className={styles.columns}>
                {ordersPending.map((order, index) => (
                  <span key={index} className="mb-1 text text_type_digits-default">
                    {order.number}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.value}>
            <div className="text text_type_main-medium mb-6">
              Выполнено за все время:
            </div>
            <div className="text">
              {total ? (
                <div className="text text_type_digits-large backlighted">{total}</div>
              ) : (
                <Loader text="..." />
              )}
            </div>
          </div>
          <div className={styles.value}>
            <div className="text text_type_main-medium mb-6">Выполнено за сегодня:</div>
            <div className="text">
              {totalToday ? (
                <div className="text text_type_digits-large backlighted">
                  {totalToday}
                </div>
              ) : (
                <Loader text="..." />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

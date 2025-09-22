import { Loader } from '@/components/loader/loader';
import { OrderCard } from '@/components/order-card/order-card';
import { OrdersUserActions } from '@/services/orders-history/actions';
import { useDispatch, useSelector } from '@/services/store';
import { API_POINTS, ROUTES } from '@/utils/constants';
import { useEffect, type FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import type { TFuncVoid } from '@/utils/types';

import styles from './orders-list.module.scss';

export const OrdersList: FC = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.ordersUser.orders);
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');

  useEffect((): TFuncVoid => {
    dispatch(
      OrdersUserActions.connect(
        `${API_POINTS.ordersUser}?token=${token?.replace('Bearer ', '')}`
      )
    );

    return (): void => {
      dispatch(OrdersUserActions.disconnect());
    };
  }, [dispatch, token]);

  const openOrderDetails = (id: number): void => {
    navigate(ROUTES.profileOrder.replace(':id', String(id)), {
      state: {
        background: location,
      },
    });
  };

  return (
    <div className={styles.list}>
      {!orders.length && <Loader text="Ждём историю заказов..." />}
      {orders.map((order) => (
        <OrderCard
          order={order}
          showStatus={true}
          key={order._id}
          onClick={() => openOrderDetails(order.number)}
        />
      ))}
    </div>
  );
};

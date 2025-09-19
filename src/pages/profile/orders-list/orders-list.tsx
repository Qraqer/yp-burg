import { Loader } from '@/components/loader/loader';
import { OrderCard } from '@/components/order-card/order-card';
import { OrdersUserActions } from '@/services/orders-history/actions';
import { useDispatch, useSelector } from '@/services/store';
import { API_POINTS, ROUTES } from '@/utils/constants';
import { useEffect, type FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ProfileMenu } from '../profile-menu/profile-menu';

import type { TFuncVoid } from '@/utils/types';

import styles from './orders-list.module.scss';

export const OrdersList: FC = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.ordersUser.userOrders);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect((): TFuncVoid => {
    dispatch(OrdersUserActions.connect(API_POINTS.ordersUser));

    return (): void => {
      dispatch(OrdersUserActions.disconnect());
    };
  }, [dispatch]);

  const openOrderDetails = (id: number): void => {
    navigate(ROUTES.profileOrder.replace(':id', String(id)), {
      state: {
        background: location,
      },
    });
  };

  console.log('orders', orders);

  return (
    <main className="main pl-5 pr-5">
      <div className={styles.profile}>
        <ProfileMenu />
        <div className={styles.list}>
          {!orders.length && <Loader text="Ждём историю заказов..." />}
          {orders.map((order) => (
            <OrderCard
              order={order}
              key={order._id}
              onClick={() => openOrderDetails(order.number)}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

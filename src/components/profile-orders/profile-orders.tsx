import { Loader } from '@/components/loader/loader';
import { OrderCard } from '@/components/order-card/order-card';
import { useSelector } from '@/services/store';
import { ROUTES } from '@/utils/constants';
import { useLocation, useNavigate } from 'react-router-dom';

import { ProfileMenu } from '../profile-menu/profile-menu';

import type { FC } from 'react';

import styles from './profile-orders.module.scss';

export const ProfileOrders: FC = (): React.JSX.Element => {
  const orders = useSelector((state) => state.ordersUser.orders);
  const location = useLocation();
  const navigate = useNavigate();

  const openOrderDetails = (id: number): void => {
    navigate(ROUTES.profileOrder.replace(':id', String(id)), {
      state: {
        background: location,
      },
    });
  };

  return (
    <div className={styles.profile}>
      <ProfileMenu />
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
    </div>
  );
};

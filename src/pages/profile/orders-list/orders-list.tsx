import { ProfileOrders } from '@/components/profile-orders/profile-orders';
import { OrdersUserActions } from '@/services/orders-history/actions';
import { useDispatch } from '@/services/store';
import { API_POINTS } from '@/utils/constants';
import { useEffect, type FC } from 'react';

import type { TFuncVoid } from '@/utils/types';

// import styles from './orders-list.module.scss';

export const OrdersList: FC = (): React.JSX.Element => {
  const dispatch = useDispatch();
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

  return <ProfileOrders />;
};

import { createAction } from '@reduxjs/toolkit';

import type { TOrderRequest } from '@/utils/types';

export const OrdersUserActions = {
  connect: createAction<string, 'ordersUser/Connect'>('ordersUser/Connect'),
  disconnect: createAction('ordersUser/Disconnect'),
  onMessage: createAction<TOrderRequest, 'ordersUser/Message'>('ordersUser/Message'),
  onError: createAction<string, 'ordersUser/Error'>('ordersUser/Error'),
};

import { createAction } from '@reduxjs/toolkit';

import type { TOrderRequest } from '@/utils/types';

export const OrdersUserActions = {
  connect: createAction<string, 'ordersUser/Connect'>('ordersUser/Connect'),
  disconnect: createAction('ordersUser/Disconnect'),
  onConnecting: createAction('ordersUser/Connecting'),
  onError: createAction<string, 'ordersUser/Error'>('ordersUser/Error'),
  onMessage: createAction<TOrderRequest, 'ordersUser/Message'>('ordersUser/Message'),
  onOpen: createAction('ordersUser/Open'),
  onClose: createAction('ordersUser/Close'),
};

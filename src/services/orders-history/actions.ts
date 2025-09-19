import { createAction } from '@reduxjs/toolkit';

import type { TOrderRequest } from '@/utils/types';

export const OrdersUserActions = {
  connect: createAction<string, 'ORDERS_USER_CONNECT'>('ORDERS_USER_CONNECT'),
  disconnect: createAction('ORDERS_USER_DISCONNECT'),
  onConnecting: createAction('ORDERS_USER_CONNECTING'),
  onError: createAction<string, 'ORDERS_USER_ERROR'>('ORDERS_USER_ERROR'),
  onMessage: createAction<TOrderRequest, 'ORDERS_USER_MESSAGE'>('ORDERS_USER_MESSAGE'),
  onOpen: createAction('ORDERS_USER_OPEN'),
  onClose: createAction('ORDERS_USER_CLOSE'),
};

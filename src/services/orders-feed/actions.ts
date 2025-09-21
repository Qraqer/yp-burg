import { createAction } from '@reduxjs/toolkit';

import type { TOrderRequest } from '@/utils/types';

export const OrdersFeedActions = {
  connect: createAction<string, 'ordersFeed/Connect'>('ordersFeed/Connect'),
  disconnect: createAction('ordersFeed/Disconnect'),
  onMessage: createAction<TOrderRequest, 'ordersFeed/Message'>('ordersFeed/Message'),
  onError: createAction<string, 'ordersFeed/Error'>('ordersFeed/Error'),
};

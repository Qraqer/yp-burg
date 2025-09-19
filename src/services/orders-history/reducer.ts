import { EWebSocketStatus } from '@/utils/types';
import { createSlice } from '@reduxjs/toolkit';

import { wsMiddleware } from '../ws';
import { OrdersUserActions } from './actions';

import type { TOrder, TOrderRequest } from '@/utils/types';
import type { PayloadAction } from '@reduxjs/toolkit';

type TOrdersUserState = {
  status: EWebSocketStatus;
  userOrders: TOrder[];
};

const initialState: TOrdersUserState = {
  status: EWebSocketStatus.OFFLINE,
  userOrders: [],
};

export const ordersUserSlice = createSlice({
  name: 'ordersUser',
  initialState,
  reducers: {
    setOrdersUser: (state, action: PayloadAction<TOrder[]>) => {
      state.userOrders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(OrdersUserActions.onConnecting, (state) => {
        state.status = EWebSocketStatus.CONNECTING;
      })
      .addCase(OrdersUserActions.onOpen, (state) => {
        state.status = EWebSocketStatus.ONLINE;
      })
      .addCase(OrdersUserActions.onClose, (state) => {
        state.status = EWebSocketStatus.OFFLINE;
      })
      .addCase(
        OrdersUserActions.onMessage,
        (state, action: PayloadAction<TOrderRequest>) => {
          if (action.payload.success && action.payload.orders) {
            state.userOrders = action.payload.orders.filter(
              (order) =>
                Array.isArray(order.ingredients) &&
                order.ingredients.every((item) => typeof item === 'string')
            );
          }
        }
      );
  },
});

export const ordersUserMiddleware = wsMiddleware(OrdersUserActions, true);
export const { setOrdersUser } = ordersUserSlice.actions;

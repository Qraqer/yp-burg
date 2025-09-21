// import { EWebSocketStatus } from '@/utils/types';
import { createSlice } from '@reduxjs/toolkit';

import { wsMiddleware } from '../ws';
import { OrdersUserActions } from './actions';

import type { TOrder, TOrderRequest, TOrderResponse } from '@/utils/types';
import type { PayloadAction } from '@reduxjs/toolkit';

// type TOrdersUserState = {
//   status: EWebSocketStatus;
//   userOrders: TOrder[];
// };

const initialState: TOrderResponse = {
  // status: EWebSocketStatus.OFFLINE,
  // userOrders: [],
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
};

export const ordersUserSlice = createSlice({
  name: 'ordersUser',
  initialState,
  reducers: {
    setOrdersUser: (state, action: PayloadAction<TOrder[]>) => {
      state.orders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(OrdersUserActions.onConnecting, (state) => {
      //   state.status = EWebSocketStatus.CONNECTING;
      // })
      // .addCase(OrdersUserActions.onOpen, (state) => {
      //   state.status = EWebSocketStatus.ONLINE;
      // })
      // .addCase(OrdersUserActions.onClose, (state) => {
      //   state.status = EWebSocketStatus.OFFLINE;
      // })
      .addCase(
        OrdersUserActions.onError,
        (state, action: PayloadAction<string | null>) => {
          state.error = action.payload;
        }
      )
      .addCase(
        OrdersUserActions.onMessage,
        (state, action: PayloadAction<TOrderRequest>) => {
          console.log('action.payload', action.payload);
          if (action.payload.success && action.payload.orders) {
            state.orders = action.payload.orders.filter(
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

import { createSlice } from '@reduxjs/toolkit';

import { OrdersUserActions } from './actions';

import type { TOrderRequest, TOrderResponse } from '@/utils/types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: TOrderResponse = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
};

export const ordersUserSlice = createSlice({
  name: 'ordersUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        OrdersUserActions.onError,
        (state, action: PayloadAction<string | null>) => {
          state.error = action.payload;
        }
      )
      .addCase(
        OrdersUserActions.onMessage,
        (state, action: PayloadAction<TOrderRequest>) => {
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

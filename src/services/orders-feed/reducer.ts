import { createSlice } from '@reduxjs/toolkit';

import { OrdersFeedActions } from './actions';

import type { TOrder, TOrderRequest, TOrderResponse } from '@/utils/types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: TOrderResponse = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
};

export const ordersFeedSlice = createSlice({
  name: 'ordersFeed',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<TOrder[]>) => {
      if (action.payload?.length > 0) {
        const payloadOrder = action.payload.shift()!;
        if (state.orders.find((order) => order.number === payloadOrder.number)) {
          state.orders = state.orders.map((order) =>
            order.number === payloadOrder.number ? action.payload : order
          ) as TOrder[];
        } else {
          state.orders.push(payloadOrder);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        OrdersFeedActions.onError,
        (state, action: PayloadAction<string | null>) => {
          state.error = action.payload;
        }
      )
      .addCase(
        OrdersFeedActions.onMessage,
        (state, action: PayloadAction<TOrderRequest>) => {
          state.orders =
            action.payload.success && action.payload.orders ? action.payload.orders : [];
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
        }
      );
  },
});

export const { addOrder } = ordersFeedSlice.actions;

import { API_POINTS } from '@/utils/constants';
import { request } from '@/utils/request';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { TOrderIdResponse, TOrderState } from '@/utils/types';

export const createOrder = createAsyncThunk(
  'burgerConstructor/createOrder',
  async (_, { getState }) => {
    const {
      order: { orderBun, orderItems },
    } = getState() as { order: TOrderState };

    let arId = [...orderItems.map((i) => i._id)];
    if (orderBun) {
      arId = [orderBun._id, ...arId, orderBun._id];
    }

    const header = new Headers();
    header.append('Content-Type', 'application/json; charset=utf-8');

    const result = await request<TOrderIdResponse>(API_POINTS.orders, {
      method: 'POST',
      headers: header,
      body: JSON.stringify({
        ingredients: arId,
      }),
    });

    return result.order.number;
  }
);

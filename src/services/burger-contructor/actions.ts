import { API_POINTS } from '@/utils/constants';
import { request } from '@/utils/request';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { IOrderIdResponse, IOrderState } from '@/utils/types';

export const requestOrderId = createAsyncThunk(
  'burgerConstructor/requestOrderId',
  async (_, { getState }) => {
    const {
      order: { orderBun, orderItems },
    } = getState() as { order: IOrderState };

    let arId = [...orderItems.map((i) => i._id)];
    if (orderBun) {
      arId = [orderBun._id, ...arId, orderBun._id];
    }

    const header = new Headers();
    header.append('Content-Type', 'application/json; charset=utf-8');

    const result = await request<IOrderIdResponse>(API_POINTS.orders, {
      method: 'POST',
      headers: header,
      body: JSON.stringify({
        ingredients: arId,
      }),
    });

    return result.order.number;
  }
);

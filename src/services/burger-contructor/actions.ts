import { API_POINTS } from '@/utils/constants';
import { request } from '@/utils/request';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { IOrderNumberResponse, IStateOrder } from '@/utils/types';

export const requestOrderNumber = createAsyncThunk(
  'burgerConstructor/requestOrderNumber',
  async (_, { getState }) => {
    const {
      order: { bun, ingredients },
    } = getState() as { order: IStateOrder };

    let arId = [...ingredients.map((i) => i._id)];
    if (bun) {
      arId = [bun._id, ...arId, bun._id];
    }

    const header = new Headers();
    header.append('Content-Type', 'application/json; charset=utf-8');

    const result = await request<IOrderNumberResponse>(API_POINTS.orders, {
      method: 'POST',
      headers: header,
      body: JSON.stringify({
        ingredients: arId,
      }),
    });

    return result.order.number;
  }
);

import { API_POINTS } from '@/utils/constants';
import { request } from '@/utils/request';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { addOrder } from '../orders-feed/reducer';

import type {
  TOrderIdResponse,
  TOrderState,
  TOrder,
  TOrderByIdResponse,
} from '@/utils/types';

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

    const result = await request<TOrderIdResponse>(API_POINTS.orders, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: localStorage.getItem('accessToken') ?? '',
      },
      body: JSON.stringify({
        ingredients: arId,
      }),
    });

    return result.order.number;
  }
);

export const getOrder = createAsyncThunk(
  'order/getOrder',
  async (id: string, { dispatch }): Promise<TOrder[]> => {
    const url = API_POINTS.order.replace(':id', id);
    const result = await request<TOrderByIdResponse>(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

    if (result.success) {
      const orders = (result?.orders as TOrder[] | undefined) ?? [];
      dispatch(addOrder(orders));
      return Promise.resolve(orders);
    }

    return Promise.reject(`Error requesting order with id ${id}`);
  }
);

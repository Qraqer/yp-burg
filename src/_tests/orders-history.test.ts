import { initialState, ordersUserSlice } from '@/services/orders-history/reducer';
import { ingredients } from '@/utils/ingredients';
import { /* afterEach, beforeEach, vi, */ describe, expect, it } from 'vitest';

import type { TOrder } from '@/utils/types';

const ingredient = ingredients.find((item) => item._id === '60666c42cc7b410027a1a9b5')!;

describe('Тестирование слайса в ordersUserSlice', () => {
  it('Неизвестный action: возвращает начальное значение для ordersUserSlice', () => {
    expect(
      ordersUserSlice.reducer(undefined, {
        type: 'unknown',
      })
    ).toEqual(initialState);
  });

  it('Загружаем список заказов', () => {
    const orders: TOrder[] = [
      {
        _id: 'string',
        ingredients: [ingredient._id],
        name: 'string',
        number: 1,
        status: 'done',
        createdAt: 'string',
        updatedAt: 'string',
        owner: 'string',
        __v: 1,
      },
    ];

    const action = {
      type: 'ordersUser/Message',
      payload: {
        success: true,
        orders: orders,
      },
    };
    const state = ordersUserSlice.reducer(undefined, action);

    expect(state.orders).toEqual(orders);
  });
});

import { addOrder, initialState, ordersFeedSlice } from '@/services/orders-feed/reducer';
import { ingredients } from '@/utils/ingredients';
import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it } from 'vitest';

import type { TOrder, TOrderResponse } from '@/utils/types';
import type {
  EnhancedStore,
  StoreEnhancer,
  ThunkDispatch,
  Tuple,
  UnknownAction,
} from '@reduxjs/toolkit';

const ingredient = ingredients.find((item) => item._id === '60666c42cc7b410027a1a9b5')!;

describe('Тестирование слайса OrdersFeed', () => {
  let state: EnhancedStore<
    { ordersFeed: TOrderResponse },
    UnknownAction,
    Tuple<
      [
        StoreEnhancer<{
          dispatch: ThunkDispatch<
            { ordersFeed: TOrderResponse },
            undefined,
            UnknownAction
          >;
        }>,
        StoreEnhancer,
      ]
    >
  >;

  beforeEach(() => {
    state = configureStore({
      reducer: {
        ordersFeed: ordersFeedSlice.reducer,
      },
    });
  });

  it('Неизвестный action: возвращает начальное значение для OrdersFeed', () => {
    expect(
      ordersFeedSlice.reducer(undefined, {
        type: 'unknown',
      })
    ).toEqual(initialState);
  });

  it('Добавить заказ', () => {
    const order: TOrder = {
      _id: 'string',
      ingredients: [ingredient._id],
      name: 'string',
      number: 1,
      status: 'done',
      createdAt: 'string',
      updatedAt: 'string',
      owner: 'string',
      __v: 1,
    };
    state.dispatch(addOrder([order]));

    const { orders } = state.getState().ordersFeed;

    expect(orders).toEqual([order]);
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
      type: 'ordersFeed/Message',
      payload: {
        success: true,
        orders: orders,
        total: 11,
        totalToday: 5,
      },
    };
    const state = ordersFeedSlice.reducer(undefined, action);

    expect(state.total).toBe(11);
    expect(state.totalToday).toBe(5);
    expect(state.orders).toBe(orders);
  });
});

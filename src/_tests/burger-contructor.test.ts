import { createOrder } from '@/services/burger-contructor/actions';
import { ingredients } from '@/utils/ingredients';
import { configureStore } from '@reduxjs/toolkit';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  addBun,
  addIngredient,
  burgerConstructorSlice,
  initialState,
} from '../services/burger-contructor/reducer';

import type { TOrderIngredient, TOrderState } from '@/utils/types';
import type {
  EnhancedStore,
  StoreEnhancer,
  ThunkDispatch,
  Tuple,
  UnknownAction,
} from '@reduxjs/toolkit';

// import * as api from '@/utils/request';

const bun: TOrderIngredient = {
  ...ingredients.find(
    (item) => item.type === 'bun' && item._id === '643d69a5c3f7b9001cfa093c'
  )!,
  uuid: 'xxxBun',
};
const ingredient: TOrderIngredient = {
  ...ingredients.find((item) => item._id === '60666c42cc7b410027a1a9b5')!,
  uuid: 'xxxIngredient',
};
const ingredient2: TOrderIngredient = {
  ...ingredients.find((item) => item._id === '60666c42cc7b410027a1a9b4')!,
  uuid: 'xxxIngredient2',
};

describe('Тестирование слайса BurgerConstructor', () => {
  let state: EnhancedStore<
    { order: TOrderState },
    UnknownAction,
    Tuple<
      [
        StoreEnhancer<{
          dispatch: ThunkDispatch<{ order: TOrderState }, undefined, UnknownAction>;
        }>,
        StoreEnhancer,
      ]
    >
  >;

  beforeEach(() => {
    state = configureStore({
      reducer: {
        order: burgerConstructorSlice.reducer,
      },
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('Неизвестный action: возвращает начальное значение для BurgerConstructor', () => {
    expect(
      burgerConstructorSlice.reducer(undefined, {
        type: 'unknown',
      })
    ).toEqual(initialState);
  });

  it('Добавление булки в стейт', () => {
    expect(
      burgerConstructorSlice.reducer(undefined, {
        type: 'order/addBun',
        payload: bun,
      })
    ).toEqual({
      ...initialState,
      orderBun: bun,
    });
  });

  it('Добавление ингредиента в стейт', () => {
    expect(
      burgerConstructorSlice.reducer(undefined, {
        type: 'order/addIngredient',
        payload: ingredient,
      })
    ).toEqual({
      ...initialState,
      orderItems: [ingredient],
    });
  });

  it('Удаление булки из стейта', () => {
    expect(
      burgerConstructorSlice.reducer(
        {
          ...initialState,
          orderBun: bun,
        },
        {
          type: 'order/removeBun',
        }
      )
    ).toEqual(initialState);
  });

  it('Удаление ингредиента из стейта', () => {
    expect(
      burgerConstructorSlice.reducer(
        {
          ...initialState,
          orderItems: [ingredient],
        },
        {
          type: 'order/removeIngredient',
          payload: 'xxxIngredient',
        }
      )
    ).toEqual(initialState);
  });

  it('Сортировка ингредиентов в стейте', () => {
    expect(
      burgerConstructorSlice.reducer(
        {
          ...initialState,
          orderItems: [ingredient, ingredient2],
        },
        {
          type: 'order/sortOrderItems',
          payload: { itemIndex: 1, nextIndex: 0 },
        }
      )
    ).toEqual({
      ...initialState,
      orderItems: [ingredient2, ingredient],
    });
  });

  it('Обнуление заказа', () => {
    expect(
      burgerConstructorSlice.reducer(undefined, {
        type: 'order/resetOrder',
      })
    ).toEqual(initialState);
  });

  it('Заказ ожидает создания', () => {
    const mockResponseData = {
      data: [ingredient],
    };

    const request = { data: (): Record<string, unknown> => mockResponseData };

    vi.spyOn(request, 'data').mockResolvedValue(mockResponseData);
    state.dispatch(createOrder());

    const { orderLoading } = state.getState().order;

    expect(orderLoading).toBe(true);
  });

  it('Заказ создан', async () => {
    state.dispatch(addBun(bun));
    state.dispatch(addIngredient(ingredient));

    const mockResponseOrder = {
      success: true,
      order: { number: 12345 },
    };

    const requestOrder = { order: (): Record<string, unknown> => ({}) };

    vi.spyOn(requestOrder, 'order').mockResolvedValue(mockResponseOrder);
    await state.dispatch(createOrder());

    const { /* orderId, */ orderLoading } = state.getState().order;

    // expect(orderId).toBe(12345);
    expect(orderLoading).toBe(false);
  });

  /* it('Ошибка создания заказа', async () => {
    // const errorString = 'No order';
    // const action = {
    //   type: 'order/createOrder/rejected',
    //     error: {
    //       message: errorString
    //     }
    // };
    // const state = burgerConstructorSlice.reducer(undefined, action);
    // expect(state.orderError).toBe(errorString);

    // const requestError = {
    //   error: () => ({ error: 'No order'})
    // }

    vi.spyOn(api, 'request').mockRejectedValue(new Error('No order'));
    state.dispatch(createOrder());

    const { orderError } = state.getState().order;

    expect(orderError).toEqual('No order');
  }) */
});

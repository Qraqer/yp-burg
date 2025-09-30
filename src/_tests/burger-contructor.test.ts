import { createOrder } from '@/services/burger-contructor/actions';
import { ingredients } from '@/utils/ingredients';
import { describe, expect, it } from 'vitest';

import {
  burgerConstructorSlice,
  initialState,
} from '../services/burger-contructor/reducer';

import type { TOrderIngredient } from '@/utils/types';

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
    const action = {
      type: createOrder.pending.type,
    };
    expect(burgerConstructorSlice.reducer(initialState, action)).toEqual({
      ...initialState,
      orderLoading: true,
      orderError: null,
    });
  });

  it('Заказ создан', () => {
    const orderId = 12345;
    const action = {
      type: createOrder.fulfilled.type,
      payload: orderId,
    };
    expect(burgerConstructorSlice.reducer(initialState, action)).toEqual({
      ...initialState,
      orderId: orderId,
      orderLoading: false,
      orderError: null,
    });
  });

  it('Ошибка создания заказа', () => {
    const errorMessage = 'No order';
    const action = {
      type: createOrder.rejected.type,
      error: {
        message: errorMessage,
      },
    };
    expect(burgerConstructorSlice.reducer(initialState, action)).toEqual({
      ...initialState,
      orderLoading: false,
      orderError: errorMessage,
    });
  });
});

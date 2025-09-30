import { addIngredient, removeIngredient } from '@/services/burger-contructor/reducer';
import {
  clearIngregient,
  initialState,
  showIngredient,
} from '@/services/burger-ingredients/reducer';
import { addOrder } from '@/services/orders-feed/reducer';
import { store } from '@/services/store';
import { ingredients } from '@/utils/ingredients';
import { describe, expect, it } from 'vitest';

import type { TOrder, TOrderIngredient } from '@/utils/types';

const ingredient = ingredients.find((item) => item._id === '60666c42cc7b410027a1a9b5')!;

const orderIngredient: TOrderIngredient = {
  ...ingredient,
  uuid: 'xxxIngredient',
};

describe('Тестируем rootReducer', () => {
  it('Созданный рутовый редьюсер возвращает начальные значения', () => {
    const state = store.getState();

    expect(state.ingredients.ingredients).toEqual([]);
    expect(state.order.orderBun).toBeNull();
    expect(state.ordersFeed.total).toBe(0);
    expect(state.ordersUser.orders).toEqual([]);
    expect(state.user.isAuthChecked).toBe(false);
  });

  it('Проверяем работу с ингредиентами', () => {
    store.dispatch(showIngredient(ingredient));
    let state = store.getState().ingredients;
    expect(state.ingredient).toEqual(ingredient);

    store.dispatch(clearIngregient());
    state = store.getState().ingredients;
    expect(state.ingredient).toEqual(initialState.ingredient);
  });

  it('Рутовый редьюсер верно работает, например, с ингредиентами в заказе', () => {
    store.dispatch(addIngredient(orderIngredient));
    let state = store.getState().order;
    expect(state.orderItems).toHaveLength(1);

    store.dispatch(removeIngredient(orderIngredient.uuid));
    state = store.getState().order;
    expect(state.orderItems).toHaveLength(0);
  });

  it('Проверим работу с лентой заказов', () => {
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
    store.dispatch(addOrder([order]));

    const { orders } = store.getState().ordersFeed;

    expect(orders).toEqual([order]);
  });
});

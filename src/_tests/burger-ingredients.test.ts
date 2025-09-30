import { getIngredients } from '@/services/burger-ingredients/actions';
import {
  burgerIngredientsSlice,
  initialState,
} from '@/services/burger-ingredients/reducer';
import { ingredients } from '@/utils/ingredients';
import { describe, expect, it } from 'vitest';

const ingredient = ingredients.find((item) => item._id === '60666c42cc7b410027a1a9b5')!;

describe('Тестирование слайса в BurgerIngredients', () => {
  it('Неизвестный action: возвращает начальное значение для BurgerConstructor', () => {
    expect(
      burgerIngredientsSlice.reducer(undefined, {
        type: 'unknown',
      })
    ).toEqual(initialState);
  });

  it('Выбрать ингредиент для показа', () => {
    expect(
      burgerIngredientsSlice.reducer(undefined, {
        type: 'ingredients/showIngredient',
        payload: ingredient,
      })
    ).toEqual({
      ...initialState,
      ingredient: ingredient,
    });
  });

  it('Обнулить ингредиент', () => {
    expect(
      burgerIngredientsSlice.reducer(undefined, {
        type: 'ingredients/clearIngregient',
      })
    ).toEqual(initialState);
  });

  it('Показать модальное окно', () => {
    expect(
      burgerIngredientsSlice.reducer(undefined, {
        type: 'ingredients/setShowModal',
        payload: true,
      })
    ).toEqual({
      ...initialState,
      showModal: true,
    });
  });

  it('Ожидаем загрузку ингредиентов', () => {
    const action = {
      type: getIngredients.pending.type,
    };

    expect(burgerIngredientsSlice.reducer(initialState, action)).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('Загрузка ингредиентов успешно выполнена', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: {
        data: [ingredient],
      },
    };

    expect(burgerIngredientsSlice.reducer(initialState, action)).toEqual({
      ...initialState,
      loading: false,
      ingredients: [ingredient],
    });
  });

  it('Ошибка загрузки ингредиентов', () => {
    const errorMessage = 'Unable to get ingredients';
    const action = {
      type: getIngredients.rejected.type,
      error: {
        message: errorMessage,
      },
    };

    expect(burgerIngredientsSlice.reducer(initialState, action)).toEqual({
      ...initialState,
      loading: false,
      error: errorMessage,
    });
  });
});

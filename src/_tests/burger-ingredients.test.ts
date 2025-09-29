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

  /* it('Загружаем список ингредиентов', () => {
    const action = { type: 'order/getIngredients/pending' };
    const state = burgerIngredientsSlice.reducer(undefined, action);
    expect(state.loading).toBe(true);
  })

  it('Загружаем список ингредиентов', () => {
    const data = [ ingredient ];

    const action = {
      type: 'order/getIngredients/pending',
      payload: {
        data: data
      }
    };
    const state = burgerIngredientsSlice.reducer(undefined, action);
    expect(state.ingredients).toBe(data);
  })

  it('Сбой загрузки ингредиентов', () => {
    const errorMessage = 'Error in requesting ingredients';
    const action = {
      type: 'order/getIngredients/rejected',
      erro: {
        message: errorMessage
      }
    };
    const state = burgerIngredientsSlice.reducer(undefined, action);
    expect(state.error).toBe(errorMessage);
  }) */
});

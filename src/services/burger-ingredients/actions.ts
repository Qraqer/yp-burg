import { API_POINTS } from '@/utils/constants';
import { request } from '@/utils/request';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { TIngredientsResponseData } from '@/utils/types';

export const getIngredients = createAsyncThunk(
  'burgerIngredients/getIngredients',
  async () => {
    const ingredientsList = await request<TIngredientsResponseData>(
      API_POINTS.ingredients
    );
    return ingredientsList;
  }
);

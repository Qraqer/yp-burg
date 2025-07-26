import { API_POINTS } from '@/utils/constants';
import { request } from '@/utils/request';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { IIngredientsResponseData } from '@/utils/types';

export const getIngredients = createAsyncThunk(
  'burgerIngredients/getIngredients',
  async () => {
    const ingredientsList = await request<IIngredientsResponseData>(
      API_POINTS.ingredients
    );
    return ingredientsList;
  }
);

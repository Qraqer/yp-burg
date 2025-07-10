import { createSlice } from '@reduxjs/toolkit';

import { getIngredients } from './actions';

import type { TIngredientsState } from '@utils/types';

const initialState: TIngredientsState = {
  ingredients: [],
  error: null,
  loading: false,
};

export const burgerIngredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    loadIngredients: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload.data;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error in requesting ingredients';
      });
  },
});

export const { loadIngredients } = burgerIngredientsSlice.selectors;

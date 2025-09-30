import { createSlice } from '@reduxjs/toolkit';

import { getIngredients } from './actions';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TIngredientsState, TIngredient } from '@utils/types';

export const initialState: TIngredientsState = {
  ingredients: [],
  error: null,
  loading: false,
  ingredient: {
    _id: '',
    name: '',
    type: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_large: '',
    image_mobile: '',
    __v: 0,
  },
  showModal: false,
};

export const burgerIngredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    showIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredient = action.payload;
    },
    clearIngregient: (state) => {
      state.ingredient = initialState.ingredient;
    },
    setShowModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload.data;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error in requesting ingredients';
      });
  },
});

export const { showIngredient, setShowModal, clearIngregient } =
  burgerIngredientsSlice.actions;

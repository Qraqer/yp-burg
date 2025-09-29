import { createSlice } from '@reduxjs/toolkit';

import { createOrder } from './actions';

import type { TOrderIngredient, TOrderState } from '@/utils/types';
import type { PayloadAction } from '@reduxjs/toolkit';

export const initialState: TOrderState = {
  orderBun: null,
  orderItems: [],
  orderId: null,
  orderLoading: false,
  orderError: null,
};

type TPayloadIndexes = {
  itemIndex: number;
  nextIndex: number;
};

export const burgerConstructorSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TOrderIngredient>) => {
      state.orderBun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TOrderIngredient>) => {
      state.orderItems.push({ ...action.payload });
    },
    removeBun: (state) => {
      state.orderBun = initialState.orderBun;
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.orderItems = state.orderItems.filter((i) => i.uuid !== action.payload);
    },
    sortOrderItems: (state, action: PayloadAction<TPayloadIndexes>) => {
      const { itemIndex, nextIndex } = action.payload;
      const newOrderItems = [...state.orderItems];
      newOrderItems.splice(nextIndex, 0, newOrderItems.splice(itemIndex, 1)[0]);
      state.orderItems = newOrderItems;
    },
    resetOrder: (state) => {
      state.orderBun = initialState.orderBun;
      state.orderItems = initialState.orderItems;
      state.orderId = initialState.orderId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderId = action.payload;
        state.orderLoading = false;
        state.orderError = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.error.message ?? null;
      });
  },
});

export const {
  addBun,
  addIngredient,
  removeBun,
  removeIngredient,
  sortOrderItems,
  resetOrder,
} = burgerConstructorSlice.actions;

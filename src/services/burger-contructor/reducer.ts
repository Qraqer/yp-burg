import { createSlice /* nanoid, PayloadAction */ } from '@reduxjs/toolkit';

import { requestOrderId } from './actions';

import type { IOrderIngredient, IOrderState /* TIngredient */ } from '@/utils/types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: IOrderState = {
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
    addBun: (state, action: PayloadAction<IOrderIngredient>) => {
      state.orderBun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<IOrderIngredient>) => {
      state.orderItems.push({ ...action.payload });
    },
    removeBun: (state) => {
      state.orderBun = initialState.orderBun;
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.orderItems = state.orderItems.filter((i) => i.uuid !== action.payload);
    },
    setOrderItems: (state, action: PayloadAction<IOrderIngredient[]>) => {
      state.orderItems = action.payload;
    },
    sortOrderItems: (state, action: PayloadAction<TPayloadIndexes>) => {
      const { itemIndex, nextIndex } = action.payload;
      const item = state.orderItems[itemIndex];
      state.orderItems = [...state.orderItems]
        .splice(itemIndex, 1)
        .splice(nextIndex, 0, item);
    },
    resetOrder: (state) => {
      state.orderBun = initialState.orderBun;
      state.orderItems = initialState.orderItems;
      state.orderId = initialState.orderId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestOrderId.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
      })
      .addCase(requestOrderId.fulfilled, (state, action) => {
        state.orderId = action.payload;
        state.orderLoading = false;
        state.orderError = null;
      })
      .addCase(requestOrderId.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.error.message ?? null;
      });
  },
  selectors: {
    loadOrderItems: (state) => ({
      bun: state.orderBun,
      ingredients: state.orderItems,
    }),
  },
});

export const {
  addBun,
  addIngredient,
  removeBun,
  removeIngredient,
  setOrderItems,
  sortOrderItems,
  resetOrder,
} = burgerConstructorSlice.actions;

export const { loadOrderItems } = burgerConstructorSlice.selectors;

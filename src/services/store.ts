import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { useDispatch as uDispatch, useSelector as uSelector } from 'react-redux';

import { burgerConstructorSlice } from './burger-contructor/reducer';
import { burgerIngredientsSlice } from './burger-ingredients/reducer';
import { ordersUserMiddleware, ordersUserSlice } from './orders-history/reducer';
import { userSlice } from './user/reducer';

const rootReducer = combineSlices(
  burgerIngredientsSlice,
  burgerConstructorSlice,
  userSlice,
  ordersUserSlice
);

export const middlewares = [ordersUserMiddleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares),
});

// Type helpers
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = uDispatch.withTypes<AppDispatch>();
export const useSelector = uSelector.withTypes<RootState>();

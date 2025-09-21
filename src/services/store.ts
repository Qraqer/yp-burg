import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { useDispatch as uDispatch, useSelector as uSelector } from 'react-redux';

import { burgerConstructorSlice } from './burger-contructor/reducer';
import { burgerIngredientsSlice } from './burger-ingredients/reducer';
import { OrdersFeedActions } from './orders-feed/actions';
import { ordersFeedSlice } from './orders-feed/reducer';
import { OrdersUserActions } from './orders-history/actions';
import { ordersUserSlice } from './orders-history/reducer';
import { userSlice } from './user/reducer';
import { wsMiddleware } from './ws';

const rootReducer = combineSlices(
  burgerIngredientsSlice,
  burgerConstructorSlice,
  userSlice,
  ordersUserSlice,
  ordersFeedSlice
);

const ordersUserMiddleware = wsMiddleware(OrdersUserActions);
const ordersFeedMiddleware = wsMiddleware(OrdersFeedActions);

export const middlewares = [ordersUserMiddleware, ordersFeedMiddleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares),
});

// Type helpers
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = uDispatch.withTypes<AppDispatch>();
export const useSelector = uSelector.withTypes<RootState>();

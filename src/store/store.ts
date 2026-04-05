import { configureStore } from '@reduxjs/toolkit';
import roleReducer from '@/store/slices/roleSlice';
import transactionsReducer from '@/store/slices/transactionsSlice';
import uiReducer from '@/store/slices/uiSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      transactions: transactionsReducer,
      ui: uiReducer,
      role: roleReducer,
    },
  });

export const store = makeStore();

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

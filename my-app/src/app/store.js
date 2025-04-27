import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { flowAPI } from '../features/flow/flowAPI';

export const store = configureStore({
  reducer: {
    //counter: counterReducer,
    [flowAPI.reducerPath]: flowAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(flowAPI.middleware),
});

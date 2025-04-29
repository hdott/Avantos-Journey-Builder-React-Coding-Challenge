import { configureStore, prepareAutoBatched } from '@reduxjs/toolkit';
import { flowAPI } from '../features/flow/flowAPI';
import { prefillSlice } from '../features/prefill/prefillSlice';

export const store = configureStore({
  reducer: {
    //counter: counterReducer,
    [flowAPI.reducerPath]: flowAPI.reducer,
    [prefillSlice.reducerPath]: prefillSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(flowAPI.middleware),
});

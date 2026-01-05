import { configureStore } from '@reduxjs/toolkit';
import { loginApi } from './api/loginApi';
import authReducer from  './authSlice';
import { diamondApi } from './api/diamondApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [diamondApi.reducerPath]: diamondApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginApi.middleware, diamondApi.middleware),
});

import { configureStore } from '@reduxjs/toolkit';
import { loginApi } from './api/loginApi';
import authReducer from  './authSlice';
import marginReducer from "./marginSlice";
import { diamondApi } from './api/diamondApi';
import { marginApi } from './api/marginApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    margin: marginReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [diamondApi.reducerPath]: diamondApi.reducer,
    [marginApi.reducerPath]: marginApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginApi.middleware).concat(diamondApi.middleware).concat(marginApi.middleware),
});

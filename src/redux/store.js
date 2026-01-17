import { configureStore } from '@reduxjs/toolkit';
import { loginApi } from './api/loginApi';
import authReducer from  './authSlice';
import marginReducer from "./marginSlice";
import gemstoneReducer from "./gemstoneSlice";
import { diamondApi } from './api/diamondApi';
import { gemstoneApi } from './api/gemstoneApi';
import { marginApi } from './api/marginApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    margin: marginReducer,
    gemstone: gemstoneReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [diamondApi.reducerPath]: diamondApi.reducer,
    [gemstoneApi.reducerPath]: gemstoneApi.reducer,
    [marginApi.reducerPath]: marginApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginApi.middleware).concat(diamondApi.middleware).concat(gemstoneApi.middleware).concat(marginApi.middleware),
});

import { configureStore } from '@reduxjs/toolkit';
import { diamondApi } from '../api/diamondApi';
import { gemstoneApi } from '../api/gemstoneApi';
import { settingsApi } from '../api/settingsApi';
import { ringApi } from '../api/ringApi';

export const store = configureStore({
  reducer: {
    [diamondApi.reducerPath]: diamondApi.reducer,
    [gemstoneApi.reducerPath]: gemstoneApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
    [ringApi.reducerPath]: ringApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(diamondApi.middleware).concat(gemstoneApi.middleware).concat(settingsApi.middleware).concat(ringApi.middleware)
});

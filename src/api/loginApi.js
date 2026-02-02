import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BaseURL }),
  tagTypes: ["login"],
  endpoints: (builder) => ({
    genrate: builder.mutation({
      query: (useData) => ({
        url: '/token/generate-token',
        method: 'POST',
        body: useData,
      }),
      invalidatesTags: ['token'],
    })
  }),
});

export const { useGenrateMutation } = loginApi;

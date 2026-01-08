import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const diamondApi = createApi({
  reducerPath: "diamondApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BaseURL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Diamonds"],
  endpoints: (builder) => ({
    createFiamonds: builder.mutation({
      query: (useData) => ({
       url: "/diamonds/csv/upload",
       method: 'POST',
       body: useData,
      }),
    }),

    getAllDiamonds: builder.query({
      query: (params = {}) => ({
        url: "/diamonds/all-diamonds",
        params,
      }),
      providesTags: ["Diamonds"],
    }),

    getDiamondFilters: builder.query({
      query: ({ stone_type, shopify_name }) => ({
        url: `/diamonds/filters`,
        params: {
          stone_type,
          shopify_name,
        },
      }),
    })
  }),
});

export const {
  useCreateFiamondsMutation,
  useGetAllDiamondsQuery,
  useGetDiamondFiltersQuery,
} = diamondApi;

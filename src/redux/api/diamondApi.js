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
    createDiamonds: builder.mutation({
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
    }),

    bulkDeleteDiamonds: builder.mutation({
      query: ({ ids, shopify_name }) => ({
        url: "/diamonds/bulk-delete",
        method: "DELETE",
        params: { shopify_name },
        body: { ids },
      }),
    }),


    deleteAllDiamonds: builder.mutation({
      query: ({ shopify_app }) => ({
        url: "/diamonds/all-delete",
        method: "DELETE",
        params: { shopify_app },
      }),
    }),
  }),
});

export const {
  useCreateDiamondsMutation,
  useGetAllDiamondsQuery,
  useGetDiamondFiltersQuery,
  useBulkDeleteDiamondsMutation,
  useDeleteAllDiamondsMutation,

} = diamondApi;

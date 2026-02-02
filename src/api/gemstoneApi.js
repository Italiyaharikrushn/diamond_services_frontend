import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const gemstoneApi = createApi({
  reducerPath: "gemstoneApi",
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
  tagTypes: ["Gemstones"],
  endpoints: (builder) => ({
    createGemstones: builder.mutation({
      query: (payload) => ({
        url: "/gemstones/csv/upload-gemstones",
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ["Gemstones"],
    }),

    getAllGemstones: builder.query({
      query: (params) => ({
        url: "/gemstones/all-gemstones",
        params,
      }),
      providesTags: ["Gemstones"],
    }),

    getGemstoneFilters: builder.query({
      query: ({ shopify_name }) => ({
        url: `/gemstones/filters`,
        params: { shopify_name },
      }),
    }),

    bulkDeleteGemstones: builder.mutation({
      query: ({ ids, shopify_name }) => ({
        url: "/gemstones/bulk-delete",
        method: "DELETE",
        params: { shopify_name },
        body: { ids },
      }),
    }),


    deleteAllGemstones: builder.mutation({
      query: ({ shopify_name }) => ({
        url: "/gemstones/all-delete",
        method: "DELETE",
        params: { shopify_name },
      }),
    }),
  }),
});

export const {
  useCreateGemstonesMutation,
  useGetAllGemstonesQuery,
  useGetGemstoneFiltersQuery,
  useBulkDeleteGemstonesMutation,
  useDeleteAllGemstonesMutation,
} = gemstoneApi;
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
    getAllDiamonds: builder.query({
      query: () => "/diamonds/all-diamonds",
      providesTags: ["Diamonds"],
    }),
  }),
});

export const { useGetAllDiamondsQuery } = diamondApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ringApi = createApi({
    reducerPath: "ringApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
    }),

    endpoints: (builder) => ({
        getrings: builder.query({
            query: () => "/ring/public/get-ring",
        }),

        getring: builder.query({
            query: (id) => `/ring/public/get-single-ring/${id}`
        }),
    })
});

export const {
    useGetringsQuery,
    useGetringQuery,
} = ringApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const diamondApi = createApi({
    reducerPath: "diamondApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
    }),

    endpoints: (builder) => ({
        getPublicDiamonds: builder.query({
            query: (params) => ({
                url: "/diamonds/public/diamonds",
                params: {
                    store_id : params.storeId,
                    type : params.type,
                    page : params.page,
                    limit : params.limit,
                },
            }),
        }),
    }),
});

export const { useGetPublicDiamondsQuery } = diamondApi;

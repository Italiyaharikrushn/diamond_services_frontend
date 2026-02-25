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
                    shape: params.shape,
                    min_carat: params.min_carat,
                    max_carat: params.max_carat,
                    min_price: params.min_price,
                    max_price: params.max_price,

                },
            }),
        }),
    }),
});

export const { useGetPublicDiamondsQuery } = diamondApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const settingsApi = createApi({
    reducerPath: "settingsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
    }),
    tagTypes: ["Settings"],
    endpoints: (builder) => ({
        getPublicSettings: builder.query({
            query: (params) => ({
                url: "/storeSetting/public/store-settings",
                params: {
                    store_id: params.storeId,
                }
            }),
            providesTags: ["Settings"],
        }),
    }),

});

export const {
    useGetPublicSettingsQuery,
} = settingsApi;
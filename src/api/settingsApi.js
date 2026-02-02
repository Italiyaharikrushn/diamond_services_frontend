import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const settingsApi = createApi({
    reducerPath: "settingsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BaseURL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ["Settings"],
    endpoints: (builder) => ({
        createSettings: builder.mutation({
            query: (payload) => ({
                url: "/storeSetting/store-settings",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["Settings"],
        }),
        getSettings: builder.query({
            query: () => ({
                url: "/storeSetting/store-settings",
            }),
            providesTags: ["Settings"],
        }),
        deleteSettings: builder.mutation({
            query: (id) => ({
                url: `/storeSetting/store-settings/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Settings"],
        })
    }),

});

export const {
    useCreateSettingsMutation,
    useGetSettingsQuery,
    useDeleteSettingsMutation,
} = settingsApi;
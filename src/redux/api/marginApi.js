import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const marginApi = createApi({
    reducerPath: "marginApi",
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
    tagTypes: ["Margins"],
    endpoints: (builder) => ({
        createMargin : builder.mutation({
            query: (useData) => ({
                url: "/margin/stone_margin",
                method: "POST",
                body: useData,
            }),
            invalidatesTags: ["Margins"],
        }),

        getMargins: builder.query({
            query: () => ({
                url: "/margin/stone_margin",
            }),
            providesTags: ["Margins"],
        }),
    }),
});

export const {
    useCreateMarginMutation,
    useGetMarginsQuery,
} = marginApi;

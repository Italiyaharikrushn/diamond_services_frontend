import { useGetPublicDiamondsQuery } from "../api/diamondApi";

export const useDiamonds = (storeId, type, page) => {
    const { data, isLoading, error, isFetching } = useGetPublicDiamondsQuery(
        { storeId, type, page, limit: 12 },
        { skip: !storeId || !type }
    );

    return {
        diamonds: data?.diamonds || [],
        pagination: data?.pagination,
        loading: isLoading || isFetching,
        error,
    };
};

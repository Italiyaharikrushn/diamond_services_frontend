import { useGetPublicGemstonesQuery } from "../api/gemstoneApi";

export const useGemstones = (storeId, type, page) => {
    const { data, isLoading, error, isFetching } = useGetPublicGemstonesQuery(
        { storeId, type, page, limit: 12 },
        { skip: !storeId || !type }
    );

    const gemstoneData = data?.data?.gemstones || [];

    return {
        gemstones: gemstoneData,
        pagination: data?.data?.pagination,
        loading: isLoading || isFetching,
        error,
    };
};

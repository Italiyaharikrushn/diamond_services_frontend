import { useGetPublicGemstonesQuery } from "../api/gemstoneApi";

export const useGemstones = (storeId, type, page, shapes, filters) => {
    const shapeParam = Array.isArray(shapes) ? shapes.join(",") : shapes || undefined;

    const colorParam = filters?.color?.length > 0 ? filters.color.join(",") : undefined;

    const { data, isLoading, error, isFetching } = useGetPublicGemstonesQuery(
        {
            storeId,
            type,
            page,
            limit: 12,
            shape: shapeParam,
            min_carat: filters?.carat?.[0],
            max_carat: filters?.carat?.[1],
            min_price: filters?.price?.[0],
            max_price: filters?.price?.[1],
            color: colorParam
        },
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

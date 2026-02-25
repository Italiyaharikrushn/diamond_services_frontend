import { useGetPublicDiamondsQuery } from "../api/diamondApi";

export const useDiamonds = (storeId, type, page, shapes, filters) => {
    const shapeParam = Array.isArray(shapes) ? shapes.join(",") : shapes || undefined;

    const colorParam = filters?.color?.length > 0 ? filters.color.join(",") : undefined;

    const { data, isLoading, error, isFetching } = useGetPublicDiamondsQuery(
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

    return {
        diamonds: data?.data?.diamonds || [],
        pagination: data?.data?.pagination,
        loading: isLoading || isFetching,
        error,
    };
};

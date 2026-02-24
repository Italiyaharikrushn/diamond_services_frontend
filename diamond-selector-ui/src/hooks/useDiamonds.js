import { useGetPublicDiamondsQuery } from "../api/diamondApi";

export const useDiamonds = (storeId, type, page, shapes, filters) => {
    const shapeParam = Array.isArray(shapes)
        ? shapes.join(",")
        : shapes || undefined;

    const { data, isLoading, error, isFetching } = useGetPublicDiamondsQuery(
        { storeId, type, page, limit: 12, shape: shapeParam, min_carat: filters?.carat?.[0], max_carat: filters?.carat?.[1] },
        { skip: !storeId || !type }
    );
    const diamondData = data?.data?.diamonds || [];

    return {
        diamonds: diamondData,
        pagination: data?.data?.pagination,
        loading: isLoading || isFetching,
        error,
    };
};

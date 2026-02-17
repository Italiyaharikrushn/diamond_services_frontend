import { useGetPublicDiamondsQuery } from "../api/diamondApi";

export const useDiamonds = (storeId, type, page, shapes) => {
    const shapeParam = Array.isArray(shapes)
        ? shapes.join(",")
        : shapes || undefined;

    const { data, isLoading, error, isFetching } = useGetPublicDiamondsQuery(
        { storeId, type, page, limit: 12, shape: shapeParam },
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

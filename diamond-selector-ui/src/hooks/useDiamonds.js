import { useGetPublicDiamondsQuery } from "../api/diamondApi";

export const useDiamonds = (storeId, type, page, shapes, filters) => {
    const shapeParam = Array.isArray(shapes) ? shapes.join(",") : shapes || undefined;
    const colorParam = filters?.colors?.length > 0 ? filters.colors.join(",") : undefined;
    const clarityParam = filters?.clarity?.length > 0 ? filters.clarity.join(",") : undefined;
    const cutParam = filters?.cut?.length > 0 ? filters.cut.join(",") : undefined;
    const reportParam = filters?.report?.length > 0 ? filters.report.join(",") : undefined;
    const polishParam = filters?.polish?.length > 0 ? filters.polish.join(",") : undefined;


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
            color: colorParam,
            clarity: clarityParam,
            cut: cutParam,
            lab: reportParam,
            polish: polishParam,
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

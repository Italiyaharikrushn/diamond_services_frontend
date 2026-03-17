import { useParams, useSearchParams } from "react-router-dom";
import { useGetPublicSingleDiamondsQuery } from "../api/diamondApi";

export const useSingleDiamond = (storeId) => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const stoneType = searchParams.get("type");

    const { data, isLoading, error } = useGetPublicSingleDiamondsQuery(
        {
            storeId,
            id,
            stone_type: stoneType,
        },
        { skip: !storeId || !id || !stoneType }
    );

    return {
        diamond: data?.data || null,
        loading: isLoading,
        error,
    };
};

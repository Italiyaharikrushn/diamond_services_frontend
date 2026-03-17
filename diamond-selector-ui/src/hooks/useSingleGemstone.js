import { useParams, useSearchParams } from "react-router-dom";
import { useGetPublicSingleGemstonesQuery } from "../api/gemstoneApi";

export const useSingleGemstone = (storeId) => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const stoneType = searchParams.get("type");

    const { data, isLoading, error } = useGetPublicSingleGemstonesQuery(
        {
            storeId,
            id,
            stone_type: stoneType,
        },
        { skip: !storeId || !id || !stoneType }
    );

    return {
        gemstone: data?.data || null,
        loading: isLoading,
        error,
    };
};

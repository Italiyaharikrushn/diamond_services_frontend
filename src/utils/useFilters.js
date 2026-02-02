import { useEffect } from "react";
import { useGetGemstoneFiltersQuery } from "../api/gemstoneApi";
import { useGetDiamondFiltersQuery } from "../api/diamondApi";

export const useFilters = (filters, setFilters) => {
    const isDiamond = ["lab", "natural"].includes(filters.stone_type?.toLowerCase());

    const { data: gemstoneFilterRes } = useGetGemstoneFiltersQuery({
        stone_type: filters.stone_type || undefined
    }, { skip: isDiamond });

    const { data: diamondFilterRes } = useGetDiamondFiltersQuery({
        stone_type: filters.stone_type || undefined
    }, { skip: !isDiamond });

    const filterRes = isDiamond ? diamondFilterRes : gemstoneFilterRes;
    const priceRangeUI = isDiamond ? filterRes?.data?.price_range : filterRes?.data?.price_ranges;
    const caratRangeUI = isDiamond ? filterRes?.data?.carat_range : filterRes?.data?.carat_ranges;

    useEffect(() => {
        if (filterRes?.data) {
            setFilters(p => ({
                ...p,
                price: p.price.length ? p.price : [priceRangeUI?.min || 0, priceRangeUI?.max || 0],
                carat: p.carat.length ? p.carat : [caratRangeUI?.min || 0, caratRangeUI?.max || 0]
            }));
        }
    }, [filterRes]);

    const handleReset = () => {
        if (filterRes?.data) {
            setFilters({
                ...filters,
                color: [],
                clarity: [],
                price: [priceRangeUI?.min, priceRangeUI?.max],
                carat: [caratRangeUI?.min, caratRangeUI?.max]
            });
        }
    };

    const handleToggleFilter = (key, value) => {
        setFilters(prev => {
            const current = prev[key] || [];
            const next = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
            return { ...prev, [key]: next };
        });
    };

    const handleInputChange = (key, index, value) => {
        let newValue = value === "" ? "" : Number(value);
        setFilters(prev => {
            const updatedRange = [...prev[key]];
            updatedRange[index] = newValue;
            return { ...prev, [key]: updatedRange };
        });
    };

    const handleBlur = (key, min, max) => {
        setFilters(prev => {
            let [valMin, valMax] = prev[key];
            if (valMin < min) valMin = min;
            if (valMax > max) valMax = max;
            if (valMin > valMax) valMin = valMax;
            return { ...prev, [key]: [valMin, valMax] };
        });
    };

    return {
        filterRes,
        priceRangeUI,
        caratRangeUI,
        handleReset,
        handleToggleFilter,
        handleInputChange,
        handleBlur
    };
};

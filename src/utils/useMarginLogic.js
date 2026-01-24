import { useState, useEffect } from "react";
import {useCreateMarginMutation, useGetMarginsQuery} from "../redux/api/marginApi";

export const useMarginLogic = (open, onclose, onSuccess, defaultType, filterData) => {
    const [createMargin, { isLoading }] = useCreateMarginMutation();
    const { data: marginRes, refetch } = useGetMarginsQuery(undefined, { 
        refetchOnMountOrArgChange: true, 
        skip: !open 
    });

    const [stoneType, setStoneType] = useState(defaultType || "lab");
    const [unit, setUnit] = useState("carat");
    const [rows, setRows] = useState([{ start: "", end: "", margin: "" }]);

    const getMarginValue = (type, unit, startVal) => {
        const s = Number(startVal);
        switch (type) {
            case "lab":
                return unit === "carat" ? (s < 2 ? 10 : s < 5 ? 7 : 5) : (s < 500 ? 15 : 10);
            case "natural":
                return unit === "carat" ? (s < 1 ? 12 : 8) : (s < 5000 ? 20 : 15);
            case "gemstones":
                return unit === "carat" ? (s < 2 ? 9 : 10) : (s < 500 ? 18 : 15);
            default: return "";
        }
    };

    useEffect(() => {
        if (open && marginRes?.Data) {
            const savedEntry = marginRes.Data.find(m => m.stone_type.toLowerCase() === stoneType.toLowerCase());
            if (savedEntry) setUnit(savedEntry.unit);
        }
    }, [open, marginRes, stoneType]);

    useEffect(() => {
        if (!open) return;

        const existingData = marginRes?.Data?.find(
            (m) => m.stone_type.toLowerCase() === stoneType.toLowerCase() && m.unit === unit
        );

        if (existingData && existingData.markups?.length > 0) {
            setRows(existingData.markups.map(m => ({
                start: m.start.toString(),
                end: m.end.toString(),
                margin: m.markup.toString()
            })));
        } else if (filterData) {
            let startVal = unit === "price" ? Math.floor(filterData.price_range?.min || 0) : (filterData.carat_range?.min || 0);
            let maxVal = unit === "price" ? Math.ceil(filterData.price_range?.max || 5000) : (filterData.carat_range?.max || 10);
            let step = unit === "price" ? 500 : 2;

            let autoRows = [];
            for (let i = startVal; i < maxVal; i += step) {
                const currentStart = i.toFixed(2);
                autoRows.push({
                    start: currentStart,
                    end: Math.min(i + step, maxVal).toFixed(2),
                    margin: getMarginValue(stoneType, unit, currentStart).toString()
                });
            }
            setRows(autoRows);
        }
    }, [open, stoneType, unit, marginRes, filterData]);

    const handleInputChange = (index, field, value) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
        if (field === "end" && index < updatedRows.length - 1) {
            updatedRows[index + 1].start = value;
        }
        setRows(updatedRows);
    };

    const handleSubmit = async () => {
        try {
            const validRanges = rows
                .filter(r => r.start !== "" && r.end !== "" && r.margin !== "")
                .map(r => ({ start: Number(r.start), end: Number(r.end), margin: Number(r.margin) }));

            if (!validRanges.length) return alert("Please enter margin for at least one range");

            await createMargin({ type: stoneType, unit, ranges: validRanges }).unwrap();
            await refetch();
            alert("Margin updated successfully!");
            onSuccess();
            onclose();
        } catch (err) {
            alert("Failed to update margin");
        }
    };

    return { stoneType, setStoneType, unit, setUnit, rows, handleInputChange, handleSubmit, isLoading };
};

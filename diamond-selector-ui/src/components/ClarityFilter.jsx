import React, { useEffect, useState } from 'react'
import { Box, Slider } from '@mui/material';
import FilterAccordion from './FilterAccordion';

const ClarityFilter = ({ config, onChange, value = [] }) => {
    const clarity = config?.values || [];
    const [range, setRange] = useState([1, clarity.length]);

    useEffect(() => {
        if (!clarity.length) return;

        if (!value.length) {
            setRange([1, clarity.length]);
            return;
        }

        const start = clarity.indexOf(value[0]) + 1;
        const end = clarity.indexOf(value[value.length - 1]) + 1;

        if (start > 0 && end > 0) {
            setRange([start, end]);
        }
    }, [value, clarity]);


    const handleChange = (_, newRange) => {
        setRange(newRange);

        const selectedClarity = clarity.slice(
            newRange[0] - 1,
            newRange[1]
        );

        onChange(selectedClarity);
    };

    return (

        <FilterAccordion title="Clarity">
            <Box sx={{ padding: "0px 8px" }}>
                <Slider
                    value={range}
                    onChange={handleChange}
                    min={1}
                    max={clarity.length}
                    step={1}
                    marks
                    defaultValue={[0, clarity.length + 1]}
                    shiftStep={30}
                    sx={{ color: "var(--ds-primary-color)" }}
                />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                {clarity.map((i) => <span key={i} style={{ width: "100%", fontSize: "12px", textAlign: "center" }}> {i}</span>)}
            </Box>
        </FilterAccordion>
    );
};
export default ClarityFilter

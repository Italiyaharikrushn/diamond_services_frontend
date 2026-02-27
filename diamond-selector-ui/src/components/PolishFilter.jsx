import React, { useEffect, useState } from 'react'
import { Box, Slider } from '@mui/material';
import FilterAccordion from './FilterAccordion';

function PolishFilter({ config, onChange, value = [] }) {

    const polish = config?.values || [];
    const [range, setRange] = useState([1, polish.length]);

    useEffect(() => {
        if (!polish.length) return;

        if (!value.length) {
            setRange([1, polish.length]);
            return;
        }

        const start = polish.indexOf(value[0]) + 1;
        const end = polish.indexOf(value[value.length - 1]) + 1;

        if (start > 0 && end > 0) {
            setRange([start, end]);
        }
    }, [value, polish]);

    const handleChange = (_, newRange) => {
        setRange(newRange);

        const selectedPolish = polish.slice(
            newRange[0] - 1,
            newRange[1]
        );

        onChange(selectedPolish)
    };

    return (

        <FilterAccordion title="Polish">
            <Box sx={{ padding: "0px 8px" }}>
                <Slider
                    value={range}
                    onChange={handleChange}
                    min={1}
                    max={polish.length}
                    step={1}
                    marks
                    defaultValue={[0, polish.length + 1]}
                    shiftStep={30}
                    disableSwap
                    sx={{ color: "var(--ds-primary-color)" }}
                />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                {polish.map((i) => <span key={i} style={{ width: "100%", fontSize: "12px", textAlign: "center" }}> {i}</span>)}
            </Box>
        </FilterAccordion>
    );
}

export default PolishFilter;

import React, { useEffect, useState } from 'react'
import { Box, Slider } from '@mui/material';
import FilterAccordion from './FilterAccordion';

function CutFilter({ config, onChange, value = [] }) {
    const cut = config?.values || [];
    const [range, setRange] = useState([1, cut.length]);

    useEffect(() => {
        if (!cut.length) return;

        if (!value.length) {
            setRange([1, cut.length]);
            return;
        }

        const start = cut.indexOf(value[0]) + 1;
        const end = cut.indexOf(value[value.length - 1]) + 1;

        if (start > 0 && end > 0) setRange([start, end]);
    }, [value, cut]);

    const handleChange = (_, newRange) => {
        setRange(newRange);

        const selectedCut = cut.slice(
            newRange[0] - 1,
            newRange[1]
        );

        onChange(selectedCut);
    };

    return (

        <FilterAccordion title="Cut">
            <Box sx={{ padding: "0px 8px" }}>
                <Slider
                    value={range}
                    onChange={handleChange}
                    min={1}
                    max={cut.length}
                    shiftStep={30}
                    step={1}
                    marks
                    defaultValue={[0, cut.length + 1]}
                    sx={{ color: "var(--ds-primary-color)" }}
                />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                {cut.map((i) => <span key={i} style={{ width: "100%", fontSize: "12px", textAlign: "center" }}> {i}</span>)}
            </Box>
        </FilterAccordion>
    );
}

export default CutFilter;

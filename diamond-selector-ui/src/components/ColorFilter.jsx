import React, { useEffect, useState } from 'react'
import { Box, Slider } from '@mui/material';
import FilterAccordion from './FilterAccordion';

const ColorFilter = ({ config, onChange, value = [] }) => {
    const colors = config?.values || [];
    const [range, setRange] = useState([1, colors.length]);

    useEffect(() => {
        if (!colors.length) return;

        if (!value.length) {
            setRange([1, colors.length]);
            return;
        }

        const start = colors.indexOf(value[0]) + 1;
        const end = colors.indexOf(value[value.length - 1]) + 1;

        if (start > 0 && end > 0) {
            setRange([start, end]);
        }
    }, [value, colors]);

    const handleChange = (_, newRange) => {
        setRange(newRange);

        const selectedColors = colors.slice(
            newRange[0] - 1,
            newRange[1]
        );

        onChange(selectedColors);
    };

    return (
        <FilterAccordion title="Colors">
            <Box sx={{ padding: "0px 8px" }}>
                <Slider
                    value={range}
                    onChange={handleChange}
                    min={1}
                    max={colors.length}
                    step={1}
                    disableSwap
                    marks
                    defaultValue={[0, colors.length + 1]}
                    shiftStep={30}
                    sx={{ color: "var(--ds-primary-color)" }}
                />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", px: 1 }}>
                {colors.map(c => (
                    <span key={c} style={{ fontSize: 12 }}>{c}</span>
                ))}
            </Box>
        </FilterAccordion>
    );
};

export default ColorFilter;

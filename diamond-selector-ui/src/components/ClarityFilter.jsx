import React, { useState } from 'react'
import { Box, Slider } from '@mui/material';
import FilterAccordion from './FilterAccordion';

const ClarityFilter = () => {
    const clarity = ["J", "I", "H", "G", "F", "E", "D"];
    const [value, setValue] = useState([1, clarity.length + 1]);

    const handleChange = (event, newValue) => {
        if (!Array.isArray(newValue)) return;

        const minDistance = 1;

        if (newValue[1] - newValue[0] >= minDistance) {
            setValue(newValue);
        }
    };

    return (

        <FilterAccordion title="Clarity">
            <Box sx={{ padding: "0px 8px" }}>
                <Slider
                    defaultValue={[0, clarity.length + 1]}
                    shiftStep={30}
                    step={1}
                    marks
                    value={value}
                    onChange={handleChange}
                    disableSwap
                    min={1}
                    max={clarity.length + 1}
                    sx={{
                        color: "var(--ds-primary-color)",

                        "& .MuiSlider-track": {
                            height: 5,
                            border: "none",
                        },

                        "& .MuiSlider-rail": {
                            height: 5,
                        },

                        "& .MuiSlider-thumb": {
                            width: 18,
                            height: 18,
                            backgroundColor: "#fff",
                        },
                        "& .MuiSlider-mark": {
                            width: 2,
                            height: 14,
                            backgroundColor: "#ffffff",
                            marginTop: "-4px",
                        },
                        "& .MuiSlider-markActive": {
                            backgroundColor: "#ffffff",
                        },
                        "& .MuiSlider-markLabel": {
                            fontSize: 13,
                            fontWeight: 500,
                        },
                    }}
                />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                {clarity.map((i) => <span key={i} style={{ width: "100%", fontSize: "12px", textAlign: "center" }}> {i}</span>)}
            </Box>
        </FilterAccordion>
    );
};
export default ClarityFilter

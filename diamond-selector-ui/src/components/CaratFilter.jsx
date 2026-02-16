import React, { useState } from 'react'
import { Box, Slider, TextField } from '@mui/material';
import FilterAccordion from './FilterAccordion';

const CaratFilter = () => {
  const [value, setValue] = useState([0, 50]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMinChange = (e) => {
    const newMin = Number(e.target.value);
    setValue([newMin, value[1]]);
  };

  const handleMaxChange = (e) => {
    const newMax = Number(e.target.value);
    setValue([value[0], newMax]);
  };

  return (
    <FilterAccordion title="Carat">
      <Box sx={{ padding: "0px 8px" }}>
        <Slider
          value={value}
          onChange={handleSliderChange}
          min={0}
          max={50}
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

          }}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" gap={2} mt={1}>
        <TextField
          label="Min"
          size="small"
          type="number"
          value={value[0]}
          onChange={handleMinChange}
          sx={{ width: "100px", }}
        />

        <TextField
          label="Max"
          size="small"
          type="number"
          value={value[1]}
          onChange={handleMaxChange}
          sx={{ width: "100px", }}
        />
      </Box>
    </FilterAccordion>
  )
}

export default CaratFilter;

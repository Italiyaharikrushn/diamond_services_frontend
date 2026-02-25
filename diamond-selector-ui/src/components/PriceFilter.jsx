import React, { useEffect, useState } from 'react'
import { Box, Slider, TextField } from '@mui/material';
import FilterAccordion from './FilterAccordion';

const PriceFilter = ({ config, value, onChange }) => {

  const minLimit = config?.min || 0;
  const maxLimit = config?.max || 5000;

  const [localValue, setLocalValue] = useState([minLimit, maxLimit]);

  useEffect(() => {
    if (Array.isArray(value) && value.length === 2) {
      setLocalValue(value);
    } else {
      setLocalValue([minLimit, maxLimit]);
    }
  }, [value, minLimit, maxLimit]);

  const handleSliderChange = (event, newValue) => {
    setLocalValue(newValue);
  };

  const handleCommitted = (event, newValue) => {
    onChange(newValue);
  };

  const handleInputBlur = () => {
    onChange(localValue);
  };
  return (
    <FilterAccordion title={config?.label || "Price"}>
      <Box sx={{ padding: "0px 8px" }}>
        <Slider
          value={localValue}
          onChange={handleSliderChange}
          onChangeCommitted={handleCommitted}
          min={minLimit}
          max={maxLimit}
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
          value={localValue[0] ?? 0}
          onChange={(e) => setLocalValue([Number(e.target.value), localValue[1]])}
          onBlur={() => onChange(localValue)}
          sx={{ width: "100px", }}
        />

        <TextField
          label="Max"
          size="small"
          type="number"
          value={localValue[1]}
          onChange={(e) => setLocalValue([localValue[0], Number(e.target.value)])}
          sx={{ width: "100px", }}
        />
      </Box>
    </FilterAccordion>
  )
}

export default PriceFilter;

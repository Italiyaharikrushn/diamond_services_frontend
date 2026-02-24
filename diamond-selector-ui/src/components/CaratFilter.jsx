import React, { useEffect, useState } from 'react'
import { Box, Slider, TextField } from '@mui/material';
import FilterAccordion from './FilterAccordion';

const CaratFilter = ({ config, onChange, value }) => {

  const minLimit = config?.min || 0;
  const maxLimit = config?.max || 15;

  const [localValue, setLocalValue] = useState(value || [minLimit, maxLimit]);
  useEffect(() => {
    if (value) {
      setLocalValue(value);
    }
  }, [value]);

  return (
    <FilterAccordion title={config?.label || "Carat"}>
      <Box sx={{ padding: "0px 8px" }}>
        <Slider
          value={localValue}
          onChange={(e, newValue) => setLocalValue(newValue)}
          onChangeCommitted={(e, newValue) => onChange(newValue)}
          min={minLimit}
          max={maxLimit}
          step={0.01}
          sx={{ color: "var(--ds-primary-color)" }}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" gap={2} mt={1}>
        <TextField
          label="Min"
          size="small"
          type="number"
          value={localValue[0]}
          onChange={(e) => {
            const val = [Number(e.target.value), localValue[1]];
            setLocalValue(val);
            onChange(val);
          }}
          sx={{ width: "100px" }}
        />

        <TextField
          label="Max"
          size="small"
          type="number"
          value={localValue[1]}
          onChange={(e) => {
            const val = [localValue[0], Number(e.target.value)];
            setLocalValue(val);
            onChange(val);
          }}
          sx={{ width: "100px" }}
        />
      </Box>
    </FilterAccordion>
  )
}

export default CaratFilter;

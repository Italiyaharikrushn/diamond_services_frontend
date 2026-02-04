import React from "react";
import { Paper, Stack, FormControlLabel, Checkbox, Typography, RadioGroup, Radio } from "@mui/material";
import { SettingRow } from "./SettingRow";

const SelectedViewSection = ({ selected_view, default_view, onToggleView, onUpdateDefault }) => {
  return (
    <SettingRow title="Selected View">
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
        <Stack direction="row" spacing={3} sx={{ mb: 2 }}>
          {selected_view?.map((view) => (
            <FormControlLabel
              key={view.id}
              control={
                <Checkbox
                  checked={!!view.enabled}
                  onChange={() => onToggleView(view.id)}
                />
              }
              label={view.label}
            />
          ))}
        </Stack>

        <Typography sx={{ mb: 1, fontWeight: 500 }}>Default View</Typography>

        <RadioGroup
          row
          value={default_view || "grid"}
          onChange={(e) => onUpdateDefault(e.target.value)}
        >
          {selected_view?.map((view) => (
            <FormControlLabel
              key={view.id}
              value={view.id}
              control={<Radio />}
              label={`${view.label} View`}
              disabled={!view.enabled}
            />
          ))}
        </RadioGroup>
      </Paper>
    </SettingRow>
  );
};

export default SelectedViewSection;

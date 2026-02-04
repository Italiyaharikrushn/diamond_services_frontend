import React from "react";
import { Paper, Grid, FormControlLabel, Checkbox } from "@mui/material";
import { SettingRow } from "./SettingRow";

const SelectedDetailsSection = ({ selected_details, onToggleDetail }) => {
  return (
    <SettingRow
      title="Selected Details"
      subtitle="Manage which details appear on the stone cards."
    >
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
        <Grid container spacing={1}>
          {selected_details?.map((detail) => (
            <Grid item xs={6} key={detail.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!detail.enabled}
                    onChange={() => onToggleDetail(detail.id)}
                  />
                }
                label={detail.label}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </SettingRow>
  );
};

export default SelectedDetailsSection;

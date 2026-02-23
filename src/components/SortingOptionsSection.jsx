import React, { useMemo } from "react";
import { Paper, Stack, FormControlLabel, Checkbox, Typography, Select, MenuItem } from "@mui/material";
import { SettingRow } from "./SettingRow";

const SortingOptionsSection = ({ sorting_options = [], default_sort, onToggleSort, onUpdateDefaultSort }) => {
    const dropdownOptions = useMemo(() => {
        const list = [];

        sorting_options
            .filter(opt => opt.enabled)
            .forEach(opt => {
                list.push({
                    value: `${opt.id}_desc`,
                    label: `${opt.label} High To Low`
                });

                list.push({
                    value: `${opt.id}_asc`,
                    label: `${opt.label} Low To High`
                });
            });

        return list;
    }, [sorting_options]);

    return (
        <SettingRow title="Sorting Options">
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>

                {/* Enable Disable */}
                <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
                    {sorting_options.map(option => (
                        <FormControlLabel
                            key={option.id}
                            control={
                                <Checkbox
                                    checked={!!option.enabled}
                                    onChange={() => onToggleSort(option.id)}
                                />
                            }
                            label={option.label}
                        />
                    ))}
                </Stack>

                {/* Dropdown */}
                <Typography sx={{ mb: 1, fontWeight: 500 }}>
                    Select Default Sorting
                </Typography>

                <Select
                    fullWidth
                    size="small"
                    value={default_sort || ""}
                    onChange={(e) => onUpdateDefaultSort(e.target.value)}
                >
                    {dropdownOptions.map(opt => (
                        <MenuItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </MenuItem>
                    ))}
                </Select>

            </Paper>
        </SettingRow>
    );
};

export default SortingOptionsSection;

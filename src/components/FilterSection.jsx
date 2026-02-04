import React from "react";
import { Paper, Box, Typography, Switch, Grid, TextField, Stack } from "@mui/material";

const FilterSection = ({ filters, onToggle, onValueChange }) => {
    return (
        <Stack spacing={2}>
            {filters?.map((filter) => (
                <Paper key={filter.id} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography fontWeight="600">{filter.label}</Typography>
                        <Switch
                            checked={filter.enabled}
                            disabled={filter.not_changeable && filter.enabled}
                            onChange={() => onToggle(filter.id)}
                            color="primary" size="small"
                        />
                    </Box>

                    {filter.enabled && (
                        <Box sx={{ mt: 2 }}>
                            {filter.values && !Array.isArray(filter.values) ? (
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Min" type="number" fullWidth size="small"
                                            value={filter.values.min}
                                            onChange={(e) => onValueChange(filter.id, 'min', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Max" type="number" fullWidth size="small"
                                            value={filter.values.max}
                                            onChange={(e) => onValueChange(filter.id, 'max', e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            ) : (
                                <TextField
                                    label={`${filter.label} (comma separated)`}
                                    size="small" fullWidth
                                    value={filter.values?.join(", ")}
                                    onChange={(e) => onValueChange(filter.id, null, e.target.value)}
                                />
                            )}
                        </Box>
                    )}
                </Paper>
            ))}
        </Stack>
    );
};

export default FilterSection;

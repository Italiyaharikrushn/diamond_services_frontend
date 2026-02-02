import React, { useState } from "react";
import { Box, Typography, Paper, Checkbox, TextField, FormControlLabel, Grid } from "@mui/material";
import { DropdownIcon } from "../../components/dropdown";
import { useDispatch, useSelector } from "react-redux";
import { updateSettingByPath } from "../../redux/settingsSlice";

const ComplateRing = () => {
    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(true);

    const settings = useSelector((state) => state.settings.settings);
    const showRingSize = settings?.complete_ring?.show_ring_size

    return (
        <Box sx={{ p: 1 }}>
            <Paper
                elevation={0}
                sx={{
                    p: 2, mb: 3,
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    cursor: "pointer", borderBottom: '1px solid #eee'
                }}
                onClick={() => setIsExpanded(prev => !prev)}
            >
                <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                    Complete Ring Settings
                </Typography>
                <DropdownIcon isExpanded={isExpanded} />
            </Paper>

            {isExpanded && (
                <>
                    <Grid container spacing={2} alignItems="flex-start" sx={{ mb: 4 }}>
                        <Grid item xs={12} md={4}>
                            <Typography fontWeight="bold">Add Ring Sizes</Typography>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={showRingSize}
                                            onChange={(e) => {
                                                dispatch(
                                                    updateSettingByPath({
                                                        path: `complete_ring.show_ring_size`,
                                                        value: e.target.checked,
                                                    })
                                                );
                                            }}
                                            color="primary"
                                        />
                                    }
                                    label="Do you want to show ring size selector?"
                                />

                                {showRingSize && (
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                            Enter ring size values (comma separated)
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            placeholder="e.g. 3, 4, 5, 6, 7"
                                        />
                                    </Box>
                                )}
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} alignItems="flex-start" sx={{ mb: 3 }}>
                        <Grid item xs={12} md={4}>
                            <Typography fontWeight="bold">Give Engravings Options</Typography>
                            <Typography variant="body2" color="text.secondary">
                                This will be shown as text-box on complete ring page
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                        />
                                    }
                                    label="Do you want to show ring engravings?"
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </>
            )}
        </Box>
    );
};

export default ComplateRing;

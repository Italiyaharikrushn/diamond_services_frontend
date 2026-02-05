import React, { useState } from "react";
import { Box, Typography, Paper, Checkbox, TextField, FormControlLabel, Divider } from "@mui/material";
import { DropdownIcon } from "../../components/dropdown";
import { useDispatch, useSelector } from "react-redux";
import { updateSettingByPath } from "../../redux/settingsSlice";
import { SettingRow } from "../../components/SettingRow";

const ComplateRing = () => {
    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(true);

    const settings = useSelector((state) => state.settings.settings);

    console.log("-----Settings--------", settings);

    const showRingSize = settings?.complete_ring?.show_ring_size;
    const ringSizeValues = settings?.complete_ring?.size_values;
    const showEngravings = settings?.complete_ring?.show_engravings;

    const handleUpdate = (path, value) => {
        dispatch(updateSettingByPath({ path, value }));
    };

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
                <Box>
                    <SettingRow
                        title="Add Ring Sizes"
                        isTopAligned={true}
                    >
                        <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={!!showRingSize}
                                        onChange={(e) => handleUpdate("complete_ring.show_engraving", e.target.checked)}
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
                                        value={ringSizeValues}
                                        onChange={(e) => handleUpdate("complete_ring.size_values", e.target.value)}
                                    />
                                </Box>
                            )}
                        </Paper>
                    </SettingRow>

                    <Divider sx={{ my: 4 }} />

                    <SettingRow
                        title="Give Engravings Options"
                        subtitle="This will be shown as text-box on complete ring page"
                        isTopAligned={true}
                    >
                        <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={!!showEngravings}
                                        onChange={(e) => handleUpdate("complete_ring.show_engravings", e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Do you want to show ring engravings?"
                            />
                        </Paper>
                    </SettingRow>
                </Box>
            )}
        </Box>
    );
};

export default ComplateRing;

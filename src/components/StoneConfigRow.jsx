import React from "react";
import { Box, Typography, Paper, Grid, Radio, RadioGroup, FormControlLabel, Stack, TextField, Checkbox } from "@mui/material";
import { FEED_CONFIGS } from "../utils/feed_configs";
import { SettingRow } from "./SettingRow";

const StoneConfigRow = ({ stone, stoneConfig, onUpdate }) => {
    if (!stone.enabled) return null;

    const handleFeedTypeChange = (newFeedType) => {
        let newFeedConfig = {};
        if (newFeedType === "VDB") {
            newFeedConfig = { api_key: "", access_token: "" };
        } else if (newFeedType === "Nivoda") {
            newFeedConfig = { username: "", password: "" };
        } else if (newFeedType === "The Diamond Port") {
            newFeedConfig = { api_key: "" };
        }

        const updatedStones = stoneConfig.stone_types.map(s =>
            s.id === stone.id ? {
                ...s,
                feed_type: newFeedType,
                feed_config: newFeedConfig,
                forward_order: newFeedType === "CSV" ? false : s.forward_order
            } : s
        );
        onUpdate("stone_config.stone_types", updatedStones);
    };

    const handleFieldChange = (fieldKey, value) => {
        const updatedStones = stoneConfig.stone_types.map(s =>
            s.id === stone.id ? {
                ...s,
                feed_config: { ...s.feed_config, [fieldKey]: value }
            } : s
        );
        onUpdate("stone_config.stone_types", updatedStones);
    };

    const handleForwardOrderToggle = (checked) => {
        const updatedStones = stoneConfig.stone_types.map(s =>
            s.id === stone.id ? { ...s, forward_order: checked } : s
        );
        onUpdate("stone_config.stone_types", updatedStones);
    };

    const config = FEED_CONFIGS[stone.feed_type];

    return (
        <Box sx={{ mt: 3 }}>
            <SettingRow
                title={`${stone.label} Feed Configuration`}
                subtitle={`Set up feed options for ${stone.label.toLowerCase()}.`}
                isTopAligned={true}
            >
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                        Choose your {stone.label} feed type:
                    </Typography>

                    <RadioGroup
                        value={stone.feed_type || "CSV"}
                        onChange={(e) => handleFeedTypeChange(e.target.value)}
                    >
                        <Grid container spacing={1}>
                            {["CSV", "VDB", "Nivoda", "The Diamond Port"].map((type) => (
                                <Grid item xs={6} key={type}>
                                    <FormControlLabel value={type} control={<Radio size="small" />} label={type} />
                                </Grid>
                            ))}
                        </Grid>
                    </RadioGroup>

                    {config && (
                        <Box sx={{ mt: 3, pt: 3, borderTop: "1px dashed #e0e0e0" }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
                                {config.title}
                            </Typography>
                            <Stack spacing={2}>
                                <Grid container spacing={2}>
                                    {config.fields?.map((field) => (
                                        <Grid item xs={12} sm={field.sm} key={field.key}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                label={field.label}
                                                value={stone.feed_config?.[field.key] || ""}
                                                onChange={(e) => handleFieldChange(field.key, e.target.value)}
                                                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5 } }}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                                {stone.feed_type !== "CSV" && (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                size="small"
                                                checked={stone.forward_order || false}
                                                onChange={(e) => handleForwardOrderToggle(e.target.checked)}
                                            />
                                        }
                                        label="Forward Order to API Provider"
                                    />
                                )}
                            </Stack>
                        </Box>
                    )}
                </Paper>
            </SettingRow>
        </Box>
    );
};

export default StoneConfigRow;

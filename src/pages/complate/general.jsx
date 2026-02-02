import React from "react";
import { Box, Typography, Paper, Grid, Checkbox, FormControlLabel, Radio, RadioGroup, Stack, Divider, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import RichTextEditor from "../../components/RichTextEditor";
import { updateSettingByPath } from "../../redux/settingsSlice";
import SettingSection from "../../components/SettingSection";
import FeatureIconItem from "../../components/FeatureIconItem";
import FileUploadIcon from '@mui/icons-material/FileUpload';

const General = () => {
    const dispatch = useDispatch();
    const settings = useSelector((state) => state.settings.settings);
    const generalSettings = settings?.general;
    const stoneConfig = generalSettings?.stone_config;

    const handleUpdate = (path, value) => {
        dispatch(
            updateSettingByPath({
                path: `general.${path}`,
                value: value,
            })
        );
    };

    const handleToggleStone = (id) => {
        const updatedStones = stoneConfig?.stone_types?.map(stone =>
            stone.id === id ? { ...stone, enabled: !stone.enabled } : stone
        );
        handleUpdate("stone_config.stone_types", updatedStones);
    };

    const handleFeedTypeChange = (id, newFeedType) => {
        const updatedStones = stoneConfig?.stone_types?.map(stone =>
            stone.id === id ? { ...stone, feed_type: newFeedType } : stone
        );
        handleUpdate("stone_config.stone_types", updatedStones);
    };

    const handleFeatureUpdate = (id, newValue) => {
        const updatedFeatures = generalSettings.features.map((f) =>
            f.id === id ? { ...f, text: newValue } : f
        );

        handleUpdate("features", updatedFeatures);
    };

    return (
        <Box sx={{ p: 1 }}>
            <SettingSection title="Feature Title" subtitle="Display title for general features">
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <RichTextEditor
                        value={generalSettings?.feature_title || ""}
                        onChange={(val) => handleUpdate("feature_title", val)}
                    />
                </Paper>
            </SettingSection>

            <Divider sx={{ mb: 1 }} />

            <SettingSection title="Features">
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Stack spacing={2}>
                        {generalSettings?.features?.map((feature) => (
                            <FeatureIconItem
                                key={feature.id}
                                feature={feature}
                                onUpdate={(val) => {
                                    const updated = generalSettings.features.map(f => f.id === feature.id ? { ...f, text: val } : f);
                                    handleUpdate("features", updated);
                                }}
                            />
                        ))}
                    </Stack>
                </Paper>
            </SettingSection>

            <Divider sx={{ mb: 1 }} />

            <SettingSection
                title="Stone Types"
                subtitle="Enable or disable stone categories"
            >
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Stack direction="row" spacing={2}>
                        {stoneConfig?.stone_types?.map((stone) => (
                            <FormControlLabel
                                key={stone.id}
                                control={
                                    <Checkbox
                                        checked={stone.enabled || false}
                                        onChange={() => handleToggleStone(stone.id)}
                                        color="primary"
                                    />
                                }
                                label={stone.label}
                            />
                        ))}
                    </Stack>
                </Paper>
            </SettingSection>

            {stoneConfig?.stone_types?.map((stone) =>
                stone.enabled && (
                    <SettingSection
                        key={stone.id}
                        title={`${stone.label} Feed Configuration`}
                        subtitle={`Set up feed options for ${stone.label.toLowerCase()}.`}
                    >
                        <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                                Choose your {stone.label} feed type:
                            </Typography>
                            <RadioGroup
                                value={stone.feed_type || "CSV"}
                                onChange={(e) => handleFeedTypeChange(stone.id, e.target.value)}
                            >
                                <Grid container spacing={1}>
                                    {["CSV", "VDB", "Nivoda", "The Diamond Port"].map((type) => (
                                        <Grid item xs={6} key={type}>
                                            <FormControlLabel
                                                value={type}
                                                control={<Radio size="small" />}
                                                label={type}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </RadioGroup>
                        </Paper>
                    </SettingSection>
                )
            )}

            <SettingSection title="Global Display Options">
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={stoneConfig?.show_certificate ?? true}
                                onChange={(e) => handleUpdate("stone_config.show_certificate", e.target.checked)}
                                color="primary"
                            />
                        }
                        label="Show certificate globally for all stones?"
                    />
                </Paper>
            </SettingSection>

            <Grid container alignItems="flex-start" sx={{ mb: 4 }}>
                <Grid item xs={12} md={4}>
                    <Typography fontWeight="bold">Feature Title</Typography>
                    <Typography variant="caption" color="textSecondary">Display title for general features</Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                        <RichTextEditor
                            value={generalSettings?.feature_title || ""}
                            onChange={(val) => handleUpdate("feature_title", val)}
                        />
                    </Paper>
                </Grid>
            </Grid>

            <Grid container alignItems="center" sx={{ mb: 4 }}>
                <Grid item xs={12} md={4}>
                    <Typography fontWeight="bold">Stone Types</Typography>
                    <Typography variant="body2" color="textSecondary">Enable or disable stone categories</Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                        <Stack direction="row" spacing={2}>
                            {stoneConfig?.stone_types?.map((stone) => (
                                <FormControlLabel
                                    key={stone.id}
                                    control={
                                        <Checkbox
                                            checked={stone.enabled || false}
                                            onChange={() => handleToggleStone(stone.id)}
                                            color="primary"
                                        />
                                    }
                                    label={stone.label}
                                />
                            ))}
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container alignItems="flex-start" sx={{ mb: 4 }}>
                <Grid item xs={12} md={4}>
                    <Typography fontWeight="bold">Features</Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                        <Stack spacing={2}>
                            {generalSettings?.features?.map((feature) => (
                                <Box
                                    key={feature.id}
                                    sx={{ display: "flex", alignItems: "center", gap: 2, py: 1 }}>
                                   <Box
                                        sx={{
                                            position: "relative",
                                            width: 45,
                                            height: 45,
                                            borderRadius: 1,
                                            border: "1px solid #e0e0e0",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "pointer",
                                            overflow: "hidden",
                                            bgcolor: "#f9f9f9",
                                            "&:hover .upload-overlay": {
                                                opacity: 1,
                                            }
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={feature.url}
                                            alt="icon"
                                            sx={{ width: 30, height: 30, objectFit: "contain" }}
                                        />
                                        <Box
                                            className="upload-overlay" // Class name for selector
                                            sx={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                width: "100%",
                                                height: "100%",
                                                bgcolor: "rgba(0, 0, 0, 0.5)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                opacity: 0, // Default hidden
                                                transition: "opacity 0.2s ease-in-out",
                                                color: "white"
                                            }}
                                        >
                                            <FileUploadIcon sx={{ fontSize: 20 }} />
                                        </Box>
                                    </Box>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        value={feature.text || ""}
                                        onChange={(e) => handleFeatureUpdate(feature.id, e.target.value)}
                                    />
                                </Box>
                            ))}
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>

            {stoneConfig?.stone_types?.map((stone) =>
                stone.enabled && (
                    <Grid container sx={{ mb: 3 }} key={stone.id}>
                        <Grid item xs={12} md={4}>
                            <Typography fontWeight="bold">{stone.label} Feed Configuration</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Set up feed options for {stone.label.toLowerCase()}.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                                    Choose your {stone.label} feed type:
                                </Typography>
                                <RadioGroup
                                    value={stone.feed_type || "CSV"}
                                    onChange={(e) => handleFeedTypeChange(stone.id, e.target.value)}
                                >
                                    <Grid container spacing={1}>
                                        {["CSV", "VDB", "Nivoda", "The Diamond Port"].map((type) => (
                                            <Grid item xs={6} key={type}>
                                                <FormControlLabel
                                                    value={type}
                                                    control={<Radio size="small" />}
                                                    label={type}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </RadioGroup>
                            </Paper>
                        </Grid>
                    </Grid>
                )
            )}

            <Grid container alignItems="center" sx={{ mb: 2 }}>
                <Grid item xs={12} md={4}>
                    <Typography fontWeight="bold">Global Display Options</Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={stoneConfig?.show_certificate ?? true}
                                    onChange={(e) => handleUpdate("stone_config.show_certificate", e.target.checked)}
                                    color="primary"
                                />
                            }
                            label="Show certificate globally for all stones?"
                        />
                    </Paper>
                </Grid>
            </Grid>

        </Box>
    );
};

export default General;

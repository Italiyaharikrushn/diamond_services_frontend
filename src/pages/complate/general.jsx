import React from "react";
import { Box, Paper, Checkbox, FormControlLabel, Stack, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateSettingByPath } from "../../redux/settingsSlice";

import RichTextEditor from "../../components/RichTextEditor";
import FeatureIconItem from "../../components/FeatureIconItem";
import { SettingRow } from "../../components/SettingRow";
import StoneConfigRow from "../../components/StoneConfigRow";

const General = () => {
    const dispatch = useDispatch();
    const settings = useSelector((state) => state.settings.settings);
    const generalSettings = settings?.general;
    const stoneConfig = generalSettings?.stone_config;

    const handleUpdate = (path, value) => {
        dispatch(updateSettingByPath({ path: `general.${path}`, value }));
    };

    const handleToggleStone = (id) => {
        const updatedStones = stoneConfig?.stone_types?.map(stone =>
            stone.id === id ? { ...stone, enabled: !stone.enabled } : stone
        );
        handleUpdate("stone_config.stone_types", updatedStones);
    };

    return (
        <Box>
            <SettingRow
                title="Feature Title"
                subtitle="Display title for general features"
                isTopAligned={true}
            >
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                    <RichTextEditor
                        value={generalSettings?.feature_title || ""}
                        onChange={(val) => handleUpdate("feature_title", val)}
                    />
                </Paper>
            </SettingRow>

            <Divider sx={{ mb: 3, my: 3 }} />

            <SettingRow title="Features" isTopAligned={true}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Stack spacing={2}>
                        {generalSettings?.features?.map((feature) => (
                            <FeatureIconItem
                                features={feature}
                                onUpdateText={(text) => {
                                    const updated = generalSettings.features.map(f =>
                                        f.id === feature.id ? { ...f, text } : f
                                    );
                                    handleUpdate("features", updated);
                                }}
                                onUpdateIcon={(url) => {
                                    const updated = generalSettings.features.map(f =>
                                        f.id === feature.id ? { ...f, url } : f
                                    );
                                    handleUpdate("features", updated);
                                }}
                            />

                        ))}
                    </Stack>
                </Paper>
            </SettingRow>

            <Divider sx={{ mb: 3, my: 3 }} />

            <SettingRow
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
            </SettingRow>

            {stoneConfig?.stone_types?.map((stone) =>
                <StoneConfigRow 
                    key={`config-${stone.id}`} 
                    stone={stone} 
                    stoneConfig={stoneConfig} 
                    onUpdate={handleUpdate} 
                />
            )}

            <Divider sx={{ my: 3 }} />

            <SettingRow title="Global Display Options">
                <Paper variant="outlined" sx={{ p: 1, borderRadius: 2 }}>
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
            </SettingRow>

        </Box>
    );
};

export default General;

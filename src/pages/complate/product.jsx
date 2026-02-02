import React, { useState } from "react";
import { DropdownIcon } from "../../components/dropdown";
import RichTextEditor from "../../components/RichTextEditor";
import SortableList from "../../components/SortableList";
import { Box, Typography, Paper, Checkbox, FormControlLabel, Grid, Stack, TextField, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateSettingByPath } from "../../redux/settingsSlice";

const Products = () => {
    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(true);

    const settings = useSelector((state) => state.settings.settings);
    const ringSettings = settings?.ring;

    const handleUpdate = (path, value) => {
        dispatch(
            updateSettingByPath({
                path: `ring.${path}`,
                value: value,
            })
        );
    };

    const handleMetalReorder = (newOrder) => handleUpdate("metals", newOrder);
    const handleMetalCheckbox = (id) => {
        const updatedMetals = ringSettings?.metals?.map(m => 
            m.id === id ? { ...m, enabled: !m.enabled } : m
        );
        handleUpdate("metals", updatedMetals);
    };

    const handleStyleReorder = (newOrder) => handleUpdate("styles", newOrder);
    const handleStyleCheckbox = (id) => {
        const updatedStyles = ringSettings?.styles?.map(s => 
            s.id === id ? { ...s, enabled: !s.enabled } : s
        );
        handleUpdate("styles", updatedStyles);
    };

    const handleFilterToggle = (id) => {
        const updatedFilters = ringSettings?.filters?.map(f => 
            f.id === id ? { ...f, enabled: !f.enabled } : f
        );
        handleUpdate("filters", updatedFilters);
    };

    const handleFilterValueChange = (id, field, value) => {
        const updatedFilters = ringSettings?.filters?.map((filter) => {
            if (filter.id !== id) return filter;

            if (Array.isArray(filter.values)) {
                return { ...filter, values: value };
            }

            if (typeof filter.values === "object" && filter.values !== null) {
                return {
                    ...filter,
                    values: { ...filter.values, [field]: value },
                };
            }
            return filter;
        });
        handleUpdate("filters", updatedFilters);
    };

    return (
        <Box>
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
                    Product Settings (Ring Builder)
                </Typography>
                <DropdownIcon isExpanded={isExpanded} />
            </Paper>

            {isExpanded && (
                <Stack spacing={4}>
                    <Grid container>
                        <Grid item xs={12} md={4}>
                            <Typography fontWeight="bold">Page Title</Typography>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                                <RichTextEditor 
                                    value={ringSettings?.page_title || ""} 
                                    onChange={(val) => handleUpdate("page_title", val)}
                                />
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={12} md={4}>
                            <Typography fontWeight="bold">Metals Options</Typography>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <SortableList
                                items={ringSettings?.metals || []}
                                onReorder={handleMetalReorder}
                                onCheckboxChange={handleMetalCheckbox}
                            />
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={12} md={4}>
                            <Typography fontWeight="bold">Style Options</Typography>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <SortableList
                                items={ringSettings?.styles || []}
                                onReorder={handleStyleReorder}
                                onCheckboxChange={handleStyleCheckbox}
                            />
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={12} md={4}>
                            <Typography fontWeight="bold">Add to Cart Settings</Typography>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox 
                                            checked={ringSettings?.show_add_to_cart || false} 
                                            onChange={(e) => handleUpdate("show_add_to_cart", e.target.checked)} 
                                        />
                                    }
                                    label="Do you want to show add to cart on listing page?"
                                />
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={12} md={4}>
                            <Typography fontWeight="bold">Filters</Typography>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Stack spacing={2}>
                                {ringSettings?.filters?.map((filter) => (
                                    <Paper key={filter.id} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <Typography fontWeight="600">{filter.label}</Typography>
                                            <Switch
                                                checked={filter.enabled}
                                                onChange={() => handleFilterToggle(filter.id)}
                                                color="primary"
                                                size="small"
                                            />
                                        </Box>

                                        {filter.enabled && filter.values && !Array.isArray(filter.values) && (
                                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        label="Min Price"
                                                        type="number"
                                                        fullWidth
                                                        size="small"
                                                        value={filter.values.min}
                                                        onChange={(e) => handleFilterValueChange(filter.id, 'min', e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        label="Max Price"
                                                        type="number"
                                                        fullWidth
                                                        size="small"
                                                        value={filter.values.max}
                                                        onChange={(e) => handleFilterValueChange(filter.id, 'max', e.target.value)}
                                                    />
                                                </Grid>
                                            </Grid>
                                        )}

                                        {filter.enabled && Array.isArray(filter.values) && (
                                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        label={filter.label}
                                                        size="small"
                                                        fullWidth
                                                        value={filter.values.join(", ")}
                                                        onChange={(e) =>
                                                            handleFilterValueChange(
                                                                filter.id,
                                                                null,
                                                                e.target.value.split(",").map(v => v.trim())
                                                            )
                                                        }
                                                    />
                                                </Grid>
                                            </Grid>
                                        )}
                                    </Paper>
                                ))}
                            </Stack>
                        </Grid>
                    </Grid>
                </Stack>
            )}
        </Box>
    );
}

export default Products;

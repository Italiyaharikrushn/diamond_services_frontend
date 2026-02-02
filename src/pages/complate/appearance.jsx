import React from "react";
import RichTextEditor from "../../components/RichTextEditor";
import { DropdownIcon } from "../../components/dropdown";
import { Box, Typography, Paper, Checkbox, FormControlLabel, Grid, Radio, RadioGroup, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateSettingByPath } from "../../redux/settingsSlice";

const Appearance = () => {
    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = React.useState(true);

    const settings = useSelector((state) => state.settings.settings);

    const listingPage = settings?.stone_appearance?.listing_page;
    const viewPage = settings?.stone_appearance?.view_page;

    const handleUpdate = (path, value) => {
        dispatch(
            updateSettingByPath({
                path: path,
                value: value,
            })
        );
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
                    Stone Listing Page Settings
                </Typography>
                <DropdownIcon isExpanded={isExpanded} />
            </Paper>

            {isExpanded && (
                <Stack spacing={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Typography fontWeight="bold">Page Title</Typography>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                                <RichTextEditor
                                    value={listingPage?.page_title || ""}
                                    onChange={(newValue) => handleUpdate("stone_appearance.listing_page.page_title", newValue)}
                                    minHeight={60}
                                />
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Typography fontWeight="bold">Stone Title</Typography>
                            <Typography variant="caption" color="text.secondary">Template: {'{carat} Carat {shape}...'}</Typography>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                                <RichTextEditor
                                    value={viewPage?.stone_title || ""}
                                    onChange={(newValue) => handleUpdate("stone_appearance.view_page.stone_title", newValue)}
                                    minHeight={80}
                                />
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Typography fontWeight="bold">View Options</Typography>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                                <Stack spacing={1}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={viewPage?.show_add_to_cart || false}
                                                onChange={(e) => handleUpdate("stone_appearance.view_page.show_add_to_cart", e.target.checked)}
                                            />
                                        }
                                        label="Show Add to Cart"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={viewPage?.show_certificate || false}
                                                onChange={(e) => handleUpdate("stone_appearance.view_page.show_certificate", e.target.checked)}
                                            />
                                        }
                                        label="Show Certificate"
                                    />
                                </Stack>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Typography fontWeight="bold">Default View</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Select how stones are displayed by default.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                                <RadioGroup 
                                    value={listingPage?.default_view || "grid"} 
                                    onChange={(e) => handleUpdate("stone_appearance.listing_page.default_view", e.target.value)}
                                >
                                    <FormControlLabel value="grid" control={<Radio />} label="Grid View" />
                                    <FormControlLabel value="list" control={<Radio />} label="List View" />
                                </RadioGroup>
                            </Paper>
                        </Grid>
                    </Grid>
                </Stack>
            )}
        </Box>
    );
};

export default Appearance;

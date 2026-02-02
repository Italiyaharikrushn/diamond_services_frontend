import React, { useState } from "react";
import { DropdownIcon } from "../../components/dropdown";
import { Box, Typography, Paper, Grid } from "@mui/material";
import SortableList from "../../components/SortableList";
import { useDispatch, useSelector } from "react-redux";
import { updateSettingByPath } from "../../redux/settingsSlice";

const Gemstones = () => {
    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(true);

    const settings = useSelector((state) => state.settings.settings)
    const shape = settings?.gemstone?.shapes;

    const handleReorder = (newOrder) => {
        dispatch(
            updateSettingByPath({
                path: "gemstone.shapes",
                value: newOrder,
            })
        );
    };

    const handleCheckboxChange = (id) => {
        const updatedShapes = shape.map((shape) =>
            shape.id === id ? { ...shape, enabled: !shape.enabled } : shape
        );
        dispatch(
            updateSettingByPath({
                path: "gemstone.shapes",
                value: updatedShapes,
            })
        );
    };

    const handleDelete = (id) => {
        const filteredShapes = shape.filter((shape) => shape.id !== id);
        dispatch(
            updateSettingByPath({
                path: "gemstone.shapes",
                value: filteredShapes,
            })
        );
    };

    return (
        <Box>
            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    mb: 3,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    borderBottom: '1px solid #eee'
                }}
                onClick={() => setIsExpanded(prev => !prev)}
            >
                <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                    Gemstone Shapes
                </Typography>
                <DropdownIcon isExpanded={isExpanded} />
            </Paper>

            {isExpanded && (
                <>
                    <Grid container spacing={2} alignItems="flex-start">
                        <Grid item xs={12} md={4}>
                            <Typography fontWeight="bold" md={1}>
                                Choose Options
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={8} sx={{ gap: 2, display: "flex", flexDirection: "column" }}>
                            <SortableList
                                items={shape}
                                onReorder={handleReorder}
                                onCheckboxChange={handleCheckboxChange}
                                onDelete={handleDelete}
                            />
                        </Grid>
                    </Grid>
                </>
            )}
        </Box>
    );
};

export default Gemstones;

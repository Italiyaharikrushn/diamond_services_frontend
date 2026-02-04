import React, { useState } from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import { DropdownIcon } from "../../components/dropdown";
import SortableList from "../../components/SortableList";
import { SettingRow } from "../../components/SettingRow";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

// Hooks & Components
import ImageEditDialog from "../../components/ImageEditDialog";
import FilterSection from "../../components/FilterSection";
import { useSettingsManager } from "../../utils/useSettingsManager";

const Gemstones = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const {
        settings, handleUpdate, openDialog, setOpenDialog,
        newUrl, setNewUrl, handleEditImage, saveImageUrl
    } = useSettingsManager("gemstone");

    const shape = settings?.gemstone?.shapes || [];
    const type = settings?.gemstone?.types || [];
    const filters = settings?.gemstone?.filters || [];

    // Filter value change handler for Gemstones (Simple array)
    const onFilterValueChange = (id, field, value) => {
        const updatedFilters = filters.map((filter) => {
            if (filter.id !== id) return filter;
            const newVals = Array.isArray(filter.values)
                ? (typeof value === "string" ? value.split(",").map(v => v.trim()) : value)
                : { ...filter.values, [field]: value === "" ? "" : Number(value) };
            return { ...filter, values: newVals };
        });
        handleUpdate("gemstone.filters", updatedFilters);
    };

    const ShapeItem = ({ item, onEdit }) => (
        <Box display="flex" alignItems="center" gap={2}>
            <Box
                sx={{
                    position: 'relative', width: 40, height: 40, cursor: 'pointer',
                    border: '1px solid #e0e0e0', borderRadius: 1, overflow: 'hidden',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    '&:hover .image-overlay': { opacity: 1 }
                }}
                onClick={onEdit}
            >
                <img
                    src={item.image || item.url}
                    alt={item.label}
                    style={{ width: '28px', height: '28px', objectFit: 'contain' }}
                />
                <Box
                    className="image-overlay"
                    sx={{
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                        bgcolor: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center',
                        opacity: 0, transition: '0.3s'
                    }}
                >
                    <PhotoCameraIcon sx={{ color: 'white', fontSize: '1rem' }} />
                </Box>
            </Box>
            <Typography sx={{ fontSize: '0.95rem' }}>{item.label}</Typography>
        </Box>
    );

    return (
        <Box>
            <Paper
                elevation={0}
                sx={{ p: 2, mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", borderBottom: '1px solid #eee' }}
                onClick={() => setIsExpanded(prev => !prev)}
            >
                <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>Gemstone Settings</Typography>
                <DropdownIcon isExpanded={isExpanded} />
            </Paper>

            {isExpanded && (
                <Box>
                    <SettingRow title="Gemstone Shapes" subtitle="Manage gemstone shapes and order." isTopAligned={true}>
                        <SortableList
                            items={shape}
                            onReorder={(newOrder) => handleUpdate("gemstone.shapes", newOrder)}
                            onCheckboxChange={(id) => handleUpdate("gemstone.shapes", shape.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s))}
                            renderItem={(item) => <ShapeItem item={item} onEdit={() => handleEditImage(item)} />}
                        />
                    </SettingRow>

                    <Divider sx={{ my: 4 }} />

                    <SettingRow title="Gemstone Types" subtitle="Manage types and order." isTopAligned={true}>
                        <SortableList
                            items={type}
                            onReorder={(newOrder) => handleUpdate("gemstone.types", newOrder)}
                            onCheckboxChange={(id) => handleUpdate("gemstone.types", type.map(t => t.id === id ? { ...t, enabled: !t.enabled } : t))}
                        />
                    </SettingRow>

                    <Divider sx={{ my: 4 }} />

                    <SettingRow title="Gemstone Filters" subtitle="Manage price and attribute filters" isTopAligned={true}>
                        <FilterSection
                            filters={filters}
                            onToggle={(id) => handleUpdate("gemstone.filters", filters.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f))}
                            onValueChange={onFilterValueChange}
                        />
                    </SettingRow>
                </Box>
            )}

            <ImageEditDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                url={newUrl}
                onUrlChange={setNewUrl}
                onSave={() => saveImageUrl("shapes", shape)}
            />
        </Box>
    );
};

export default Gemstones;

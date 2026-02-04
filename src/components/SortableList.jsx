import React from 'react';
import { Box, Typography, Paper, Stack, Checkbox, IconButton } from "@mui/material";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({ id, shape, onCheckboxChange, renderItem }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 2 : 1,
        opacity: isDragging ? 0.6 : 1,
    };

    return (
        <Paper
            ref={setNodeRef}
            style={style}
            variant="outlined"
            sx={{
                p: 1.5, px: 2,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                borderStyle: "dashed", borderColor: isDragging ? "primary.main" : "#ccc",
                borderRadius: 2, bgcolor: "#fff",
                "&:hover": { borderColor: "#999" }
            }}
        >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ flexGrow: 1 }}>
                <Checkbox
                    checked={shape.enabled}
                    onChange={() => onCheckboxChange(shape.id)}
                    color="primary"
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                />
                {renderItem ? (
                    renderItem(shape)
                ) : (
                    <Typography sx={{ fontSize: '0.95rem', color: '#333' }}>
                        {shape.label}
                    </Typography>
                )}
            </Stack>

            <Stack direction="row" alignItems="center" spacing={2}>
                {!renderItem && (
                    <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 1, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={shape.image || shape.url} alt={shape.label} style={{ width: '24px', height: '24px' }} />
                    </Box>
                )}
                <IconButton size="small" {...attributes} {...listeners} sx={{ color: '#999', cursor: 'grab' }}>
                    <DragIndicatorIcon fontSize="small" />
                </IconButton>
            </Stack>
        </Paper>
    );
};

const SortableList = ({ items, onReorder, onCheckboxChange, renderItem }) => {
    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = items.findIndex((i) => i.id === active.id);
            const newIndex = items.findIndex((i) => i.id === over.id);
            onReorder(arrayMove(items, oldIndex, newIndex));
        }
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
                <Stack spacing={2}>
                    {items.map((item) => (
                        <SortableItem
                            key={item.id}
                            id={item.id}
                            shape={item}
                            onCheckboxChange={onCheckboxChange}
                            renderItem={renderItem}
                        />
                    ))}
                </Stack>
            </SortableContext>
        </DndContext>
    );
};

export default SortableList;

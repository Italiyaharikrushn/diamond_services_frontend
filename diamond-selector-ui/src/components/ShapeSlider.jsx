import { useEffect, useState } from "react";
import { useSlider } from "../hooks/useSlider";
import { useSettings } from "../hooks/useSettings";
import { Box, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const ShapeSlider = ({ stoneOrigin, onChange }) => {
    const storeId = "test-store.myshopify.com";
    const { settings } = useSettings(storeId);
    const [selectedId, setSelectedId] = useState([]);

    const isGemstone = stoneOrigin === "gemstones";
    const diamondShapes = settings?.diamond?.shapes || [];
    const gemstoneTypes = settings?.gemstone?.types || [];
    const currentFilters = isGemstone ? gemstoneTypes : diamondShapes;

    const { scrollRef, showButtons, scroll } = useSlider([currentFilters, stoneOrigin]);

    useEffect(() => {
        setSelectedId([]);
        if (onChange) onChange([]);
    }, [stoneOrigin]);

    const handleSelect = (item) => {
        const newSelection = selectedId.includes(item.id) ? selectedId.filter((id) => id !== item.id) : [...selectedId, item.id];

        setSelectedId(newSelection);
        if (onChange) {
            const selectedLabels = currentFilters.filter(f => newSelection.includes(f.id)).map(f => f.label);
            onChange(selectedLabels);
        }
    };

    return (
        <Box sx={{ position: "relative", width: "100%" }}>
            {showButtons && (
                <IconButton
                    onClick={() => scroll("left")}
                    sx={{
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 2,
                        bgcolor: "white",
                        boxShadow: 1,
                    }}
                >
                    <ChevronLeftIcon />
                </IconButton>
            )}
            <Box
                ref={scrollRef}
                sx={{
                    display: "flex",
                    gap: { xs: 2, sm: 3, md: 4 },
                    height: 100,
                    alignItems: "center",
                    justifyContent: "space-between",
                    overflowX: "auto",
                    scrollBehavior: "smooth",
                    flexWrap: "nowrap",

                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                }}
            >
                {currentFilters.map((item) => {
                    const isSelected = selectedId.includes(item.id);
                    return (
                        <Box
                            key={item.id} onClick={() => handleSelect(item)}
                            sx={{
                                minWidth: 80,
                                textAlign: "center",
                                cursor: "pointer",
                                padding: "8px",
                                borderRadius: "var(--ds-border-radius)",
                                transition: "all 0.3s ease",
                                border: isSelected ? "2px solid var(--ds-primary-color)" : "2px solid transparent",
                            }}
                        >
                            <img src={item.url} width={40} />
                            <div style={{ fontSize: 14, color: isSelected ? "var(--ds-primary-color)" : "black" }}>{item.label}</div>
                        </Box>
                    )
                })}
            </Box>

            {showButtons && (
                <IconButton
                    onClick={() => scroll("right")}
                    sx={{
                        position: "absolute",
                        right: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 2,
                        bgcolor: "white",
                        boxShadow: 1,
                    }}
                >
                    <ChevronRightIcon />
                </IconButton>
            )}
        </Box>
    )
}

export default ShapeSlider;

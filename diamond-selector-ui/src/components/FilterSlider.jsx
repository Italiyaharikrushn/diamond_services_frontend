import { useRef } from "react";
import { useSettings } from "../hooks/useSettings";
import { Box, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const FilterSlider = ({stoneOrigin }) => {
    const storeId = "test-store.myshopify.com";
    const { settings } = useSettings(storeId)
    const scrollRef = useRef(null);
    const isGemstone = stoneOrigin === "gemstones";
    const diamondShapes = settings?.diamond?.shapes || [];
    const gemstoneTypes = settings?.gemstone?.types || [];
    const currentFilters = isGemstone ? gemstoneTypes : diamondShapes;
    const showArrows = currentFilters.length > 10;

    const scroll = (direction) => {
        const amount = direction === "left" ? -200 : 200;
        scrollRef.current.scrollBy({
            left: amount,
            behavior: "smooth",
        });
    };
    return (
        <Box sx={{ position: "relative", width: "100%", mt: 2 }}>
            {/* Left Arrow */}
            {showArrows && (
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
                </IconButton>)}

            {/* Scroll Container */}
            <Box
                ref={scrollRef}
                sx={{
                    padding: 2,
                    display: "flex",
                    gap: { xs: 2, sm: 3, md: 4 },
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
                {currentFilters.map((item) => (
                    <Box
                        key={item.id}
                        sx={{
                            minWidth: 80,
                            textAlign: "center",
                            cursor: "pointer",
                        }}
                    >
                        <img src={item.url} width={35} />
                        <div style={{ fontSize: 11 }}>{item.label}</div>
                    </Box>
                ))}
            </Box>

            {/* Right Arrow */}
            {showArrows && (<IconButton
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
            </IconButton>)}
        </Box>
    )
}

export default FilterSlider;
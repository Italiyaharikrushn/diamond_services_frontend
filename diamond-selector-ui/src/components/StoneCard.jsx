import React from "react";
import { Typography, Box, Card, CardContent } from "@mui/material";
import ShapeImageMap from "../utils/shapeImageMap";

const StoneCard = ({ item }) => {
    if (!item) return null;

    const getStoneImage = () => {
        if (item.image_source && item.image_source !== "" && item.image_source !== "null") {
            return item.image_source;
        }

        const shapeKey = item.shape?.toLowerCase();
        return ShapeImageMap[shapeKey];
    };

    const handleError = (e) => {
        e.target.src = getFallbackImage();
    };
    const finalImage = getStoneImage();

    return (
        <Card
            sx={{
                borderRadius: "var(--ds-border-radius)",
                border: "1px solid #eee",
                padding: "10px",
                boxShadow: "none",
                "&:hover": {
                    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                },
            }}
        >
            {/* IMAGE */}
            <Box
                sx={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    backgroundColor: "#959da2",
                    borderRadius: "var(--ds-border-radius)",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                }}
            >
                <img
                    component="img"
                    src={item.image_source || finalImage}
                    alt={item.shape}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "opacity 0.3s ease",
                    }}
                />
            </Box>

            {/* CONTENT */}
            <CardContent sx={{ p: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>

                    <Typography fontWeight={600} fontSize="14px">
                        {item?.carat} Carat {item?.shape}
                    </Typography>

                    <Typography fontWeight={600} fontSize="14px">
                        ₹{item?.selling_price}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderTop: "1px solid #eee",
                        pt: 1,
                        textAlign: "center",
                    }}
                >
                    <Spec label="Diamond" value={item?.lab} />
                    <Spec label="Color" value={item?.color} />
                    <Spec label="Clarity" value={item?.clarity} />
                </Box>
            </CardContent>
        </Card>
    );
};

const Spec = ({ label, value }) => (
    <Box>
        <Typography fontSize={13} fontWeight={600}>{value}</Typography>
        <Typography fontSize={12} color="gray">{label}</Typography>
    </Box>
);

export default StoneCard;

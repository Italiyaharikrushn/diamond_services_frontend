import React from "react";
export const IFRAME_URL_PARAMS = "btn=0&sv=0&zoomslide=0&z=0&isBorderRadius=0&autoplay=1&hd=1&show_title=1&show_byline=1&show_portrait=0&fullscreen=1&muted=1&controls=0&portrait=0&loop=1&mute=1&rel=0&modestbranding=1&playsinline=1&thumbnail=0&poster=0&preview=0";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useSingleDiamond } from "../hooks/useSingleDiamond";
import { useSingleGemstone } from "../hooks/useSingleGemstone";
import { useSearchParams } from "react-router-dom";

const DiamondDetails = () => {
    const storeId = "test-store.myshopify.com";
    const [searchParams] = useSearchParams();
    const stoneType = searchParams.get("type");
    const isGemstone = stoneType?.toLowerCase().includes("gemstones");

    const { diamond: diamondData, loading: dLoading } = useSingleDiamond(storeId);
    const { gemstone: gemstoneData, loading: gLoading } = useSingleGemstone(storeId);

    const stone = isGemstone ? gemstoneData : diamondData?.diamond;
    const loading = isGemstone ? gLoading : dLoading;

    const icons = {
        shipping: "../ring-builder/ring-builder-ui/assets/features/shipping.svg",
        diamond: "../ring-builder/ring-builder-ui/assets/features/diamond.svg",
        resize: "../ring-builder/ring-builder-ui/assets/features/resize-ring.svg",
        warranty: "../ring-builder/ring-builder-ui/assets/features/warranty.svg"
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (!stone) return <Typography>No stone found</Typography>;

    const hasMedia = stone.image_source || stone.video_source;

    return (
        <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
                {hasMedia && (
                    <Grid container spacing={2} size={{ xs: 6, md: 8 }}>
                        <Grid item size={{ xs: 6, md: 6 }}>
                            <Box
                                sx={{
                                    height: 420,
                                    borderRadius: "var(--ds-border-radius)",
                                    overflow: "hidden",
                                    background: "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                {stone?.image_source ? (
                                    <img
                                        src={stone.image_source || "/assets/no-image.png"}
                                        alt="Stone"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain"
                                        }}
                                    />
                                ) : (
                                    <Typography>No Image Available</Typography>
                                )}
                            </Box>
                        </Grid>
                        <Grid item size={{ xs: 6, md: 6 }}>
                            <Box
                                sx={{
                                    height: 420,
                                    borderRadius: "var(--ds-border-radius)",
                                    overflow: "hidden",
                                    background: "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <iframe
                                    src={`${stone.video_source}?${IFRAME_URL_PARAMS}`}
                                    allow="autoplay; fullscreen"
                                    scrolling="off"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        border: "none",
                                        objectFit: "cover"
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                )}

                <Grid size={{ xs: 6, md: 4 }}>
                    <Typography variant="h5" fontWeight={400}>
                        {stone.carat} Carat {stone.shape} Diamond
                    </Typography>

                    <Typography sx={{ mt: 1, color: "var(--ds-color)" }}>
                        {stone.carat || "-"} Carat | {stone.color || "-"} Color | {stone.clarity || "-"} Clarity | {stone.cut || "-"} Cut
                    </Typography>

                    <Typography variant="h5" sx={{ mt: 1, fontWeight: 500, fontSize: 30 }}>
                        ${stone.selling_price}
                    </Typography>

                    {/* Buttons */}
                    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                        <Button
                            variant="outlined"
                            fullWidth
                            sx={{
                                borderColor: "var(--ds-primary-color)",
                                color: "var(--ds-primary-color)",
                                "&:hover": {
                                    backgroundColor: "var(--ds-primary-color)",
                                    color: "white",
                                    borderColor: "var(--ds-primary-color)",
                                }
                            }}
                        >
                            Add To Cart
                        </Button>

                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                height: 50,
                                backgroundColor: "var(--ds-primary-color)",
                            }}
                        >
                            Select Diamond
                        </Button>
                    </Box>

                    <Box>
                        <Typography sx={{ mt: 1, color: "var(--ds-color)" }}>
                            We’ve Got You Covered
                        </Typography>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <img src={icons.shipping} width="45" alt="shipping" />
                                <Typography sx={{ color: "var(--ds-color)" }}>
                                    Free Shipping & Returns
                                </Typography>
                            </Grid>

                            <Grid item xs={6} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <img src={icons.resize} width="50" alt="shipping" />
                                <Typography sx={{ color: "var(--ds-color)" }}>
                                    Free Lifetime Warranty
                                </Typography>
                            </Grid>

                            <Grid item xs={6} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <img src={icons.diamond} width="40" alt="shipping" />
                                <Typography sx={{ color: "var(--ds-color)" }}>
                                    Lifetime Diamond Upgrade
                                </Typography>
                            </Grid>

                            <Grid item xs={6} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <img src={icons.warranty} width="38" alt="shipping" />
                                <Typography sx={{ color: "var(--ds-color)" }}>
                                    Free 1-Year Resizing
                                </Typography>
                            </Grid>

                        </Grid>
                    </Box>

                    <Box
                        sx={{
                            mt: 2.5,
                            border: "1px solid #eee",
                            borderRadius: "var(--ds-border-radius)",
                            overflow: "hidden",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                backgroundColor: "#f4f7f6",
                                p: 1.5,
                                borderBottom: "1px solid #eee",
                            }}
                        >
                            <img
                                src={icons.diamond}
                                width="25"
                                alt="diamond"
                                style={{ display: "block" }}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    color: "var(--ds-primary-color)",
                                    fontSize: "1.1rem",
                                    lineHeight: 1
                                }}
                            >
                                Diamond Information
                            </Typography>
                        </Box>

                        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
                            <InfoRow label="Carat" value={stone.carat} />
                            <InfoRow label="Shape" value={stone.shape} />
                            <InfoRow label="Color" value={stone.color} />
                            <InfoRow label="Clarity" value={stone.clarity} />
                            <InfoRow label="Cut" value={stone.cut || "-"} />
                            <InfoRow label="Lab" value={stone.lab} />
                            <InfoRow label="Fluorescence" value={stone.fluorescence} />
                        </Box>
                    </Box>
                </Grid>

            </Grid>
        </Box>
    );
};

const InfoRow = ({ label, value }) => (
    <Box
        sx={{
            display: "flex",
            justifyContent: "space-between",
        }}
    >
        <Typography color="#666">{label}</Typography>
        <Typography fontWeight={600}>{value}</Typography>
    </Box>
);

export default DiamondDetails;

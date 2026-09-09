import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { useSettings } from "../hooks/useSettings";

const FeatureIcons = () => {
    const storeId = "test-store.myshopify.com";
    const { settings, isLoading } = useSettings(storeId);
    
    const features = settings?.general?.features || [];

    if (isLoading) {
        return <Typography>Loading features...</Typography>;
    }

    if (!features || features.length === 0) {
        return <Typography>No features available</Typography>;
    }

    return (
        <Box sx={{ mt: 2 }}>
            <Typography sx={{ mb: 1.5, color: "var(--ds-color)", fontWeight: 500 }}>
                We’ve Got You Covered
            </Typography>
            <Grid container spacing={2}>
                {features.map((item) => (
                    <Grid item xs={6} key={item.id} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Box sx={{ width: 50, display: 'flex', justifyContent: 'center' }}>
                            <img src={item.url} width={item.width || "45"} alt={item.text} />
                        </Box>
                        <Typography sx={{ color: "var(--ds-color)", fontSize: "0.85rem", lineHeight: 1.2 }}>
                            {item.text}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default FeatureIcons;

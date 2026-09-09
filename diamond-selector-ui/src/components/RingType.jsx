import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { useSettings } from "../hooks/useSettings";

const RingType = () => {
    const storeId = "test-store.myshopify.com";
    const { settings, isLoading } = useSettings(storeId);
    
    const features = settings?.ring?.styles || [];
    console.log("Fetched features:", features);

    if (isLoading) {
        return <Typography>Loading features...</Typography>;
    }

    if (!features || features.length === 0) {
        return <Typography>No features available</Typography>;
    }

    return (
        <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
                {features.map((item) => (
                    <Grid item xs={6} key={item.id} sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <Box sx={{ width: "100%", display: 'flex', justifyContent: 'center' }}>
                            <img src={item.url} width={"90"} alt={item.text} />
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

export default RingType;

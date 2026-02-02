import React from "react";
import { Grid, Typography } from "@mui/material";

const SettingSection = ({ title, subtitle, children, mb = 1, alignItems = "flex-start" }) => (
    <Grid container alignItems={alignItems} sx={{ mb }}>
        <Grid item xs={12} md={4}>
            <Typography fontWeight="bold">{title}</Typography>
            {subtitle && (
                <Typography variant="caption" color="textSecondary">
                    {subtitle}
                </Typography>
            )}
        </Grid>
        <Grid item xs={12} md={8}>
            {children}
        </Grid>
    </Grid>
);

export default SettingSection;

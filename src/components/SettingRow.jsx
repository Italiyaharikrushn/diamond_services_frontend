import React from "react";
import { Grid, Typography } from "@mui/material";

export const SettingRow = ({ title, subtitle, children, isTopAligned = false }) => {
    return (
        <Grid container alignItems={isTopAligned ? "flex-start" : "center"}>
            <Grid item xs={12} md={4}>
                <Typography fontWeight="bold" sx={{ fontSize: "0.95rem" }}>
                    {title}
                </Typography>
                {subtitle && (
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
                        {subtitle}
                    </Typography>
                )}
            </Grid>

            <Grid item xs={12} md={8}>
                {children}
            </Grid>
        </Grid>
    );
}

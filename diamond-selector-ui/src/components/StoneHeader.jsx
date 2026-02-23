import React from 'react';
import { Box, Typography } from "@mui/material";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';

const StoneHeader = ({ count, view, setView, allowedViews = [] }) => {
    const iconBoxStyle = (activeView) => ({
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40, height: 40,
        borderRadius: "var(--ds-border-radius)",
        bgcolor: view === activeView ? "var(--ds-primary-color)" : "transparent",
        color: view === activeView ? "#fff" : "var(--ds-primary-color)",
        border: "1px solid var(--ds-primary-color)",
        transition: "all 0.3s ease",
        "&:hover": {
            bgcolor: "var(--ds-primary-color)", color: "#fff",
        }
    });

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            {/* Data Count */}
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {count ? `${count.toLocaleString()} Diamonds Found` : "No results"}
            </Typography>

            {/* Grid & List View Toggle */}
            <Box sx={{ display: 'flex', gap: 1 }}>
                {allowedViews.includes("grid") && (
                    <Box onClick={() => setView("grid")} sx={iconBoxStyle("grid")}>
                        <GridViewOutlinedIcon fontSize="small" />
                    </Box>
                )}

                {allowedViews.includes("list") && (
                    <Box onClick={() => setView("list")} sx={iconBoxStyle("list")}>
                        <ViewListOutlinedIcon fontSize="small" />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default StoneHeader;

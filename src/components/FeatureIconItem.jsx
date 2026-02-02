import React from "react";
import { Box, TextField, Stack } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';

const FeatureIconItem = ({ feature, onUpdate }) => {

    return (
        <Stack 
            direction="row" 
            alignItems="center" 
            gap={2} 
            sx={{ py: 1 }}
        >
            <Box
                sx={{
                    position: "relative",
                    width: 45,
                    height: 45,
                    borderRadius: 1,
                    border: "1px solid #e0e0e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    overflow: "hidden",
                    bgcolor: "#f9f9f9",
                    flexShrink: 0,
                    "&:hover .upload-overlay": {
                        opacity: 1,
                    }
                }}
            >
                <Box
                    component="img"
                    src={feature.url}
                    alt="icon"
                    sx={{ 
                        width: 30, 
                        height: 30, 
                        objectFit: "contain" 
                    }}
                    onError={(e) => {
                        e.target.src = "https://via.placeholder.com/30?text=I"; 
                    }}
                />

                <Box
                    className="upload-overlay"
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        bgcolor: "rgba(0, 0, 0, 0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0,
                        transition: "opacity 0.2s ease-in-out",
                        color: "white"
                    }}
                >
                    <FileUploadIcon sx={{ fontSize: 20 }} />
                </Box>
            </Box>

            <TextField
                fullWidth
                size="small"
                variant="outlined"
                value={feature.text || ""}
                placeholder="Enter feature text..."
                onChange={(e) => onUpdate(e.target.value)}
            />
        </Stack>
    );
};

export default FeatureIconItem;

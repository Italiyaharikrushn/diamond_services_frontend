import React, { useState } from "react";
import { Box, TextField, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const FeatureIconItem = ({ features, onUpdateText, onUpdateIcon }) => {
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState(features.url || "");

    const handleSave = () => {
        onUpdateIcon(url);
        setOpen(false);
    };

    return (
        <>
            <Stack direction="row" alignItems="center" gap={2} sx={{ py: 1 }}>
                {/* ICON */}
                <Box
                    onClick={() => setOpen(true)}
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
                        },
                    }}
                >
                    <Box
                        component="img"
                        src={features.url}
                        alt="icon"
                        sx={{ width: 30, height: 30, objectFit: "contain" }}
                        onError={(e) => {
                            e.target.src = "https://via.placeholder.com/30?text=I";
                        }}
                    />

                    <Box
                        className="upload-overlay"
                        sx={{
                            position: "absolute",
                            inset: 0,
                            bgcolor: "rgba(0,0,0,0.4)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: 0,
                            transition: "0.2s",
                            color: "#fff",
                        }}
                    >
                        <FileUploadIcon fontSize="small" />
                    </Box>
                </Box>

                {/* TEXT */}
                <TextField
                    fullWidth
                    size="small"
                    value={features.text || ""}
                    placeholder="Enter feature text..."
                    onChange={(e) => onUpdateText(e.target.value)}
                />
            </Stack>

            {/* POPUP */}
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Update Feature Icon</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Image URL"
                        placeholder="https://example.com/icon.png"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        sx={{ mt: 1 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSave}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default FeatureIconItem;

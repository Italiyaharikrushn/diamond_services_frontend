import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Typography, Button } from "@mui/material";

const ImageEditDialog = ({ open, onClose, url, onUrlChange, onSave }) => (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Update Image URL</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus margin="dense" label="Image URL" type="url"
                fullWidth variant="outlined" value={url}
                onChange={(e) => onUrlChange(e.target.value)}
                sx={{ mt: 1 }}
            />
            {url && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant="caption" display="block">Preview:</Typography>
                    <img src={url} alt="Preview" style={{ maxWidth: '100px', borderRadius: '4px' }} />
                </Box>
            )}
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onSave} variant="contained">Update</Button>
        </DialogActions>
    </Dialog>
);

export default ImageEditDialog;

import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, Snackbar, Alert, LinearProgress} from "@mui/material";
import { useCreateGemstonesMutation } from "../../redux/api/gemstoneApi";
import { useCSVUpload } from "../../utils/useCSVUpload";

const GemstoneCSVUploadDialog = ({ open, onClose, shopifyName }) => {
  const { file, isLoading, notification, handleFileChange, handleUpload, handleCloseNotification } = 
    useCSVUpload(useCreateGemstonesMutation, onClose, { shopify_name: shopifyName });

  return (
    <>
      <Dialog open={open} onClose={() => onClose(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold" }}>
          Upload Lab CSV
        </DialogTitle>

        <DialogContent>
          {isLoading && <LinearProgress sx={{ mb: 2, borderRadius: 1 }} />}

          <Box
            sx={{
              border: "2px dashed",
              borderColor: file ? "success.light" : "#ccc",
              borderRadius: 2,
              textAlign: "center",
              p: 4,
              mt: 1,
              bgcolor: file ? "rgba(76, 175, 80, 0.04)" : "transparent",
              transition: "0.3s",
            }}
          >
            <Typography variant="h6" color="textSecondary">
              {file ? "File Selected!" : "Select your CSV file"}
            </Typography>

            <Button
              variant="contained"
              component="label"
              sx={{ mt: 2, boxShadow: 'none' }}
              disabled={isLoading}
            >
              Add File
              <input
                hidden
                type="file"
                accept=".csv"
                onChange={handleFileChange}
              />
            </Button>

            {file && (
              <Typography mt={2} color="success.main" fontWeight="500">
                📄 {file.name}
              </Typography>
            )}

            {!file && (
              <Typography mt={2} variant="body2" color="textSecondary">
                Accepts only .csv files
              </Typography>
            )}
          </Box>

        </DialogContent>

        <DialogActions sx={{ p: 2, px: 3 }}>
          <Button onClick={() => onClose(false)} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={isLoading || !file}
            sx={{ minWidth: 100 }}
          >
            {isLoading ? "Uploading..." : "Import"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default GemstoneCSVUploadDialog;

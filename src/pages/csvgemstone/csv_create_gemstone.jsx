import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, Snackbar, Alert, LinearProgress
} from "@mui/material";
import { useCreateGemstonesMutation } from "../../redux/api/gemstoneApi";

const GemstoneCSVUploadDialog = ({ open, onClose, shopifyName }) => {
  const [file, setFile] = useState(null);
  const [createGemstones, { isLoading }] = useCreateGemstonesMutation();
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type !== "text/csv") {
      setNotification({
        open: true,
        message: "Only CSV files are allowed",
        severity: "warning",
      });
      return;
    }
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setNotification({
        open: true,
        message: "Please select a CSV file first",
        severity: "warning",
      });
      return;
    }

    const reader = new FileReader();

    reader.onload = async (e) => {
      const csvText = e.target.result;

      try {
        const res = await createGemstones({ csv_data: csvText, shopify_name: shopifyName }).unwrap();

        setNotification({
          open: true,
          message: res.message || "Operation successful",
          severity: res.message === "Already exists" ? "info" : "success",
        });

        if (
          res.message === "Already exists" ||
          res.message === "CSV uploaded successfully"
        ) {
          setFile(null);
        }

        if (res.message === "Already exists" || "CSV uploaded successfully") {
          setTimeout(() => onClose(true), 1500);
        }

      } catch (err) {
        setNotification({
          open: true,
          message: err?.data?.detail || "Upload failed. Please try again.",
          severity: "error",
        });
        setFile(null);
      }
    };

    reader.readAsText(file);
  };

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
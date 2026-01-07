import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Link
} from "@mui/material";
import { useCreateFiamondsMutation } from "../../redux/api/diamondApi";

const DiamondCSVUploadDialog = ({ open, onClose }) => {
  const [file, setFile] = useState(null);
  const [createFiamonds, { isLoading }] = useCreateFiamondsMutation();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select CSV file");
      return;
    }

    const reader = new FileReader();

    reader.onload = async (e) => {
      const csvText = e.target.result;

      try {
        const res = await createFiamonds({ csv_data: csvText }).unwrap();

        alert(res.message);

        if (
          res.message === "Already exists" ||
          res.message === "CSV uploaded successfully"
        ) {
          setFile(null);
        }

        if (res.message === "CSV uploaded successfully") {
          onClose(true);
        }

      } catch (err) {
        alert("Upload failed");
        setFile(null);
      }
    };

    reader.readAsText(file);
  };


  return (
    <Dialog open={open} onClose={() => onClose(false)} maxWidth="sm" fullWidth>
      <DialogTitle>
        Upload lab CSV
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            border: "2px dashed #ccc",
            borderRadius: 2,
            textAlign: "center",
            p: 4,
            mt: 2,
          }}
        >
          <Typography fontWeight="bold">
            Accepts only CSV files
          </Typography>

          <Button
            variant="outlined"
            component="label"
            sx={{ mt: 2 }}
          >
            Add files
            <input
              hidden
              type="file"
              accept=".csv"
              onChange={handleFileChange}
            />
          </Button>

          {file && (
            <Typography mt={1} color="success.main">
              {file.name}
            </Typography>
          )}

          <Typography mt={1} variant="body2">
            Accepts .csv
          </Typography>
        </Box>

        <Link href="/sample.csv" underline="hover" sx={{ mt: 2, display: "block" }}>
          Download sample CSV
        </Link>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => onClose(false)}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Upload"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DiamondCSVUploadDialog;

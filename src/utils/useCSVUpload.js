import { useState } from "react";

export const useCSVUpload = (uploadMutation, onClose, extraParams = {}) => {
  const [file, setFile] = useState(null);
  const [triggerUpload, { isLoading }] = uploadMutation();
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleCloseNotification = () => setNotification((prev) => ({ ...prev, open: false }));

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
      setNotification({ open: true, message: "Please select a CSV file", severity: "warning" });
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const res = await triggerUpload({ 
          csv_data: e.target.result, 
          ...extraParams 
        }).unwrap();
        
        setNotification({
          open: true,
          message: res.message || "Operation successful",
          severity: res.message === "Already exists" ? "info" : "success",
        });

        if (res.message === "Already exists" || res.message === "CSV uploaded successfully") {
          setFile(null);
          setTimeout(() => onClose(true), 1500);
        }
      } catch (err) {
        setNotification({
          open: true,
          message: err?.data?.detail || "Upload failed",
          severity: "error",
        });
        setFile(null);
      }
    };
    reader.readAsText(file);
  };

  return { file, isLoading, notification, handleFileChange, handleUpload, handleCloseNotification };
};

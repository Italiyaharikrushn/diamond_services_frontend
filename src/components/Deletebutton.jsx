import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

export const DeleteData = ({ selectedIds, total, shopify_name, setSelectedIds, refetch, setSnackbar, bulkDeleteMutation, deleteAllMutation, label = "items", stone_type }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmDelete = async () => {
    try {
      if (!shopify_name) {
        setSnackbar({ open: true, message: "Shopify store name not found!", severity: "warning" });
        return;
      }

      const isAll = selectedIds.length === total && total > 0;
      let res;

      if (isAll) {
        res = await deleteAllMutation({ shopify_name, stone_type: stone_type?.toLowerCase() }).unwrap();
      } else {
        res = await bulkDeleteMutation({ ids: selectedIds, shopify_name }).unwrap();
      }

      if (res.success) {
        setSnackbar({
          open: true,
          message: `Successfully deleted ${res.deleted_count || 0} ${label}`,
          severity: "success"
        });
        setSelectedIds([]);
        refetch();
      } else {
        throw new Error(res.error || "Delete failed");
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: err?.data?.detail || err.message || "Delete Failed",
        severity: "error"
      });
    }
  };

  return (
    <>
      <Button
        variant="contained"
        disabled={selectedIds.length === 0}
        onClick={() => setConfirmOpen(true)}
        color="inherit"
        sx={{ boxShadow: 'none' }}
      >
        DELETE SELECTED
      </Button>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {selectedIds.length === total ? "ALL" : selectedIds.length} {label}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button
            onClick={() => { handleConfirmDelete(); setConfirmOpen(false); }}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteData;

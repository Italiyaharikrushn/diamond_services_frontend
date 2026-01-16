import React, { useState, useMemo } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Box, Button, TablePagination, FormControl, Select, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useGetAllDiamondsQuery, useGetDiamondFiltersQuery, useBulkDeleteDiamondsMutation, useDeleteAllDiamondsMutation, } from "../../redux/api/diamondApi";
import DiamondCSVUploadDialog from "./csv_create_diamond";
import MarginDialog from "../margin/apply_margin";

const INITIAL_FILTERS = {
  stone_type: "",
  color: "",
  clarity: "",
};


const DiamondPage = () => {
  const dispatch = useDispatch();

  /* ---------- STATE ---------- */
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openUpload, setOpenUpload] = useState(false);
  const [openMargin, setOpenMargin] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [bulkDelete] = useBulkDeleteDiamondsMutation();
  const [deleteAll] = useDeleteAllDiamondsMutation();

  const { data: filterRes } = useGetDiamondFiltersQuery(
    {
      stone_type: filters.stone_type || undefined
    },
  );
  const queryParams = useMemo(() => {
    const params = {};
    Object.entries(filters).forEach(([key, value]) => { if (value) params[key] = value; });
    return params;
  }, [filters]);

  const { data, error, isLoading, refetch } = useGetAllDiamondsQuery(queryParams);

  const diamonds = Array.isArray(data) ? data : [];
  const total = diamonds.length;
  const paginatedDiamonds = diamonds.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleSelectOne = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSelectAll = (e) => {
    setSelectedIds(e.target.checked ? paginatedDiamonds.map(d => d.id) : []);
  };

  const handleConfirmDelete = async () => {
    try {
      const shopify_name = diamonds[0]?.shopify_name;

      if (!shopify_name) {
        setSnackbar({ open: true, message: "Shopify store name not found!", severity: "warning" });
        return;
      }

      const isAll = selectedIds.length === total;
      let res;

      if (isAll) {
        // All Delete API Call
        res = await deleteAll({ shopify_name }).unwrap();
      } else {
        // Bulk Delete API Call
        res = await bulkDelete({ ids: selectedIds, shopify_name }).unwrap();
      }

      if (res.success) {
        setSnackbar({ open: true, message: `Successfully deleted ${res.deleted_count} diamonds`, severity: "success" });
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
    <Container maxWidth="xl" sx={{ mb: 4 }}>
      {/* HEADER - CLEAN LOOK */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, mt: 4, alignItems: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: 800, fontSize: "2rem" }}>All Diamonds</Typography>
        <Button color="error" startIcon={<LogoutIcon />} onClick={() =>{dispatch(logout()); window.location.href = "/login";}} sx={{ fontWeight: 600 }}>
          LOGOUT
        </Button>
      </Box>

      {/* FILTER BAR - EXACTLY LIKE IMAGE */}
      <Box sx={{ display: "flex", gap: 1.5, mb: 3, alignItems: "center", flexWrap: "wrap" }}>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <Select value={filters.stone_type} displayEmpty onChange={(e) => setFilters(p => ({ ...p, stone_type: e.target.value }))}>
            <MenuItem value="">Stone Type</MenuItem>
            <MenuItem value="natural">Natural</MenuItem>
            <MenuItem value="lab">Lab</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <Select value={filters.color} displayEmpty onChange={(e) => setFilters(p => ({ ...p, color: e.target.value }))}>
            <MenuItem value="">Color</MenuItem>
            {filterRes?.data?.colors?.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <Select value={filters.clarity} displayEmpty onChange={(e) => setFilters(p => ({ ...p, clarity: e.target.value }))}>
            <MenuItem value="">Clarity</MenuItem>
            {filterRes?.data?.clarities?.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </Select>
        </FormControl>

        <Button variant="outlined"
          size="small"
          sx={{ height: 40 }}
          disabled={
            JSON.stringify(filters) === JSON.stringify(INITIAL_FILTERS)
          }
          onClick={() => setFilters(INITIAL_FILTERS)}
        >
          RESET
        </Button>

        <Box sx={{ flexGrow: 1 }} />
        <Button variant="contained" disabled={selectedIds.length === 0} onClick={() => setConfirmOpen(true)} startIcon={<DeleteIcon />} sx={{ bgcolor: '#d3d3d3', color: '#666', '&:disabled': { bgcolor: '#efefef' }, boxShadow: 'none' }}>
          DELETE SELECTED
        </Button>
        <Button variant="contained" onClick={() => setOpenMargin(true)} sx={{ bgcolor: '#1976d2', boxShadow: 'none' }}>MARGIN</Button>
        <Button variant="contained" onClick={() => setOpenUpload(true)} sx={{ bgcolor: '#1976d2', boxShadow: 'none' }}>IMPORT CSV</Button>
      </Box>

      {/* TABLE - PROFESSIONAL SPACING */}
      <Paper sx={{ borderRadius: "8px", border: '1px solid #eee', boxShadow: 'none', overflow: 'hidden' }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ "& th": { py: 2, fontSize: '0.75rem', color: '#333', borderBottom: '2px solid #eee' } }}>
                <TableCell padding="checkbox"><Checkbox onChange={handleSelectAll} /></TableCell>
                <TableCell><b>STONE</b></TableCell>
                <TableCell><b>ORIGIN</b></TableCell>
                <TableCell><b>SHAPE</b></TableCell>
                <TableCell><b>CARAT</b></TableCell>
                <TableCell><b>COLOR</b></TableCell>
                <TableCell><b>CLARITY</b></TableCell>
                <TableCell><b>PRICE</b></TableCell>
                <TableCell><b>SELLING</b></TableCell>
                <TableCell><b>TYPE</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedDiamonds.map((d) => (
                <TableRow key={d.id} sx={{ "& td": { py: 2, fontSize: '0.85rem' }, "&:hover": { bgcolor: '#fafafa' } }}>
                  <TableCell padding="checkbox"><Checkbox checked={selectedIds.includes(d.id)} onChange={() => handleSelectOne(d.id)} /></TableCell>
                  <TableCell sx={{ color: '#1976d2' }}>{d.certificate_no}</TableCell>
                  <TableCell>{d.origin}</TableCell>
                  <TableCell>{d.shape}</TableCell>
                  <TableCell>{d.carat}</TableCell>
                  <TableCell>{d.color}</TableCell>
                  <TableCell>{d.clarity}</TableCell>
                  <TableCell>{d.price}</TableCell>
                  <TableCell>{d.selling_price}</TableCell>
                  <TableCell>{d.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1, borderTop: '1px solid #eee' }}>
          <TablePagination component="div" count={total} page={page} rowsPerPage={rowsPerPage} onPageChange={(_, p) => setPage(p)} onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))} />
        </Box>
      </Paper>

      {/* DIALOGS & SNACKBAR */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete selected items?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={() => { handleConfirmDelete(); setConfirmOpen(false); }} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
      </Snackbar>

      <DiamondCSVUploadDialog open={openUpload} onClose={() => setOpenUpload(false)} />
      <MarginDialog open={openMargin} onclose={() => setOpenMargin(false)} onSuccess={() => refetch()} />
    </Container>
  );
};

export default DiamondPage;

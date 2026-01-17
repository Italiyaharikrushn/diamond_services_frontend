import React, { useState, useMemo } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Box, Button, TablePagination, FormControl, Select, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useGetAllGemstonesQuery, useGetGemstoneFiltersQuery, useBulkDeleteGemstonesMutation, useDeleteAllGemstonesMutation } from "../../redux/api/gemstoneApi";
import GemstoneCSVUploadDialog from "./csv_create_gemstone";
import MarginDialog from "../margin/apply_margin";

const INITIAL_FILTERS = {
  color: "",
  clarity: "",
};


const GemstonePage = ({ category }) => {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openUpload, setOpenUpload] = useState(false);
  const [openMargin, setOpenMargin] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [bulkDelete] = useBulkDeleteGemstonesMutation();
  const [deleteAll] = useDeleteAllGemstonesMutation();

  const { data: filterRes } = useGetGemstoneFiltersQuery({
    stone_type: filters.stone_type || undefined
  });
  const queryParams = useMemo(() => {
    const params = { category };
    Object.entries(filters).forEach(([key, value]) => { if (value) params[key] = value; });
    return params;
  }, [filters, category]);

  const { data, isLoading, refetch } = useGetAllGemstonesQuery(queryParams);

  const gemstones = Array.isArray(data) ? data : [];
  const total = gemstones.length;
  const paginatedGemstones = gemstones.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const handleSelectOne = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSelectAll = (e) => {
    setSelectedIds(e.target.checked ? paginatedGemstones.map(d => d.id) : []);
  };

  const handleConfirmDelete = async () => {
    try {
      const shopify_name = gemstones[0]?.shopify_name;

      if (!shopify_name) {
        setSnackbar({ open: true, message: "Shopify store name not found!", severity: "warning" });
        return;
      }

      const isAll = selectedIds.length === total;
      let res;

      if (isAll) {
        res = await deleteAll({ shopify_name }).unwrap();
      } else {
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
      <Box sx={{ display: "flex", gap: 1.5, mb: 3, alignItems: "center", flexWrap: "wrap" }}>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <Select value={filters.color} displayEmpty onChange={(e) => setFilters(p => ({ ...p, color: e.target.value }))}>
            <MenuItem value="">Color</MenuItem>
            {filterRes?.data?.colors?.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <Select value={filters.clarity} displayEmpty onChange={(e) => setFilters(p => ({ ...p, clarity: e.target.value }))}>
            <MenuItem value="">clarity</MenuItem>
            {filterRes?.data?.clarities?.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </Select>
        </FormControl>

        <Button variant="outlined" size="small" disabled={JSON.stringify(filters) === JSON.stringify(INITIAL_FILTERS)} onClick={() => setFilters(INITIAL_FILTERS)}>
          RESET
        </Button>

        <Box sx={{ flexGrow: 1 }} />
        <Button variant="contained" disabled={selectedIds.length === 0} onClick={() => setConfirmOpen(true)} color="inherit" sx={{ boxShadow: 'none' }}>
          DELETE SELECTED
        </Button>
        <Button variant="contained" onClick={() => setOpenMargin(true)} sx={{ bgcolor: '#1976d2', boxShadow: 'none' }}>MARGIN</Button>
        <Button variant="contained" onClick={() => setOpenUpload(true)} sx={{ bgcolor: '#1976d2', boxShadow: 'none' }}>IMPORT CSV</Button>
      </Box>

      {isLoading ? (
        <Box sx={{ textAlign: 'center', py: 5 }}><Typography>Loading...</Typography></Box>
      ) : gemstones.length === 0 ? (
        <Paper sx={{ p: 10, textAlign: 'center', bgcolor: '#f9f9f9', borderRadius: "8px", border: '1px solid #eee' }}>
          <Typography variant="h5" color="textSecondary" sx={{ fontWeight: 600 }}>
            Data Not Found for {category.toUpperCase()}
          </Typography>
        </Paper>
      ) : (
        <Paper sx={{ borderRadius: "8px", border: '1px solid #eee', boxShadow: 'none', overflow: 'hidden' }}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ "& th": { py: 2, fontSize: '0.75rem', color: '#333', borderBottom: '2px solid #eee' } }}>
                  <TableCell padding="checkbox"><Checkbox onChange={handleSelectAll} checked={selectedIds.length === paginatedGemstones.length && paginatedGemstones.length > 0} /></TableCell>
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
                {paginatedGemstones.map((d) => (
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
      )}

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
      <GemstoneCSVUploadDialog open={openUpload} onClose={() => setOpenUpload(false)} shopifyName={gemstones[0]?.shopify_name} />
      <MarginDialog open={openMargin} onclose={() => setOpenMargin(false)} onSuccess={() => refetch()} defaultType="gemstones" />
    </Container>
  );
};

export default GemstonePage;

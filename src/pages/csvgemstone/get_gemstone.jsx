import React, { useState, useEffect } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button, TablePagination, Snackbar, Alert } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useGetAllGemstonesQuery, useGetGemstoneFiltersQuery, useBulkDeleteGemstonesMutation, useDeleteAllGemstonesMutation } from "../../redux/api/gemstoneApi";
import GemstoneCSVUploadDialog from "./csv_create_gemstone";
import MarginDialog from "../margin/apply_margin";
import Filterselects from "../../components/Select";
import DeleteData from "../../components/Deletebutton";

const GemstonePage = ({ category = "" }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openUpload, setOpenUpload] = useState(false);
  const [openMargin, setOpenMargin] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [filters, setFilters] = useState({
    color: "",
    clarity: "",
    price: [0, 0],
    carat: [0, 0],
    stone_type: category || ""
  });

  const { data: filterRes } = useGetGemstoneFiltersQuery({
    stone_type: filters.stone_type || undefined
  });

  const [bulkDelete] = useBulkDeleteGemstonesMutation();
  const [deleteAll] = useDeleteAllGemstonesMutation();

  const { data, isLoading, refetch } = useGetAllGemstonesQuery({
    stone_type: filters.stone_type || undefined,
    color: filters.color || undefined,
    clarity: filters.clarity || undefined,
    min_price: filters.price[0],
    max_price: filters.price[1],
    min_carat: filters.carat[0],
    max_carat: filters.carat[1],
    page: page + 1,
    limit: rowsPerPage
  });

  useEffect(() => {
    if (filterRes?.data) {
      setFilters(p => ({
        ...p,
        price: [filterRes.data.price_ranges.min, filterRes.data.price_ranges.max],
        carat: [filterRes.data.carat_ranges.min, filterRes.data.carat_ranges.max]
      }));
    }
  }, [filterRes]);

  const gemstones = Array.isArray(data) ? data : [];
  const total = gemstones.length;
  const shopify_name = gemstones[0]?.shopify_name;
  const paginatedGemstones = gemstones.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleSelectOne = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSelectAll = (e) => {
    setSelectedIds(e.target.checked ? paginatedGemstones.map(d => d.id) : []);
  };

  return (
    <Container maxWidth="xl" sx={{ mb: 4 }}>
      <Box sx={{ display: "flex", gap: 1.5, mb: 3, alignItems: "center", flexWrap: "wrap" }}>
        <Filterselects
          filters={filters}
          setFilters={setFilters}
        />

        <Box sx={{ flexGrow: 1 }} />
        <DeleteData selectedIds={selectedIds} total={total} shopify_name={shopify_name} setSelectedIds={setSelectedIds} refetch={refetch} setSnackbar={setSnackbar} bulkDeleteMutation={bulkDelete} deleteAllMutation={deleteAll} label="gemstones" />
        <Button variant="contained" onClick={() => setOpenMargin(true)} sx={{ bgcolor: '#1976d2', boxShadow: 'none' }}>MARGIN</Button>
        <Button variant="contained" onClick={() => setOpenUpload(true)} sx={{ bgcolor: '#1976d2', boxShadow: 'none' }}>IMPORT CSV</Button>
      </Box>

      {isLoading ? (
        <Box sx={{ textAlign: 'center', py: 5 }}><Typography>Loading...</Typography></Box>
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
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box
                          component="img"
                          src={d.image_source}
                          alt={d.certificate_no}
                          sx={{ width: 36, height: 36, borderRadius: "20%" }}
                        />
                        {d.certificate_no}
                      </Box>
                    </TableCell>
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

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
      </Snackbar>
      <GemstoneCSVUploadDialog open={openUpload} onClose={() => setOpenUpload(false)} shopifyName={gemstones[0]?.shopify_name} />
      <MarginDialog open={openMargin} onclose={() => setOpenMargin(false)} onSuccess={() => refetch()} defaultType="gemstones" filterData={filterRes?.data} />
    </Container>
  );
};

export default GemstonePage;

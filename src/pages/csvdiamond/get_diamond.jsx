import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import MarginDialog from "../margin/apply_margin";
import Filterselects from "../../components/Select";
import DeleteData from "../../components/Deletebutton";
import DiamondCSVUploadDialog from "./csv_create_diamond";
import { useGetAllDiamondsQuery, useGetDiamondFiltersQuery, useBulkDeleteDiamondsMutation, useDeleteAllDiamondsMutation } from "../../redux/api/diamondApi";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button, TablePagination, Snackbar, Alert } from "@mui/material";

const DiamondPage = ({ stone_type = "" }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openUpload, setOpenUpload] = useState(false);
  const [openMargin, setOpenMargin] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkDelete] = useBulkDeleteDiamondsMutation();
  const [deleteAll] = useDeleteAllDiamondsMutation();
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [filters, setFilters] = useState({
    color: "",
    clarity: "",
    price: [],
    carat: [],
  });

  const { data: filterRes } = useGetDiamondFiltersQuery({
    stone_type: filters.stone_type || undefined
  });

  const { data, isLoading, refetch } = useGetAllDiamondsQuery({
    stone_type: stone_type.toLowerCase(),
    color: filters.color || undefined,
    clarity: filters.clarity || undefined,
    price_min: filters.price[0],
    price_max: filters.price[1],
    carat_min: filters.carat[0],
    carat_max: filters.carat[1],
    page: page + 1,
    limit: rowsPerPage
  });

  useEffect(() => {
    if (filterRes?.data) {
      setFilters(p => ({
        ...p,
        price: [filterRes.data.price_range.min, filterRes.data.price_range.max],
        carat: [filterRes.data.carat_range.min, filterRes.data.carat_range.max]
      }));
    }
  }, [filterRes]);

  const diamonds = Array.isArray(data) ? data : [];
  const total = diamonds.length;
  const shopify_name = diamonds[0]?.shopify_name;
  const paginatedDiamonds = diamonds.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleSelectOne = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSelectAll = (e) => {
    setSelectedIds(e.target.checked ? paginatedDiamonds.map(d => d.id) : []);
  };

  return (
    <Container maxWidth="xl" sx={{ mb: 4 }}>
      <Box sx={{ display: "flex", gap: 1.5, mb: 3, alignItems: "center", flexWrap: "wrap" }}>

        <Filterselects
          filters={{ ...filters, stone_type: stone_type }}
          setFilters={setFilters}
        />

        <Box sx={{ flexGrow: 1 }} />

        < DeleteData selectedIds={selectedIds} total={total} shopify_name={shopify_name} setSelectedIds={setSelectedIds} refetch={refetch} setSnackbar={setSnackbar} bulkDeleteMutation={bulkDelete} deleteAllMutation={deleteAll} label="diamonds" stone_type={stone_type} />

        <Button variant="contained" onClick={() => setOpenMargin(true)} sx={{ bgcolor: '#1976d2', boxShadow: 'none' }}>MARGIN</Button>
        <Button variant="contained" onClick={() => setOpenUpload(true)} sx={{ bgcolor: '#1976d2', boxShadow: 'none' }}>IMPORT CSV</Button>
      </Box>

      {isLoading ? (
        <Box sx={{ textAlign: 'center', py: 5 }}><Typography>Loading...</Typography></Box>
      ) : diamonds.length === 0 ? (
        <Paper sx={{ p: 10, textAlign: 'center', bgcolor: '#f9f9f9', borderRadius: "8px", border: '1px solid #eee' }}>
          <Typography variant="h5" color="textSecondary" sx={{ fontWeight: 600 }}>
            Data Not Found for {(stone_type || "").toUpperCase()}
          </Typography>
        </Paper>
      ) : (
        <Paper sx={{ borderRadius: "8px", border: '1px solid #eee', boxShadow: 'none', overflow: 'hidden' }}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ "& th": { py: 2, fontSize: '0.75rem', color: '#333', borderBottom: '2px solid #eee' } }}>
                  <TableCell padding="checkbox"><Checkbox onChange={handleSelectAll} checked={selectedIds.length === paginatedDiamonds.length && paginatedDiamonds.length > 0} /></TableCell>
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
      <DiamondCSVUploadDialog open={openUpload} onClose={(shouldRefetch) => { setOpenUpload(false); if (shouldRefetch === true) { refetch(); } }} defaultType={stone_type} />
      <MarginDialog open={openMargin} onclose={() => setOpenMargin(false)} onSuccess={() => refetch()} defaultType={stone_type === "lab" ? "lab" : "natural"} filterData={filterRes?.data} />
    </Container>
  );
};

export default DiamondPage;

import React from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert, MenuItem, Box, Button, TablePagination, FormControl, InputLabel, Select } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useGetAllDiamondsQuery, useGetDiamondFiltersQuery,} from "../../redux/api/diamondApi";
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
  const [filters, setFilters] = React.useState(INITIAL_FILTERS);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openUpload, setOpenUpload] = React.useState(false);
  const [openMargin, setOpenMargin] = React.useState(false);

  /* ---------- FILTER OPTIONS API ---------- */
  const { data: filterRes } = useGetDiamondFiltersQuery(
    {
      stone_type: filters.stone_type || undefined,
    },
    { refetchOnMountOrArgChange: false }
  );

  /* ---------- BUILD QUERY PARAMS ---------- */
  const queryParams = React.useMemo(() => {
    const params = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params[key] = value;
    });
    return params;
  }, [filters]);

  /* ---------- DIAMONDS API ---------- */
  const { data, error, isLoading, refetch } = useGetAllDiamondsQuery(queryParams);

  const diamonds = Array.isArray(data) ? data : [];
  const total = diamonds.length;

  /* ---------- PAGINATION ---------- */
  const paginatedDiamonds = diamonds.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  React.useEffect(() => {
    setPage(0);
  }, [filters]);

  /* ---------- HANDLERS ---------- */
  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  /* ---------- LOADING / ERROR ---------- */
  if (isLoading) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography mt={2}>Loading Diamonds...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">
          {error?.data?.detail || "Error loading diamonds!"}
        </Alert>
      </Container>
    );
  }

  /* ================= UI ================= */
  return (
    <Container maxWidth="xl" sx={{ mb: 4 }}>
      {/* ================= HEADER ================= */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" color="primary">
          All Diamonds
        </Typography>

        <Box>
          <Button
            variant="contained"
            sx={{ mr: 2 }}
            onClick={() => setOpenMargin(true)}
          >
            Margin
          </Button>
          <Button
            variant="contained"
            sx={{ mr: 2 }}
            onClick={() => setOpenUpload(true)}
          >
            Import CSV
          </Button>
          <Button
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* ================= FILTER BAR ================= */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {/* Stone Type */}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Stone Type</InputLabel>
            <Select
              value={filters.stone_type}
              label="Stone Type"
              onChange={(e) =>
                setFilters((p) => ({ ...p, stone_type: e.target.value }))
              }
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="natural">Natural</MenuItem>
              <MenuItem value="lab">Lab</MenuItem>
            </Select>
          </FormControl>

          {/* Color */}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Color</InputLabel>
            <Select
              value={filters.color}
              label="Color"
              onChange={(e) =>
                setFilters((p) => ({ ...p, color: e.target.value }))
              }
            >
              <MenuItem value="">All</MenuItem>
              {filterRes?.data?.colors?.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Clarity */}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Clarity</InputLabel>
            <Select
              value={filters.clarity}
              label="Clarity"
              onChange={(e) =>
                setFilters((p) => ({ ...p, clarity: e.target.value }))
              }
            >
              <MenuItem value="">All</MenuItem>
              {filterRes?.data?.clarities?.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Reset */}
          <Button
            variant="outlined"
            size="small"
            sx={{ height: 40 }}
            disabled={
              JSON.stringify(filters) === JSON.stringify(INITIAL_FILTERS)
            }
            onClick={handleResetFilters}
          >
            Reset
          </Button>
        </Box>
      </Paper>

      {/* ================= TABLE ================= */}
      <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: 1,
                  },
                }}
              >
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
                <TableRow key={d.id} hover>
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

        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[10, 20, 50, 100]}
        />
      </Paper>

      {/* ================= CSV UPLOAD ================= */}
      <DiamondCSVUploadDialog
        open={openUpload}
        onClose={() => setOpenUpload(false)}
      />

      {/* ================= Margin apply ================= */}
      <MarginDialog
        open={openMargin}
        onclose={() => setOpenMargin(false)}
        onSuccess={() => {
          setOpenMargin(false);
          refetch();
        }}
      />
    </Container>
  );
};

export default DiamondPage;

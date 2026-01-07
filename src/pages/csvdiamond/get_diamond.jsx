import React from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert, MenuItem, Box, Button, TablePagination } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useGetAllDiamondsQuery } from "../../redux/api/diamondApi";
import DiamondCSVUploadDialog from "./csv_create_diamond";

const DiamondPage = () => {
  const dispatch = useDispatch();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openUpload, setOpenUpload] = React.useState(false);

  const { data, error, isLoading } = useGetAllDiamondsQuery();

  const diamonds = Array.isArray(data) ? data : [];
  const total = diamonds.length;

  const paginatedDiamonds = diamonds.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    window.location.href = "/";
  };

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

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" color="primary">
          All Diamonds
        </Typography>

        <Box>
          <Button
            variant="contained"
            sx={{ mr: 2 }}
            onClick={() => setOpenUpload(true)}
          >
            Import CSV
          </Button>

          <MenuItem
            sx={{ fontWeight: "bold", color: "primary.main" }}
            onClick={handleLogout}
          >
            <LogoutIcon sx={{ mr: 1 }} />
            Logout
          </MenuItem>
        </Box>
      </Box>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
              <TableRow>
                <TableCell><b>Certificate No</b></TableCell>
                <TableCell><b>Image</b></TableCell>
                <TableCell><b>Lab</b></TableCell>
                <TableCell><b>Type</b></TableCell>
                <TableCell><b>Carat</b></TableCell>
                <TableCell><b>Color</b></TableCell>
                <TableCell><b>Clarity</b></TableCell>
                <TableCell><b>Shape</b></TableCell>
                <TableCell><b>Selling Price</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedDiamonds.map((diamond) => (
                <TableRow key={diamond.id}>
                  <TableCell>{diamond.certificate_no}</TableCell>
                  <TableCell>
                    <img
                      src={diamond.image_source}
                      alt={diamond.certificate_no}
                      width={50}
                      height={50}
                      style={{ borderRadius: "50%" }}
                    />
                  </TableCell>
                  <TableCell>{diamond.lab}</TableCell>
                  <TableCell>{diamond.type}</TableCell>
                  <TableCell>{diamond.carat}</TableCell>
                  <TableCell>{diamond.color}</TableCell>
                  <TableCell>{diamond.clarity}</TableCell>
                  <TableCell>{diamond.shape}</TableCell>
                  <TableCell>{diamond.selling_price}</TableCell>
                </TableRow>
              ))}

              {paginatedDiamonds.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 20, 50, 100]}
        />
      </Paper>

      <DiamondCSVUploadDialog
        open={openUpload}
        onClose={(success) => {
          setOpenUpload(false);
          if (success) {setPage(0);}
        }}
      />
    </Container>
  );
};

export default DiamondPage;

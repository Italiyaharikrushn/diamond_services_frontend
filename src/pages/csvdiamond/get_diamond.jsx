import React from "react";
import { useGetAllDiamondsQuery } from "../../redux/api/diamondApi";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";

const DiamondPage = () => {
  // Fetch all diamonds using RTK Query (token included in headers via diamondApi)
  const { data, error, isLoading } = useGetAllDiamondsQuery();

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
      <Typography variant="h4" mb={3} textAlign="center">
        All Diamonds
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Certificate No</TableCell>
              <TableCell>Lab</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Carat</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Clarity</TableCell>
              <TableCell>Shape</TableCell>
              <TableCell>Selling Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((diamond) => (
              <TableRow key={diamond.id}>
                <TableCell>{diamond.certificate_no}</TableCell>
                <TableCell>{diamond.lab}</TableCell>
                <TableCell>{diamond.type}</TableCell>
                <TableCell>{diamond.carat}</TableCell>
                <TableCell>{diamond.color}</TableCell>
                <TableCell>{diamond.clarity}</TableCell>
                <TableCell>{diamond.shape}</TableCell>
                <TableCell>{diamond.selling_price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default DiamondPage;

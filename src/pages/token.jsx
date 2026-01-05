import { useGenrateMutation } from "../redux/api/loginApi";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Button, Typography, Box, Alert, CircularProgress, TextField } from "@mui/material";

const Token = () => {
  const [generateToken, { isLoading }] = useGenrateMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [storeName, setStoreName] = useState("");       // changed from storeId
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    try {
      const res = await generateToken({ store_name: storeName }).unwrap();  // changed here

      dispatch(setToken(res.token));
      navigate("/diamonds");
    } catch (error) {
      setServerError(error?.data?.detail || "Token generate failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2, width: "100%" }}>

          {serverError && <Alert severity="error">{serverError}</Alert>}

          <Typography variant="h4" textAlign="center" fontWeight={600} mb={3}>
            Generate Token
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Store Name"
              fullWidth
              required
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Button type="submit" fullWidth variant="contained" sx={{ py: 1.3 }}>
              {isLoading ? <CircularProgress size={20} /> : "Generate Token"}
            </Button>
          </form>

        </Paper>
      </Box>
    </Container>
  );
};

export default Token;

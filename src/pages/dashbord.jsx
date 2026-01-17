import React, { useState } from "react";
import { Container, Box, Tabs, Tab, Typography, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

import DiamondPage from "./csvdiamond/get_diamond"; 
import GemstonePage from "./csvgemstone/get_gemstone";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0); 

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, mt: 4, alignItems: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: 800, fontSize: "2rem" }}>
          Inventory Dashboard
        </Typography>
        <Button 
          color="error" 
          startIcon={<LogoutIcon />} 
          onClick={() => { 
            dispatch(logout()); 
            window.location.href = "/";
          }} 
          sx={{ fontWeight: 600 }}
        >
          LOGOUT
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
          <Tab label="Diamonds" sx={{ fontWeight: 700 }} />
          <Tab label="Gemstones" sx={{ fontWeight: 700 }} />
          <Tab label="Natural Diamonds" sx={{ fontWeight: 700 }} />
        </Tabs>
      </Box>

      <Box sx={{ mt: 2 }}>
        {tabValue === 0 && <DiamondPage category="diamond" />}
        {tabValue === 1 && <GemstonePage category="gemstone" />}
        {tabValue === 2 && <DiamondPage category="natural" />} 
      </Box>
    </Container>
  );
};

export default Dashboard;

import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";

import DiamondPage from "./csvdiamond/get_diamond";
import GemstonePage from "./csvgemstone/get_gemstone";

const Dashboard = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
          <Tab label="Lab Diamonds" sx={{ fontWeight: 700 }} />
          <Tab label="Gemstones" sx={{ fontWeight: 700 }} />
          <Tab label="Natural Diamonds" sx={{ fontWeight: 700 }} />
        </Tabs>
      </Box>

      <Box sx={{ mt: 2 }}>
        {tabValue === 0 && <DiamondPage key="lab" stone_type="lab" />}
        {tabValue === 1 && <GemstonePage key="gem" stone_type="gemstone" />}
        {tabValue === 2 && <DiamondPage key="natural" stone_type="natural" />}
      </Box>
    </>
  );
};

export default Dashboard;

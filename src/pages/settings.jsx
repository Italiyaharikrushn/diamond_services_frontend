import React from "react";
import { Box, Tabs, Tab, Container, Button } from "@mui/material";
import ComplateRing from "./complate/ComplateRing";
import Gemstones from "./complate/gemsrones";
import Diamonds from "./complate/diamonds";
import Products from "./complate/product";
import General from "./complate/general";
import Appearance from "./complate/appearance";
import { useSettings } from "../utils/useSettings";
import { useSelector } from "react-redux";

const Settings = () => {
    const [tabValue, setTabValue] = React.useState(0);
    const { saveSettings, isSaving } = useSettings();
    const settings = useSelector((state) => state.settings.settings);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleSave = () => {
        saveSettings(settings);
    };

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    textColor="primary"
                    indicatorColor="primary"
                >
                    <Tab label="General" sx={{ fontWeight: 548 }} />
                    <Tab label="Diamonds" sx={{ fontWeight: 548 }} />
                    <Tab label="Gemstones" sx={{ fontWeight: 548 }} />
                    <Tab label="Stone Appearance" sx={{ fontWeight: 548 }} />
                    <Tab label="Products" sx={{ fontWeight: 548 }} />
                    <Tab label="Complete Ring" sx={{ fontWeight: 548 }} />
                </Tabs>

                {/* Save Button */}
                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={isSaving}
                >
                    {isSaving ? "Saving..." : "Save Setting"}
                </Button>
            </Box>

            <Container maxWidth="xl">
                <Box sx={{ mt: 3 }}>
                    {tabValue === 0 && <General />}
                    {tabValue === 1 && <Diamonds />}
                    {tabValue === 2 && <Gemstones />}
                    {tabValue === 3 && <Appearance />}
                    {tabValue === 4 && <Products />}
                    {tabValue === 5 && <ComplateRing />}
                </Box>
            </Container>
        </>
    );
};

export default Settings;

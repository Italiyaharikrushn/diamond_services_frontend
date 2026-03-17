import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Stepper from "./components/Stepper";
import { baseSteps } from "./components/step";
import { Container } from "@mui/material";
import { useSettings } from "./hooks/useSettings";
import Loader from "./components/Loader";

const Layout = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [completedSteps] = useState([]);
    const storeId = "test-store.myshopify.com";
    const { settings, isLoading } = useSettings(storeId)

    return isLoading ? <Loader /> : (
        <div>
            <Container maxWidth="xl" >
                <h1 className="dashboard-title">Design Your Own Engagement</h1>
                <p className="dashboard-desc">
                    Forever has a nice ring to it. Select a setting and your dream diamond
                    to create your design.
                </p>

                <Stepper
                    steps={baseSteps}
                    currentStep={currentStep}
                    completedSteps={completedSteps}
                />

                {/* Page Content */}
                <main style={{}}>
                    <Outlet />
                </main>
            </Container>
        </div>
    );
};

export default Layout;

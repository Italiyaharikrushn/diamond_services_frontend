import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import FilterAccordion from "./FilterAccordion";

function ReportFilter({ onChange }) {
    const report = ["IGI", "IGA", "SGL", "GII"];
    const [selectedReports, setSelectedReports] = useState([]);

    const handleSelect = (value) => {
        const isAlreadySelected = selectedReports.includes(value);

        let updatedSelection;
        if (isAlreadySelected) {
            updatedSelection = selectedReports.filter((item) => item !== value);
        } else {
            updatedSelection = [...selectedReports, value];
        }
        setSelectedReports(updatedSelection);
        if (onChange) {
            onChange(updatedSelection);
        }
    };

    return (
        <FilterAccordion title="Report">
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    gap: 1,
                    p: 1,
                    maxHeight: 200,
                    overflowX: "auto",

                    "&::-webkit-scrollbar": {
                        height: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#659688ad",
                        borderRadius: "var(--ds-border-radius)",
                    }
                }}
            >
                {report.map((item) => {
                    const isActive = selectedReports.includes(item);

                    return (
                        <Button
                            key={item}
                            onClick={(e) => { e.stopPropagation(); handleSelect(item) }}
                            variant={isActive ? "contained" : "outlined"}
                            sx={{
                                minWidth: 20,
                                fontWeight: 600,
                                borderRadius: "var(--ds-border-radius)",
                                borderColor: "var(--ds-primary-color)",
                                color: isActive ? "#fff" : "var(--ds-primary-color)",
                                backgroundColor: isActive ? "var(--ds-primary-color)" : "#fff",
                                "&:hover": {
                                    backgroundColor: "var(--ds-primary-color)",
                                    color: "#fff",
                                }
                            }}
                        >
                            {item}
                        </Button>
                    );
                })}
            </Box>
        </FilterAccordion>
    );
}

export default ReportFilter;

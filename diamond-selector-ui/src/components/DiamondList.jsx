import React from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import StoneCard from "./StoneCard";
import StoneTable from "./StoneTable";

const DiamondList = ({ diamonds, view }) => {
    const list = Array.isArray(diamonds) ? diamonds : diamonds?.data || [];
    const navigate = useNavigate();

    if (view === "list") return <StoneTable data={list} />;

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: 16,
            }}
        >
            {list.map((diamond, index) => (
                <Box
                    key={diamond.id || index}
                    onClick={() => navigate(`/diamond/${diamond.id}?type=${diamond.type}`)}
                    sx={{ cursor: "pointer" }}
                >
                    <StoneCard item={diamond} />
                </Box>
            ))}
        </div>
    );
};

export default DiamondList;

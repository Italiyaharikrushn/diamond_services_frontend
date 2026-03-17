import React from "react";
import StoneCard from "./StoneCard";
import StoneTable from "./StoneTable";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

const GemstoneList = ({ gemstones, view }) => {
    const list = Array.isArray(gemstones) ? gemstones : gemstones?.data || [];
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
            {list.map((gemstone, index) => (
                <Box
                    key={gemstone.id || index}
                    onClick={() => navigate(`/gemstone/${gemstone.id}?type=${gemstone.type}`)}
                    sx={{ cursor: "pointer" }}
                >
                    <StoneCard item={gemstone} />
                </Box>
            ))}
        </div>
    );
};

export default GemstoneList;

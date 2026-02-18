import React from "react";
import StoneCard from "./StoneCard";
import StoneTable from "./StoneTable";

const GemstoneList = ({ gemstones, view }) => {
    const list = Array.isArray(gemstones) ? gemstones : gemstones?.data || [];

    if (!list.length) return <p>No gemstones found for this store.</p>;

    if (view === "list") {
        return <StoneTable data={list} />; 
    }

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: 16,
            }}
        >
            {list.map((gemstone, index) => (
                <StoneCard key={gemstone.id || index} item={gemstone} />
            ))}
        </div>
    );
};

export default GemstoneList;

import React from "react";
import StoneCard from "./StoneCard";
import StoneTable from "./StoneTable";

const DiamondList = ({ diamonds, view }) => {
    const list = Array.isArray(diamonds) ? diamonds : diamonds?.data || [];
    if (!list.length) return <p>No diamonds found for this store.</p>;

    if (view === "list") {
        return <StoneTable data={list} />;
    }

    return (
        <div
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 16, }} >
            {list.map((diamond, index) => (
                <StoneCard key={diamond.id || index} item={diamond} />
            ))}
        </div>
    );
};

export default DiamondList;

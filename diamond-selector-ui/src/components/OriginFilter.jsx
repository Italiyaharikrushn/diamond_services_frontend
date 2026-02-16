import React from 'react'
// import "../styles/stones.css";
import FilterAccordion from './FilterAccordion';
import { useSettings } from '../hooks/useSettings';
import { Box } from '@mui/material';
const OriginFilter = ({ stoneOrigin, setStoneOrigin }) => {
    const storeId = "test-store.myshopify.com";
    const { settings } = useSettings(storeId)
    const stone_type = settings?.general?.stone_config?.stone_types?.filter((item) => item?.enabled);

    return (
        <FilterAccordion title="Stone Origin">
            <Box sx={{ display: "flex", p: 0.5, borderRadius: "var(--ds-border-radius)", border: "1px solid #e2e8f0" }}>
                {stone_type?.map((item) => (
                    <Box
                        key={item?.id}
                        onClick={() => setStoneOrigin(item?.id)}
                        sx={{
                            flex: 1, textAlign: "center", py: 1, cursor: "pointer", borderRadius: "var(--ds-border-radius)",
                            bgcolor: stoneOrigin === item?.id ? "var(--ds-primary-color)" : "transparent",
                            color: stoneOrigin === item?.id ? "#fff" : "#666",
                            transition: "0.2s",
                            fontSize: "14px",
                            padding: "12px 0",
                        }}
                    >
                        {/* {type === "lab" ? "Lab" : type === "natural" ? "Natural" : "Gem"} */}
                        {item?.label}
                    </Box>
                ))}
            </Box>
        </FilterAccordion>
    )
}

export default OriginFilter

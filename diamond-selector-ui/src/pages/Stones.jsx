import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DiamondList from "../components/DiamondList";
import FilterSlider from "../components/FilterSlider";
import GemstoneList from "../components/GemstoneList";
import { useDiamonds } from "../hooks/useDiamonds";
import { useGemstones } from "../hooks/useGemstones";
import "../styles/Dashboard.css";
import { useSettings } from "../hooks/useSettings";

const Stones = () => {
  const storeId = "test-store.myshopify.com";
  const [selectedShape, setSelectedShape] = useState("");
  const [page, setPage] = useState(1);
  const { settings } = useSettings(storeId)
  const stone_type = settings?.general?.stone_config?.stone_types?.filter((item) => item?.enabled);

  const [stoneOrigin, setStoneOrigin] = useState("lab");

  const isGemstone = stoneOrigin === "gemstones";


  const { diamonds, pagination: dPag, loading: dLoad } = useDiamonds(storeId, !isGemstone ? stoneOrigin : null, page, selectedShape);
  const { gemstones, pagination: gPag, loading: gLoad } = useGemstones(storeId, isGemstone ? stoneOrigin : null, page, selectedShape);

  const activePagination = isGemstone ? gPag : dPag;
  const isLoading = isGemstone ? gLoad : dLoad;


  useEffect(() => {
    setPage(1);
    setSelectedShape("");
  }, [stoneOrigin]);


  return (
    <>

      <FilterSlider stoneOrigin={stoneOrigin} />

      <Box sx={{ display: "flex", width: "100%", gap: 3, mt: 2 }}>

        {/* SIDEBAR: FILTER SECTION */}
        <Box sx={{ width: 280, flexShrink: 0, }}>
          <Typography variant="h6" fontWeight={600} mb={1}>Stone Origin</Typography>

          {/* TABS: Lab, Natural, Gemstones */}
          <Box sx={{ display: "flex", p: 0.5, borderRadius: 1, border: "1px solid #e2e8f0" }}>
            {stone_type?.map((item) => (
              <Box
                key={item?.id}
                onClick={() => setStoneOrigin(item?.id)}
                sx={{
                  flex: 1, textAlign: "center", py: 1, cursor: "pointer", borderRadius: 1,
                  bgcolor: stoneOrigin === item?.id ? "#14532d" : "transparent",
                  color: stoneOrigin === item?.id ? "#fff" : "#666",
                  transition: "0.2s",
                  fontSize: "14px"
                }}
              >
                {/* {type === "lab" ? "Lab" : type === "natural" ? "Natural" : "Gem"} */}
                {item?.label}
              </Box>
            ))}
          </Box>
        </Box>

        {/* LIST SECTION */}
        <Box sx={{ flex: 1 }}>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "300px" }}>
              <CircularProgress size={40} thickness={4} sx={{ color: "#14532d" }} />
            </Box>
          ) : (
            <>
              {isGemstone ? (
                <GemstoneList gemstones={gemstones} />
              ) : (
                <DiamondList diamonds={diamonds} />
              )}

              {activePagination && activePagination.total_pages > 1 && (
                <Box sx={{ mt: 5, mb: 2, display: "flex", justifyContent: "end" }}>
                  <Pagination
                    page={page}
                    count={activePagination.total_pages}
                    onChange={(e, value) => {
                      setPage(value);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    color="primary"
                    shape="rounded"
                    size="large"
                    sx={{
                      '& .Mui-selected': { bgcolor: '#14532d !important' }
                    }}
                  />
                </Box>
              )}

              {((isGemstone && gemstones?.length === 0) || (!isGemstone && diamonds?.length === 0)) && (
                <Typography align="center" color="text.secondary" mt={5}>
                  No items found for the selected filters.
                </Typography>
              )}
            </>
          )}
        </Box>
      </Box >
    </>
  );
};

export default Stones;

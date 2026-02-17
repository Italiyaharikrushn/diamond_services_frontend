import { Box, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "../styles/stones.css";
import { useDiamonds } from "../hooks/useDiamonds";
import { useGemstones } from "../hooks/useGemstones";
import { useSettings } from "../hooks/useSettings";
import Loader from "../components/Loader";
import DiamondList from "../components/DiamondList";
import FilterSlider from "../components/FilterSlider";
import GemstoneList from "../components/GemstoneList";
import CaratFilter from "../components/CaratFilter";
import ClarityFilter from "../components/ClarityFilter";
import PriceFilter from "../components/PriceFilter";
import OriginFilter from "../components/OriginFilter";
import ColorFilter from "../components/ColorFilter";
import CutFilter from "../components/CutFilter";
import ReportFilter from "../components/ReportFilter";
import PolishFilter from "../components/PolishFilter";
import FluorescenceFilter from "../components/FluorescenceFilter";

const Stones = () => {
  const storeId = "test-store.myshopify.com";
  const [selectedShape, setSelectedShape] = useState([]);
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
      <Box sx={{mt: 2, mb: 2}}>
        <FilterSlider stoneOrigin={stoneOrigin} onChange={(shapes) => setSelectedShape(shapes)} />
      </Box>

      <Box sx={{ display: "flex", width: "100%", gap: 2 }}>

        <Box
          sx={{
            width: 350,
            flexShrink: 0,
            position: "sticky",
            top: 0,
            alignSelf: "flex-start",
            height: "100vh",
            overflowY: "auto",
            overflowX: "hidden"
          }}
        >
          <OriginFilter stoneOrigin={stoneOrigin} setStoneOrigin={setStoneOrigin} />
          <CaratFilter />
          <ColorFilter />
          <ClarityFilter />
          <PriceFilter />
          <CutFilter />
          <ReportFilter />
          <PolishFilter />
          <FluorescenceFilter />
        </Box>
        {/* LIST SECTION */}
        <Box sx={{ flex: 1 }}>
          {isLoading ? (
            <Loader />
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
                      '& .Mui-selected': { bgcolor: 'var(--ds-primary-color) !important' }
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

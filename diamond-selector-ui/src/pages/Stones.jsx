import { Box, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "../styles/stones.css";
import { useDiamonds } from "../hooks/useDiamonds";
import { useGemstones } from "../hooks/useGemstones";
import { useSettings } from "../hooks/useSettings";
import { useStoneView } from "../hooks/useStoneView";
import Loader from "../components/Loader";
import DiamondList from "../components/DiamondList";
import GemstoneList from "../components/GemstoneList";
import OriginFilter from "../components/OriginFilter";
import ShapeSlider from "../components/ShapeSlider";
import StoneFilter from "../components/StoneFilter";
import StoneHeader from "../components/StoneHeader";

const Stones = () => {
  const storeId = "test-store.myshopify.com";
  const { settings } = useSettings(storeId);
  const [stoneOrigin, setStoneOrigin] = useState("lab");
  const { view, setView, allowedViews } = useStoneView(settings);
  const [selectedShape, setSelectedShape] = useState([]);
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    carat: [0, 15],
    price: [0, 5000],
    color: [],
    clarity: [],
  });

  const isGemstone = stoneOrigin === "gemstones";
  const { diamonds, pagination: dPag, loading: dLoad } = useDiamonds(storeId, !isGemstone ? stoneOrigin : null, page, selectedShape, filters);
  const { gemstones, pagination: gPag, loading: gLoad } = useGemstones(storeId, isGemstone ? stoneOrigin : null, page, selectedShape, filters);

  const activePagination = isGemstone ? gPag : dPag;
  const isLoading = isGemstone ? gLoad : dLoad;

  useEffect(() => {
    setPage(1);
    setSelectedShape([]);

    setFilters({
      carat: [0, 15],
      price: [0, 5000],
      color: [],
      clarity: [],
      cut: [],
      polish: [],
      fluorescence: [],
      report: []
    });
  }, [stoneOrigin]);

  return (
    <>
      <Box sx={{ mt: 2, mb: 2 }}>
        <ShapeSlider stoneOrigin={stoneOrigin} onChange={(shapes) => setSelectedShape(shapes)} />
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
          <StoneFilter stoneOrigin={stoneOrigin} filters={filters} setFilters={setFilters} />
        </Box>
        {/* LIST SECTION */}
        <Box sx={{ flex: 1 }}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {/* Data Count & Grid / View Icon */}
              <StoneHeader count={activePagination?.total} view={view} setView={setView} allowedViews={allowedViews} />

              {isGemstone ? (
                <GemstoneList gemstones={gemstones} view={view} allowedViews={allowedViews} />
              ) : (
                <DiamondList diamonds={diamonds} view={view} allowedViews={allowedViews} />
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

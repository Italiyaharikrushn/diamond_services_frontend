import { Box, Paper, Typography, Divider } from "@mui/material";
import { useState } from "react";
import { DropdownIcon } from "../../components/dropdown";
import PageTitleSection from "../../components/PageTitleSection";
import StoneTitleSection from "../../components/StoneTitleSection";
import PaginationSection from "../../components/PaginationSection";
import SelectedViewSection from "../../components/SelectedViewSection";
import SortingOptionsSection from "../../components/SortingOptionsSection";
import SelectedDetailsSection from "../../components/SelectedDetailsSection";
import { useAppearanceSettings } from "../../utils/useAppearanceSettings";

const Appearance = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { listingPage, viewPage, handleUpdate, handleDetailToggle, handleSelectedViewToggle, handleSortingToggle, handleDefaultSortUpdate, } = useAppearanceSettings();

  const resultStyle = listingPage?.result_style || "paginated";

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{ p: 2, mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", borderBottom: "1px solid #eee" }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 600 }}>
          Stone Listing Page Settings
        </Typography>
        <DropdownIcon isExpanded={isExpanded} />
      </Paper>

      {isExpanded && (
        <>
          <PageTitleSection
            value={listingPage?.page_title || ""}
            onChange={(val) => handleUpdate("stone_appearance.listing_page.page_title", val)}
          />

          <Divider sx={{ my: 4 }} />

          <StoneTitleSection
            value={viewPage?.stone_title}
            onChange={(val) => handleUpdate("stone_appearance.view_page.stone_title", val)}
          />

          <Divider sx={{ my: 4 }} />

          <PaginationSection
            resultStyle={resultStyle}
            onChange={(e) => handleUpdate("stone_appearance.listing_page.result_style", e.target.value)}
          />

          <Divider sx={{ my: 4 }} />

          {/* Reusable View Section */}
          <SelectedViewSection
            selected_view={listingPage?.selected_view}
            default_view={listingPage?.default_view}
            onToggleView={handleSelectedViewToggle}
            onUpdateDefault={(val) => handleUpdate("stone_appearance.listing_page.default_view", val)}
          />

          <Divider sx={{ my: 4 }} />

          <SortingOptionsSection
            sorting_options={listingPage?.sorting_options}
            default_sort={listingPage?.default_sort}
            onToggleSort={handleSortingToggle}
            onUpdateDefaultSort={handleDefaultSortUpdate}
          />

          <Divider sx={{ my: 4 }} />

          {/* Reusable Details Section */}
          <SelectedDetailsSection
            selected_details={viewPage?.selected_details}
            onToggleDetail={handleDetailToggle}
          />
        </>
      )}
    </Box>
  );
};

export default Appearance;

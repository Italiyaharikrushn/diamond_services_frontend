import React, { useState } from "react";
import { Box, Typography, Paper, Divider, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem, Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateSettingByPath } from "../../redux/settingsSlice";

import RichTextEditor from "../../components/RichTextEditor";
import { DropdownIcon } from "../../components/dropdown";
import { SettingRow } from "../../components/SettingRow";
import SelectedViewSection from "../../components/SelectedViewSection";
import SelectedDetailsSection from "../../components/SelectedDetailsSection";

const Appearance = () => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(true);
  const settings = useSelector((state) => state.settings.settings);

  console.log("-------settings-----", settings);
  const listingPage = settings?.stone_appearance?.listing_page;
  const viewPage = settings?.stone_appearance?.view_page;
  const resultStyle = listingPage?.result_style || "paginated";

  const handleUpdate = (path, value) => {
    dispatch(updateSettingByPath({ path, value }));
  };

  const handleDetailToggle = (id) => {
    const selected_details = viewPage?.selected_details || [];
    const updatedDetails = selected_details.map((detail) =>
      detail.id === id ? { ...detail, enabled: !detail.enabled } : detail
    );
    handleUpdate("stone_appearance.view_page.selected_details", updatedDetails);
  };

  const handleSelectedViewToggle = (id) => {
    const selected_view = listingPage?.selected_view || [];
    const enabledViews = selected_view.filter((v) => v.enabled);

    if (enabledViews.length === 1 && enabledViews[0].id === id) return;

    const updatedViews = selected_view.map((view) =>
      view.id === id ? { ...view, enabled: !view.enabled } : view
    );

    handleUpdate("stone_appearance.listing_page.selected_view", updatedViews);

    const updatedEnabled = updatedViews.filter((v) => v.enabled);
    if (!updatedEnabled.find((v) => v.id === listingPage?.default_view)) {
      handleUpdate("stone_appearance.listing_page.default_view", updatedEnabled[0].id);
    }
  };

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
        <Box>
          <SettingRow title="Page Title" isTopAligned>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
              <RichTextEditor
                value={listingPage?.page_title || ""}
                onChange={(val) => handleUpdate("stone_appearance.listing_page.page_title", val)}
                minHeight={60}
              />
            </Paper>
          </SettingRow>

          <Divider sx={{ my: 4 }} />

          <SettingRow title="Stone Title" subtitle="Template: {carat} Carat {shape}..." isTopAligned>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
              <RichTextEditor
                value={viewPage?.stone_title || ""}
                onChange={(val) => handleUpdate("stone_appearance.view_page.stone_title", val)}
                minHeight={80}
              />
            </Paper>
          </SettingRow>

          <Divider sx={{ my: 4 }} />

          <SettingRow title="Pagination Options">
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
              <Box display="flex" gap={4}>

                <Box flex={1}>
                  <FormLabel sx={{ mb: 1, display: "block", fontWeight: 500 }}>
                    Select result style
                  </FormLabel>

                  <RadioGroup value={resultStyle} onChange={(e) => handleUpdate("stone_appearance.listing_page.result_style", e.target.value)}>
                    <FormControlLabel
                      value="paginated"
                      control={<Radio />}
                      label="Paginated"
                    />
                    <FormControlLabel
                      value="infinite"
                      control={<Radio />}
                      label="Infinite Scroll"
                    />
                  </RadioGroup>

                  {resultStyle === "paginated" && (
                    <>
                      <Typography sx={{ mt: 2, mb: 1, fontWeight: 500 }}>
                        Select pagination style
                      </Typography>

                      <Select fullWidth size="small" value={1}>
                        <MenuItem value={1}>Pagination 1</MenuItem>
                      </Select>
                    </>
                  )}
                </Box>

                <Box
                  flex={1}
                  display="flex"
                  flexDirection="column"
                  justifyContent="end"
                >
                  <Typography sx={{ mb: 1, fontWeight: 500 }}>
                    Preview:
                  </Typography>

                  {resultStyle === "paginated" ? (
                    <Pagination
                      count={10}
                      page={1}
                      siblingCount={1}
                      boundaryCount={1}
                      showFirstButton={false}
                      showLastButton={false}
                    />
                  ) : (
                    <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                      Infinite scroll preview (loads on scroll)
                    </Typography>
                  )}
                </Box>

              </Box>
            </Paper>
          </SettingRow>

          <Divider sx={{ my: 4 }} />

          {/* Reusable View Section */}
          <SelectedViewSection
            selected_view={listingPage?.selected_view}
            default_view={listingPage?.default_view}
            onToggleView={handleSelectedViewToggle}
            onUpdateDefault={(val) => handleUpdate("stone_appearance.listing_page.default_view", val)}
          />

          <Divider sx={{ my: 4 }} />

          {/* Reusable Details Section */}
          <SelectedDetailsSection
            selected_details={viewPage?.selected_details}
            onToggleDetail={handleDetailToggle}
          />
        </Box>
      )}
    </Box>
  );
};

export default Appearance;

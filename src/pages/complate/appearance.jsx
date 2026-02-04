// import React from "react";
// import RichTextEditor from "../../components/RichTextEditor";
// import { DropdownIcon } from "../../components/dropdown";
// import { Box, Typography, Paper, Checkbox, FormControlLabel, Radio, RadioGroup, Stack, Grid } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { updateSettingByPath } from "../../redux/settingsSlice";
// import { SettingRow } from "../../components/SettingRow";

// const Appearance = () => {
//     const dispatch = useDispatch();
//     const [isExpanded, setIsExpanded] = React.useState(true);

//     const settings = useSelector((state) => state.settings.settings);

//     const listingPage = settings?.stone_appearance?.listing_page;
//     const viewPage = settings?.stone_appearance?.view_page;
//     const selected_details = viewPage?.selected_details;

//     const selected_view = listingPage?.selected_view;

//     console.log("----------------", selected_view)

//     const handleUpdate = (path, value) => {
//         dispatch(updateSettingByPath({ path, value }));
//     };

//     const handleDetailToggle = (id) => {
//         if (!Array.isArray(selected_details)) return;

//         const updatedDetails = selected_details.map(detail => {
//             if (detail.id !== id) return detail;
//             return {
//                 ...detail,
//                 enabled: !detail.enabled
//             };
//         });

//         dispatch(
//             updateSettingByPath({
//                 path: "stone_appearance.view_page.selected_details",
//                 value: [...updatedDetails],
//             })
//         );
//     };

//     const handleSelectedViewToggle = (id) => {
//         if (!Array.isArray(selected_view)) return;

//         const enabledViews = selected_view.filter(v => v.enabled);

//         if (enabledViews.length === 1 && enabledViews[0].id === id) {
//             return;
//         }

//         const updatedViews = selected_view.map(view =>
//             view.id === id
//                 ? { ...view, enabled: !view.enabled }
//                 : view
//         );

//         handleUpdate(
//             "stone_appearance.listing_page.selected_view",
//             updatedViews
//         );

//         const updatedEnabled = updatedViews.filter(v => v.enabled);

//         if (
//             !updatedEnabled.find(v => v.id === listingPage?.default_view)
//         ) {
//             handleUpdate(
//                 "stone_appearance.listing_page.default_view",
//                 updatedEnabled[0].id
//             );
//         }
//     };

//     return (
//         <Box>
//             <Paper
//                 elevation={0}
//                 sx={{ p: 2, mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", borderBottom: "1px solid #eee", }}
//                 onClick={() => setIsExpanded((prev) => !prev)}
//             >
//                 <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 600 }}>
//                     Stone Listing Page Settings
//                 </Typography>
//                 <DropdownIcon isExpanded={isExpanded} />
//             </Paper>

//             {isExpanded && (
//                 <Stack>
//                     <SettingRow title="Page Title" isTopAligned>
//                         <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
//                             <RichTextEditor
//                                 value={listingPage?.page_title || ""}
//                                 onChange={(val) =>
//                                     handleUpdate(
//                                         "stone_appearance.listing_page.page_title",
//                                         val
//                                     )
//                                 }
//                                 minHeight={60}
//                             />
//                         </Paper>
//                     </SettingRow>

//                     <SettingRow
//                         title="Stone Title"
//                         subtitle="Template: {carat} Carat {shape}..."
//                         isTopAligned
//                     >
//                         <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
//                             <RichTextEditor
//                                 value={viewPage?.stone_title || ""}
//                                 onChange={(val) =>
//                                     handleUpdate(
//                                         "stone_appearance.view_page.stone_title",
//                                         val
//                                     )
//                                 }
//                                 minHeight={80}
//                             />
//                         </Paper>
//                     </SettingRow>

//                     {/* Selected View */}
//                     <SettingRow title="Selected View">
//                         <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>

//                             <Stack direction="row" spacing={3} sx={{ mb: 2 }}>
//                                 {selected_view?.map((view) => (
//                                     <FormControlLabel
//                                         key={view.id}
//                                         control={
//                                             <Checkbox
//                                                 checked={!!view.enabled}
//                                                 onChange={() => handleSelectedViewToggle(view.id)}
//                                             />
//                                         }
//                                         label={view.label}
//                                     />
//                                 ))}
//                             </Stack>

//                             <Typography sx={{ mb: 1, fontWeight: 500 }}>
//                                 Default View
//                             </Typography>

//                             <RadioGroup
//                                 row
//                                 value={listingPage?.default_view || "grid"}
//                                 onChange={(e) =>
//                                     handleUpdate(
//                                         "stone_appearance.listing_page.default_view",
//                                         e.target.value
//                                     )
//                                 }
//                             >
//                                 {selected_view?.map(view => (
//                                     <FormControlLabel
//                                         key={view.id}
//                                         value={view.id}
//                                         control={<Radio />}
//                                         label={`${view.label} View`}
//                                         disabled={!view.enabled}   // 👈 IMPORTANT LINE
//                                     />
//                                 ))}
//                             </RadioGroup>


//                         </Paper>
//                     </SettingRow>

//                     <SettingRow
//                         title="Selected Details"
//                         subtitle="Manage which details appear on the stone cards."
//                     >
//                         <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
//                             <Grid container spacing={1}>
//                                 {selected_details?.map((detail) => (
//                                     <Grid item xs={6} key={detail.id}>
//                                         <FormControlLabel
//                                             control={
//                                                 <Checkbox
//                                                     checked={!!detail.enabled}
//                                                     onChange={() => handleDetailToggle(detail.id)}
//                                                 />
//                                             }
//                                             label={detail.label}
//                                         />
//                                     </Grid>
//                                 ))}
//                             </Grid>
//                         </Paper>
//                     </SettingRow>

//                 </Stack>
//             )}
//         </Box>
//     );
// };

// export default Appearance;

import React, { useState } from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
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
        <Stack spacing={2}>
          <SettingRow title="Page Title" isTopAligned>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
              <RichTextEditor
                value={listingPage?.page_title || ""}
                onChange={(val) => handleUpdate("stone_appearance.listing_page.page_title", val)}
                minHeight={60}
              />
            </Paper>
          </SettingRow>

          <SettingRow title="Stone Title" subtitle="Template: {carat} Carat {shape}..." isTopAligned>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
              <RichTextEditor
                value={viewPage?.stone_title || ""}
                onChange={(val) => handleUpdate("stone_appearance.view_page.stone_title", val)}
                minHeight={80}
              />
            </Paper>
          </SettingRow>

          {/* Reusable View Section */}
          <SelectedViewSection
            selected_view={listingPage?.selected_view}
            default_view={listingPage?.default_view}
            onToggleView={handleSelectedViewToggle}
            onUpdateDefault={(val) => handleUpdate("stone_appearance.listing_page.default_view", val)}
          />

          {/* Reusable Details Section */}
          <SelectedDetailsSection
            selected_details={viewPage?.selected_details}
            onToggleDetail={handleDetailToggle}
          />
        </Stack>
      )}
    </Box>
  );
};

export default Appearance;

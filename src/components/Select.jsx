// import React, { useEffect } from "react"
// import Slider from "@mui/material/Slider";
// import { useGetGemstoneFiltersQuery } from "../api/gemstoneApi";
// import { useGetDiamondFiltersQuery } from "../api/diamondApi";
// import Checkbox from "@mui/material/Checkbox";
// import FilterListIcon from '@mui/icons-material/FilterList';
// import RestartAltIcon from '@mui/icons-material/RestartAlt';
// import { FormControl, MenuItem, Select, Box, Typography, Button, TextField, Paper, ListItemText } from "@mui/material"

// const Filterselects = ({ filters, setFilters }) => {
//     const { data: gemstoneFilterRes } = useGetGemstoneFiltersQuery({
//         stone_type: filters.stone_type || undefined
//     }, { skip: filters.stone_type === "lab" || filters.stone_type === "natural" });

//     const { data: diamondFilterRes } = useGetDiamondFiltersQuery({
//         stone_type: filters.stone_type || undefined
//     }, { skip: !["lab", "natural"].includes(filters.stone_type) });

//     const isDiamond = ["lab", "natural"].includes(filters.stone_type?.toLowerCase());
//     const filterRes = isDiamond ? diamondFilterRes : gemstoneFilterRes;

//     useEffect(() => {
//         if (filterRes?.data) {
//             setFilters(p => ({
//                 ...p,
//                 price: p.price.length ? p.price : [priceRangeUI?.min || 0, priceRangeUI?.max || 0],
//                 carat: p.carat.length ? p.carat : [caratRangeUI?.min || 0, caratRangeUI?.max || 0]
//             }));
//         }
//     }, [filterRes]);

//     const handleReset = () => {
//         if (filterRes?.data) {
//             const priceData = isDiamond ? filterRes.data.price_range : filterRes.data.price_ranges;
//             const caratData = isDiamond ? filterRes.data.carat_range : filterRes.data.carat_ranges;

//             setFilters({
//                 ...filters,
//                 color: [],
//                 clarity: "",
//                 price: [priceData?.min, priceData?.max],
//                 carat: [caratData?.min, caratData?.max]
//             });
//         }
//     };
//     const handleMenuClick = (e) => {
//         e.stopPropagation();
//     }

//     const handleToggleFilter = (key, value) => {
//         setFilters(prev => {
//             const current = prev[key] || [];
//             const next = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
//             return { ...prev, [key]: next };
//         });
//     };

//     const priceRangeUI = isDiamond ? filterRes?.data?.price_range : filterRes?.data?.price_ranges;
//     const caratRangeUI = isDiamond ? filterRes?.data?.carat_range : filterRes?.data?.carat_ranges;

//     const handleInputChange = (key, index, value, min, max) => {
//         let newValue = value === "" ? "" : Number(value);

//         setFilters(prev => {
//             const updatedRange = [...prev[key]];
//             updatedRange[index] = newValue;
//             return { ...prev, [key]: updatedRange };
//         });
//     };

//     const handleBlur = (key, min, max) => {
//         setFilters(prev => {
//             let [valMin, valMax] = prev[key];
//             if (valMin < min) valMin = min;
//             if (valMax > max) valMax = max;
//             if (valMin > valMax) valMin = valMax;
//             return { ...prev, [key]: [valMin, valMax] };
//         });
//     };

//     return (
//         <Paper elevation={0} sx={{ p: 2, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', bgcolor: 'transparent' }}>

//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 1 }}>
//                 <FilterListIcon />
//                 <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#555' }}>FILTERS:</Typography>
//             </Box>

//             {/* COLOR POPUP SELECT */}
//             <FormControl size="small" sx={{ minWidth: 150 }}>
//                 <Select
//                     multiple
//                     displayEmpty
//                     value={filters.color || []}
//                     renderValue={() => "Select Color"}
//                     sx={{ bgcolor: 'white' }}
//                 >
//                     <Box sx={{ p: 1, minWidth: 200, maxHeight: 300, overflowY: 'auto' }}>
//                         <Typography variant="caption" sx={{ px: 2, py: 1, display: 'block', color: 'text.secondary' }}>
//                             Choose Colors
//                         </Typography>
//                         {filterRes?.data?.colors?.map((c) => (
//                             <MenuItem
//                                 key={c}
//                                 value={c}
//                                 onClick={() => handleToggleFilter('color', c)}
//                                 sx={{ borderRadius: 1 }}
//                             >
//                                 <Checkbox size="small" checked={(filters.color || []).includes(c)} />
//                                 <ListItemText primary={c} />
//                             </MenuItem>
//                         ))}
//                     </Box>
//                 </Select>
//             </FormControl>

            // {/* CLARITY SELECT */}
            // <FormControl size="small" sx={{ minWidth: 150 }}>
            //     <Select
            //         multiple
            //         displayEmpty
            //         value={filters.clarity || []}
            //         renderValue={() => "Select Clarity"}
            //         sx={{ bgcolor: 'white' }}
            //     >
            //         <Box sx={{ p: 1, minWidth: 200, maxHeight: 300, overflowY: 'auto' }}>
            //             <Typography variant="caption" sx={{ px: 2, py: 1, display: 'block', color: 'text.secondary' }}>
            //                 Choose Clarities
            //             </Typography>
            //             {filterRes?.data?.clarities?.map((c) => (
            //                 <MenuItem
            //                     key={c}
            //                     value={c}
            //                     onClick={() => handleToggleFilter('clarity', c)}
            //                     sx={{ borderRadius: 1 }}
            //                 >
            //                     <Checkbox size="small" checked={(filters.clarity || []).includes(c)} />
            //                     <ListItemText primary={c} />
            //                 </MenuItem>
            //             ))}
            //         </Box>
            //     </Select>
            // </FormControl>

//             {/* PRICE SLIDER IN SELECT */}
//             <FormControl size="small" sx={{ minWidth: 160 }}>
//                 <Select
//                     displayEmpty
//                     value=""
//                     renderValue={() => `Price Range`}
//                     MenuProps={{
//                         PaperProps: {
//                             onPointerDown: (e) => e.stopPropagation(),
//                         }
//                     }}
//                 >
//                     <MenuItem disableRipple sx={{ "&:hover": { bgcolor: "transparent" }, cursor: "default", p: 0 }}>
//                         <Box
//                             sx={{ px: 3, py: 2, width: 280 }}
//                             onKeyDown={(e) => e.stopPropagation()}
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             <Typography variant="subtitle2" sx={{ mb: 2 }}>Select Price</Typography>
//                             <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
//                                 <TextField
//                                     label="Min"
//                                     size="small"
//                                     type="number"
//                                     value={filters.price[0]}
//                                     onChange={(e) => handleInputChange('price', 0, e.target.value)}
//                                     onBlur={() => handleBlur('price', priceRangeUI?.min, priceRangeUI?.max)}
//                                     onMouseDown={(e) => e.stopPropagation()}
//                                 />
//                                 <TextField
//                                     label="Max"
//                                     size="small"
//                                     type="number"
//                                     value={filters.price[1]}
//                                     onChange={(e) => handleInputChange('price', 1, e.target.value)}
//                                     onBlur={() => handleBlur('price', priceRangeUI?.min, priceRangeUI?.max)}
//                                     onMouseDown={(e) => e.stopPropagation()}
//                                 />
//                             </Box>
//                             <Slider
//                                 value={[Number(filters.price[0]), Number(filters.price[1])]}
//                                 onChange={(e, val) => setFilters(prev => ({ ...prev, price: val }))}
//                                 min={priceRangeUI?.min || 0}
//                                 max={priceRangeUI?.max || 0}
//                                 valueLabelDisplay="auto"
//                             />
//                         </Box>
//                     </MenuItem>
//                 </Select>
//             </FormControl>

//             {/* CARAT SLIDER IN SELECT */}
//             <FormControl size="small" sx={{ minWidth: 160 }}>
//                 <Select
//                     displayEmpty
//                     value=""
//                     renderValue={() => `Carat Range`}
//                     MenuProps={{
//                         PaperProps: {
//                             onPointerDown: (e) => e.stopPropagation(),
//                         }
//                     }}
//                 >
//                     <MenuItem disableRipple sx={{ "&:hover": { bgcolor: "transparent" }, cursor: "default", p: 0 }}>
//                         <Box
//                             sx={{ px: 3, py: 2, width: 280 }}
//                             onKeyDown={(e) => e.stopPropagation()}
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             <Typography variant="subtitle2" sx={{ mb: 2 }}>Select Carat</Typography>
//                             <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
//                                 <TextField
//                                     label="Min"
//                                     size="small"
//                                     type="number"
//                                     inputProps={{ step: 0.01 }}
//                                     value={filters.carat[0]}
//                                     onChange={(e) => handleInputChange('carat', 0, e.target.value)}
//                                     onBlur={() => handleBlur('carat', caratRangeUI?.min, caratRangeUI?.max)}
//                                     onMouseDown={(e) => e.stopPropagation()}
//                                 />
//                                 <TextField
//                                     label="Max"
//                                     size="small"
//                                     type="number"
//                                     inputProps={{ step: 0.01 }}
//                                     value={filters.carat[1]}
//                                     onChange={(e) => handleInputChange('carat', 1, e.target.value)}
//                                     onBlur={() => handleBlur('carat', caratRangeUI?.min, caratRangeUI?.max)}
//                                     onMouseDown={(e) => e.stopPropagation()}
//                                 />
//                             </Box>
//                             <Slider
//                                 value={[Number(filters.carat[0]), Number(filters.carat[1])]}
//                                 onChange={(e, val) => setFilters(prev => ({ ...prev, carat: val }))}
//                                 min={caratRangeUI?.min || 0}
//                                 max={caratRangeUI?.max || 0}
//                                 step={0.01}
//                                 valueLabelDisplay="auto"
//                             />
//                         </Box>
//                     </MenuItem>
//                 </Select>
//             </FormControl>

//             <Button
//                 variant="text"
//                 size="small"
//                 startIcon={<RestartAltIcon />}
//                 onClick={handleReset}
//                 sx={{
//                     color: '#d32f2f',
//                     fontWeight: 'bold',
//                     ml: 'auto',
//                     bgcolor: 'white',
//                     border: '1px solid rgba(0,0,0,0.23)',
//                     borderRadius: 1,
//                     px: 2,
//                     py: 0.9,
//                     textTransform: 'none',
//                     '&:hover': { bgcolor: '#ffebee' }
//                 }}
//             >
//                 RESET
//             </Button>
//         </Paper>
//     )
// }

// export default Filterselects;

import React from "react"
import FilterSelects from "./FilterSelects";

const Filterselects = ({ filters, setFilters }) => {
    return (
        <FilterSelects filters={filters} setFilters={setFilters} />
    )
}

export default Filterselects;

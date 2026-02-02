import React from "react";
import { Slider, Checkbox, FormControl, MenuItem, Select, Box, Typography, Button, TextField, Paper, ListItemText } from "@mui/material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useFilters } from "../utils/useFilters";

const FilterSelects = ({ filters, setFilters }) => {
    const { filterRes, priceRangeUI, caratRangeUI, handleReset, handleToggleFilter, handleInputChange, handleBlur } = useFilters(filters, setFilters);

    return (
        <Paper elevation={0} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', bgcolor: 'transparent' }}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
                <Select
                    multiple displayEmpty
                    value={filters.color || []}
                    renderValue={() => "Select Color"}
                    sx={{ bgcolor: 'white' }}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                marginTop: 1,
                            }
                        },
                    }}
                >
                    <Box sx={{ p: 1, minWidth: 200, maxHeight: 400, overflowY: 'auto' }}>
                        {filterRes?.data?.colors?.map((c) => (
                            <MenuItem key={c} onClick={() => handleToggleFilter('color', c)}>
                                <Checkbox size="small" checked={(filters.color || []).includes(c)} />
                                <ListItemText primary={c} />
                            </MenuItem>
                        ))}
                    </Box>
                </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
                <Select multiple displayEmpty value={filters.clarity || []} renderValue={() => "Select Clarity"} sx={{ bgcolor: 'white' }} MenuProps={{ PaperProps: { sx: { marginTop: 1, } }, }}>
                    <Box sx={{ p: 1, minWidth: 200, maxHeight: 400, overflowY: 'auto' }}>
                        <Typography variant="caption" sx={{ px: 2, py: 1, display: 'block', color: 'text.secondary' }}>
                            Choose Clarities
                        </Typography>
                        {filterRes?.data?.clarities?.map((c) => (
                            <MenuItem key={c} value={c} onClick={() => handleToggleFilter('clarity', c)} sx={{ borderRadius: 1 }} >
                                <Checkbox size="small" checked={(filters.clarity || []).includes(c)} />
                                <ListItemText primary={c} />
                            </MenuItem>
                        ))}
                    </Box>
                </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 160 }}>
                <Select displayEmpty value="" renderValue={() => `Price Range`} sx={{ bgcolor: 'white' }} MenuProps={{ PaperProps: { sx: { marginTop: 1, } }, }}>
                    <MenuItem sx={{ "&:hover": { bgcolor: "white" }, cursor: "default" }}>
                        <Box sx={{ py: 2, width: 350 }} onClick={(e) => e.stopPropagation()}>
                            <Typography variant="subtitle2">Select Price Range</Typography>
                            <Slider
                                value={[Number(filters.price[0]), Number(filters.price[1])]}
                                onChange={(e, val) => setFilters(prev => ({ ...prev, price: val }))}
                                min={priceRangeUI?.min || 0}
                                max={priceRangeUI?.max || 0}
                                valueLabelDisplay="auto"
                            />
                            <Box sx={{ display: 'flex', width: "100%", justifyContent: 'space-between', alignItems: 'center' }}>
                                <TextField
                                    label="Min" size="small" type="number"
                                    value={filters.price[0]}
                                    onChange={(e) => handleInputChange('price', 0, e.target.value)}
                                    onBlur={() => handleBlur('price', priceRangeUI?.min, priceRangeUI?.max)}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    sx={{ width: '95px' }}
                                />
                                <TextField
                                    label="Max" size="small" type="number"
                                    value={filters.price[1]}
                                    onChange={(e) => handleInputChange('price', 1, e.target.value)}
                                    onBlur={() => handleBlur('price', priceRangeUI?.min, priceRangeUI?.max)}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    sx={{ width: '95px' }}
                                />
                            </Box>
                        </Box>
                    </MenuItem>
                </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 160 }}>
                <Select
                    displayEmpty
                    value=""
                    renderValue={() => `Carat Range`}
                    sx={{ bgcolor: 'white' }}
                    MenuProps={{
                        PaperProps: {
                            onPointerDown: (e) => e.stopPropagation(),
                            sx: { marginTop: 1 }
                        }
                    }}
                >
                    <MenuItem sx={{ "&:hover": { bgcolor: "white" }, cursor: "default" }}>
                        <Box
                            sx={{ py: 2, width: 350, height: 130 }}
                            onKeyDown={(e) => e.stopPropagation()}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Typography variant="subtitle2">Select Carat Range</Typography>
                            <Slider
                                value={[Number(filters.carat[0]), Number(filters.carat[1])]}
                                onChange={(e, val) => setFilters(prev => ({ ...prev, carat: val }))}
                                min={caratRangeUI?.min || 0}
                                max={caratRangeUI?.max || 0}
                                step={0.01}
                                valueLabelDisplay="auto"
                            />
                            <Box sx={{ display: 'flex', width: "100%", justifyContent: 'space-between', alignItems: 'center' }}>
                                <TextField
                                    label="Min"
                                    size="small"
                                    type="number"

                                    inputProps={{ step: 0.01 }}
                                    value={filters.carat[0]}
                                    onChange={(e) => handleInputChange('carat', 0, e.target.value)}
                                    onBlur={() => handleBlur('carat', caratRangeUI?.min, caratRangeUI?.max)}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    sx={{ width: '90px' }}
                                />
                                <TextField
                                    label="Max"
                                    size="small"
                                    type="number"
                                    inputProps={{ step: 0.01 }}
                                    value={filters.carat[1]}
                                    onChange={(e) => handleInputChange('carat', 1, e.target.value)}
                                    onBlur={() => handleBlur('carat', caratRangeUI?.min, caratRangeUI?.max)}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    sx={{ width: '90px' }}
                                />
                            </Box>
                        </Box>
                    </MenuItem>
                </Select>
            </FormControl>

            {/* RESET BUTTON */}
            <Button
                variant="text" startIcon={<RestartAltIcon />}
                onClick={handleReset}
                sx={{ ml: 'auto', bgcolor: 'white', border: '1px solid rgba(0,0,0,0.23)', textTransform: 'none', color: '#d32f2f' }}
            >
                RESET
            </Button>
        </Paper>
    );
};

export default FilterSelects;

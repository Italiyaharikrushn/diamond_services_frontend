import React, { useEffect } from "react"
import Slider from "@mui/material/Slider";
import { useGetGemstoneFiltersQuery } from "../redux/api/gemstoneApi";
import { useGetDiamondFiltersQuery } from "../redux/api/diamondApi";
import FilterListIcon from '@mui/icons-material/FilterList';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { FormControl, MenuItem, Select, Box, Typography, Button, InputLabel, Paper } from "@mui/material"

const Filterselects = ({ filters, setFilters }) => {
    const { data: gemstoneFilterRes } = useGetGemstoneFiltersQuery({
        stone_type: filters.stone_type || undefined
    }, { skip: filters.stone_type === "lab" || filters.stone_type === "natural" });

    const { data: diamondFilterRes } = useGetDiamondFiltersQuery({
        stone_type: filters.stone_type || undefined
    }, { skip: !["lab", "natural"].includes(filters.stone_type) });

    const isDiamond = ["lab", "natural"].includes(filters.stone_type?.toLowerCase());
    const filterRes = isDiamond ? diamondFilterRes : gemstoneFilterRes;

    useEffect(() => {
        if (filterRes?.data) {
            setFilters(p => ({
                ...p,
                price: p.price.length ? p.price : [priceRangeUI?.min || 0, priceRangeUI?.max || 0],
                carat: p.carat.length ? p.carat : [caratRangeUI?.min || 0, caratRangeUI?.max || 0]
            }));
        }
    }, [filterRes]);

    const handleReset = () => {
        if (filterRes?.data) {
            const priceData = isDiamond ? filterRes.data.price_range : filterRes.data.price_ranges;
            const caratData = isDiamond ? filterRes.data.carat_range : filterRes.data.carat_ranges;

            setFilters({
                ...filters,
                color: "",
                clarity: "",
                price: [priceData?.min, priceData?.max],
                carat: [caratData?.min, caratData?.max]
            });
        }
    };

    const priceRangeUI = isDiamond ? filterRes?.data?.price_range : filterRes?.data?.price_ranges;
    const caratRangeUI = isDiamond ? filterRes?.data?.carat_range : filterRes?.data?.carat_ranges;

    return (
        <Paper elevation={0} sx={{ p: 2, mb: 2, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', bgcolor: '#f8f9fa', borderRadius: 2, border: '1px solid #e0e0e0' }}>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 1 }}>
                <FilterListIcon color="action" />
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#555' }}>FILTERS:</Typography>
            </Box>

            {/* COLOR SELECT */}
            <FormControl size="small" sx={{ minWidth: 130 }}>
                <InputLabel>Color</InputLabel>
                <Select
                    label="Color"
                    value={filters.color}
                    onChange={(e) => setFilters(p => ({ ...p, color: e.target.value }))}
                    sx={{ bgcolor: 'white' }}
                >
                    <MenuItem value=""><em>All Colors</em></MenuItem>
                    {filterRes?.data?.colors?.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </Select>
            </FormControl>

            {/* CLARITY SELECT */}
            <FormControl size="small" sx={{ minWidth: 130 }}>
                <InputLabel>Clarity</InputLabel>
                <Select
                    label="Clarity"
                    value={filters.clarity}
                    onChange={(e) => setFilters(p => ({ ...p, clarity: e.target.value }))}
                    sx={{ bgcolor: 'white' }}
                >
                    <MenuItem value=""><em>All Clarities</em></MenuItem>
                    {filterRes?.data?.clarities?.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </Select>
            </FormControl>

            {/* PRICE SLIDER IN SELECT */}
            <FormControl size="small" sx={{ minWidth: 160 }}>
                <Select
                    displayEmpty
                    value={filters.price}
                    renderValue={(selected) => `Select Price`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Box sx={{ px: 3, py: 2, width: 250 }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
                            Select Price Range
                        </Typography>
                        <Slider
                            value={filters.price}
                            onChange={(e, val) => setFilters(prev => ({ ...prev, price: val }))}
                            min={priceRangeUI?.min || 0}
                            max={priceRangeUI?.max || 0}
                            valueLabelDisplay="auto"
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                            <Typography variant="caption">${filters.price[0]}</Typography>
                            <Typography variant="caption">${filters.price[1]}</Typography>
                        </Box>
                    </Box>
                </Select>
            </FormControl>

            {/* CARAT SLIDER IN SELECT */}
            <FormControl size="small" sx={{ minWidth: 160 }}>
                <Select
                    displayEmpty
                    value={filters.carat}
                    renderValue={(selected) => `Select Carat`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Box sx={{ px: 3, py: 2, width: 250 }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
                            Select Carat Range
                        </Typography>
                        <Slider
                            value={filters.carat}
                            onChange={(e, val) => setFilters(prev => ({ ...prev, carat: val }))}
                            min={caratRangeUI?.min || 0}
                            max={caratRangeUI?.max || 0}
                            valueLabelDisplay="auto"
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                            <Typography variant="caption">{filters.carat[0]} ct</Typography>
                            <Typography variant="caption">{filters.carat[1]} ct</Typography>
                        </Box>
                    </Box>
                </Select>
            </FormControl>

            <Button
                variant="text"
                size="small"
                startIcon={<RestartAltIcon />}
                onClick={handleReset}
                sx={{ color: '#d32f2f', fontWeight: 'bold', ml: 'auto', '&:hover': { bgcolor: '#ffebee' } }}
            >
                RESET
            </Button>
        </Paper>
    )
}

export default Filterselects;

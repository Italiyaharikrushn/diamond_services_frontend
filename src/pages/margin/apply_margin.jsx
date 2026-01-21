import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Select, MenuItem, FormControl, InputLabel, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import { useCreateMarginMutation, useGetMarginsQuery } from "../../redux/api/marginApi";

const MarginDialog = ({ open, onclose, onSuccess, defaultType, filterData }) => {
    const [createMargin, { isLoading }] = useCreateMarginMutation();
    const { data: marginRes, refetch } = useGetMarginsQuery(undefined, { refetchOnMountOrArgChange: true, skip: !open });

    const [stoneType, setStoneType] = useState(defaultType || "lab");
    const [unit, setUnit] = useState("carat");
    const [rows, setRows] = useState([{ start: "", end: "", margin: "" }]);

    const getMarginValue = (type, unit, startVal) => {
        const s = Number(startVal);
        switch (type) {
            case "lab":
                return unit === "carat" ? (s < 2 ? 10 : s < 5 ? 7 : 5) : (s < 500 ? 15 : 10);
            case "natural":
                return unit === "carat" ? (s < 1 ? 12 : 8) : (s < 5000 ? 20 : 15);
            case "gemstones":
                return unit === "carat" ? (s < 2 ? 9 : 10) : (s < 500 ? 18 : 15);
            default:
                return "";
        }
    };

    useEffect(() => {
        if (open && marginRes?.Data) {
            const savedEntry = marginRes.Data.find(
                (m) => m.stone_type.toLowerCase() === stoneType.toLowerCase()
            );

            if (savedEntry) {
                setUnit(savedEntry.unit);
            }
        }
    }, [open, marginRes, stoneType]);

    useEffect(() => {
        if (!open) return;

        const existingData = marginRes?.Data?.find(
            (m) => m.stone_type.toLowerCase() === stoneType.toLowerCase() && m.unit === unit
        );

        if (existingData && existingData.markups?.length > 0) {
            const dbRows = existingData.markups.map((m) => ({
                start: m.start.toString(),
                end: m.end.toString(),
                margin: m.markup.toString()
            }));
            setRows(dbRows);
        } else if (filterData) {
            let startVal, maxVal, step;
            if (unit === "price") {
                startVal = Math.floor(filterData.price_range?.min || 0);
                maxVal = Math.ceil(filterData.price_range?.max || 5000);
                step = 500;
            } else {
                startVal = filterData.carat_range?.min || 0;
                maxVal = filterData.carat_range?.max || 10;
                step = 2;
            }

            let autoRows = [];
            for (let i = startVal; i < maxVal; i += step) {
                const currentStart = i.toFixed(2);
                const currentEnd = Math.min(i + step, maxVal).toFixed(2);
                autoRows.push({
                    start: currentStart,
                    end: currentEnd,
                    margin: getMarginValue(stoneType, unit, currentStart).toString()
                });
            }
            setRows(autoRows);
        }
    }, [open, stoneType, unit, marginRes, filterData]);

    // useEffect(() => {
    //     if (!open || !marginRes?.Data) return;
    //     const found = marginRes?.Data?.find(
    //         (m) => m.stone_type === stoneType && m.unit === unit
    //     );

    //     if (found && found.markups && found.markups.length > 0) {
    //         setRows(found.markups.map((m) => ({
    //             start: m.start,
    //             end: m.end,
    //             margin: m.markup
    //         })));
    //     } else if (filterData) {
    //         let startVal, maxVal, step;
    //         if (unit === "price") {
    //             startVal = Math.floor(filterData.price_range?.min || 0);
    //             maxVal = Math.ceil(filterData.price_range?.max || 5000);
    //             step = 500;
    //         } else {
    //             startVal = filterData.carat_range?.min || 0;
    //             maxVal = filterData.carat_range?.max || 10;
    //             step = 2;
    //         }

    //         let autoRows = [];
    //         for (let i = startVal; i < maxVal; i += step) {
    //             const currentStart = i.toFixed(2);
    //             const currentEnd = Math.min(i + step, maxVal).toFixed(2);
    //             autoRows.push({
    //                 start: currentStart,
    //                 end: currentEnd,
    //                 margin: getMarginValue(stoneType, unit, currentStart).toString()
    //             });
    //         }
    //         setRows(autoRows);
    //     }
    // }, [open, stoneType, unit, filterData, marginRes]);

    const handleInputChange = (index, field, value) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
        if (field === "end" && index < updatedRows.length - 1) {
            updatedRows[index + 1].start = value;
        }

        setRows(updatedRows);
    };

    const handleSubmit = async () => {
        try {
            const validRanges = rows
                .filter(r => r.start !== "" && r.end !== "" && r.margin !== "")
                .map(r => ({
                    start: Number(r.start),
                    end: Number(r.end),
                    margin: Number(r.margin)
                }));

            if (!validRanges.length) {
                alert("Please enter margin for at least one range");
                return;
            }

            await createMargin({
                type: stoneType,
                unit: unit,
                ranges: validRanges
            }).unwrap();

            await refetch();
            alert("Margin updated successfully!");
            onSuccess();
            onclose();
        } catch (err) {
            alert("Failed to update margin");
            console.error(err);
        }
    };

    return (
        <Dialog open={open} onClose={onclose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ fontWeight: "bold", fontSize: 18 }}>
                Apply {stoneType.toUpperCase()} Margin
            </DialogTitle>

            <DialogContent>
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 3, mt: 1 }}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Stone Type</InputLabel>
                        <Select
                            value={stoneType}
                            label="Stone Type"
                            disabled={defaultType === "gemstones"}
                            onChange={(e) => setStoneType(e.target.value)}
                        >
                            <MenuItem value="lab">Lab Grown</MenuItem>
                            <MenuItem value="natural">Natural</MenuItem>
                            <MenuItem value="gemstones">Gemstones</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth size="small">
                        <InputLabel>Margin Based On</InputLabel>
                        <Select
                            value={unit}
                            label="Margin Based On"
                            onChange={(e) => setUnit(e.target.value)}
                        >
                            <MenuItem value="carat">Carat</MenuItem>
                            <MenuItem value="price">Price</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Paper variant="outlined" sx={{ maxHeight: 420, overflow: "auto" }}>
                    <Table stickyHeader size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Start Range</b></TableCell>
                                <TableCell><b>End Range</b></TableCell>
                                <TableCell><b>Margin (%)</b></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rows.map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            type="number"
                                            value={row.start}
                                            disabled
                                            onChange={(e) => handleInputChange(i, "start", e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            type="number"
                                            value={row.end}
                                            onChange={(e) => handleInputChange(i, "end", e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            type="number"
                                            placeholder="%"
                                            value={row.margin}
                                            onChange={(e) => handleInputChange(i, "margin", e.target.value)}
                                            sx={{ "& input": { textAlign: "center" } }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onclose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Margin"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MarginDialog;

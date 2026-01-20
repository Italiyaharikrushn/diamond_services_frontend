import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Select, MenuItem, FormControl, InputLabel, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useCreateMarginMutation } from "../../redux/api/marginApi";
import { useGetMarginsQuery } from "../../redux/api/marginApi";

const MarginDialog = ({ open, onclose, onSuccess, defaultType }) => {
    const [createMargin, { isLoading }] = useCreateMarginMutation();
    const { data: marginRes, isLoading: marginLoading } = useGetMarginsQuery();

    const [stoneType, setStoneType] = useState(defaultType || "lab");
    const [unit, setUnit] = useState("carat");
    const [rows, setRows] = useState([{ start: "", end: "", margin: "" }]);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (open && marginRes?.Data) {
            const found = marginRes.Data.find(
                (m) => m.stone_type === stoneType && m.unit === unit
            );

            if (found) {
                setRows(
                    found.markups.map((m) => ({
                        start: m.start,
                        end: m.end,
                        margin: m.markup
                    }))
                );
            } else {
                setRows([{ start: "", end: "", margin: "" }]);
            }
        }
    }, [open, marginRes, stoneType, unit]);

    const handleSubmit = async () => {
        setSubmitted(true);

        const validRanges = rows
            .filter(r => r.start !== "" && r.end !== "" && r.margin !== "")
            .map(r => ({
                start: Number(r.start),
                end: Number(r.end),
                margin: Number(r.margin)
            }));

        if (validRanges.length === 0) {
            alert("Please add at least one complete range.");
            return;
        }

        if (validRanges.some(r => r.start >= r.end)) {
            alert("End value must be greater than Start value in all ranges.");
            return;
        }

        try {
            await createMargin({
                type: stoneType,
                unit: unit,
                ranges: validRanges
            }).unwrap();

            alert("Margins applied and prices updated successfully!");

            setRows([{ start: "", end: "", margin: "" }]);
            setSubmitted(false);
            onSuccess();
            onclose();

        } catch (err) {
            alert(err?.data?.detail || "Failed to apply margin");
        }
    };

    return (
        <Dialog open={open} onClose={onclose} maxWidth="md" fullWidth>
            <DialogTitle>Apply {stoneType.toUpperCase()} Margin</DialogTitle>

            <DialogContent>
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 3, mt: 1 }}>
                    {/* Stone Type */}
                    {defaultType !== "gemstones" ? (
                        <FormControl fullWidth size="small">
                            <InputLabel>Stone Type</InputLabel>
                            <Select
                                value={stoneType}
                                label="Stone Type"
                                onChange={(e) => setStoneType(e.target.value)}
                            >
                                <MenuItem value="lab">Lab Grown</MenuItem>
                                <MenuItem value="natural">Natural</MenuItem>
                            </Select>
                        </FormControl>
                    ) : (
                        <TextField
                            label="Stone Type"
                            value="Gemstones"
                            disabled
                            size="small"
                            fullWidth
                        />
                    )}

                    {/* Margin Based On */}
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

                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Start</TableCell>
                            <TableCell>End</TableCell>
                            <TableCell>Margin (%)</TableCell>
                            <TableCell width={40} />
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
                                        onChange={(e) => {
                                            const r = [...rows];
                                            r[i].start = e.target.value;
                                            setRows(r);
                                        }}
                                    />
                                </TableCell>

                                <TableCell>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        type="number"
                                        value={row.end}
                                        onChange={(e) => {
                                            const r = [...rows];
                                            r[i].end = e.target.value;
                                            setRows(r);
                                        }}
                                    />
                                </TableCell>

                                <TableCell>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        type="number"
                                        value={row.margin}
                                        onChange={(e) => {
                                            const r = [...rows];
                                            r[i].margin = e.target.value;
                                            setRows(r);
                                        }}
                                    />
                                </TableCell>

                                <TableCell>
                                    <IconButton
                                        disabled={rows.length === 1}
                                        onClick={() =>
                                            setRows(rows.filter((_, x) => x !== i))
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Button
                    startIcon={<AddIcon />}
                    sx={{ mt: 1 }}
                    onClick={() =>
                        setRows([...rows, { start: "", end: "", margin: "" }])
                    }
                >
                    Add Range
                </Button>
            </DialogContent>

            {/* ===== ACTIONS ===== */}
            <DialogActions>
                <Button onClick={onclose}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    Apply Margin
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MarginDialog;

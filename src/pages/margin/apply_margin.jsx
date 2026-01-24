import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Select, MenuItem, FormControl, InputLabel, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import { useMarginLogic } from "../../utils/useMarginLogic";

const MarginDialog = ({ open, onclose, onSuccess, defaultType, filterData }) => {
    const { 
        stoneType, setStoneType, unit, setUnit, rows, 
        handleInputChange, handleSubmit, isLoading 
    } = useMarginLogic(open, onclose, onSuccess, defaultType, filterData);

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
                        <Select value={unit} label="Margin Based On" onChange={(e) => setUnit(e.target.value)}>
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
                                <TableCell align="center"><b>Margin (%)</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <TextField size="small" fullWidth value={row.start} disabled />
                                    </TableCell>
                                    <TableCell>
                                        <TextField size="small" fullWidth type="number" value={row.end} onChange={(e) => handleInputChange(i, "end", e.target.value)} />
                                    </TableCell>
                                    <TableCell>
                                        <TextField 
                                            size="small" fullWidth type="number" placeholder="%" 
                                            value={row.margin} onChange={(e) => handleInputChange(i, "margin", e.target.value)} 
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

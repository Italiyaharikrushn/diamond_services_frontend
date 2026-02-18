import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Typography } from '@mui/material';
import ShapeImageMap from "../utils/shapeImageMap";

const TABLE_HEADERS = [
    { label: "Shape", align: "left" },
    { label: "Carat", align: "center" },
    { label: "Cut", align: "center" },
    { label: "Color", align: "center" },
    { label: "Clarity", align: "center" },
    { label: "Report", align: "center" },
    { label: "Price", align: "right" },
];

const StoneTable = ({ data }) => {
    if (!data || data.length === 0) return null;

    const getStoneImage = (item) => {
        if (item.image_source && item.image_source !== "" && item.image_source !== "null") {
            return item.image_source;
        }
        const shapeKey = item.shape?.toLowerCase();
        return ShapeImageMap[shapeKey];
    };

    return (
        <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
            <Table sx={{ minWidth: 650 }} aria-label="stone table">
                <TableHead sx={{ backgroundColor: "#f9f9f9" }}>
                    <TableRow>
                        {TABLE_HEADERS.map((header, index) => (
                            <TableCell
                                key={index}
                                align={header.align}
                                sx={{ color: "#666", fontWeight: "bold" }}
                            >
                                {header.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#f5f5f5' } }}
                        >
                            <TableCell component="th" scope="row">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <Avatar
                                        variant="rounded"
                                        src={getStoneImage(row)}
                                        sx={{ width: 40, height: 40, border: '1px solid #ddd' }}
                                    />
                                    <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                        {row.shape}
                                    </Typography>
                                </div>
                            </TableCell>
                            <TableCell align="center">{row.carat?.toFixed(2)}</TableCell>
                            <TableCell align="center">{row.cut || '-'}</TableCell>
                            <TableCell align="center">{row.color || '-'}</TableCell>
                            <TableCell align="center">{row.clarity || '-'}</TableCell>
                            <TableCell align="center">{row.lab || '-'}</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                                ₹{row.selling_price}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default StoneTable;

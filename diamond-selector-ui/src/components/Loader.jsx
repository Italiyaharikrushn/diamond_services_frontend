import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Loader = () => {
    return (
        <div>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "300px" }}>
                <CircularProgress size={40} thickness={4} sx={{ color: "var(--ds-primary-color)" }} />
            </Box>
        </div>
    )
}

export default Loader

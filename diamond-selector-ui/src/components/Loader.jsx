import React from 'react'
import { Box, CircularProgress } from '@mui/material'

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

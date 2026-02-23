import { Box, Typography, Paper, RadioGroup, FormControlLabel, Radio, Pagination } from "@mui/material";
import { SettingRow } from "./SettingRow";

const PaginationSection = ({ resultStyle, onChange }) => (
    <SettingRow title="Pagination Options">
        <Paper variant="outlined" sx={{ p: 3 }}>
            <RadioGroup value={resultStyle} onChange={onChange}>
                <FormControlLabel value="paginated" control={<Radio />} label="Paginated" />
                <FormControlLabel value="infinite" control={<Radio />} label="Infinite Scroll" />
            </RadioGroup>

            <Box mt={2}>
                {resultStyle === "paginated"
                    ? <Pagination count={10} page={1} />
                    : <Typography color="text.secondary">Infinite scroll preview</Typography>}
            </Box>
        </Paper>
    </SettingRow>
);

export default PaginationSection;

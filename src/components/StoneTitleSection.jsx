import { Paper } from "@mui/material";
import { SettingRow } from "./SettingRow";
import RichTextEditor from "./RichTextEditor";

const StoneTitleSection = ({ value, onChange }) => (
    <SettingRow
        title="Stone Title"
        subtitle="Template: {carat} Carat {shape}..."
        isTopAligned
    >
        <Paper variant="outlined" sx={{ p: 3 }}>
            <RichTextEditor
                value={value || ""}
                onChange={onChange}
                minHeight={80}
            />
        </Paper>
    </SettingRow>
);

export default StoneTitleSection;

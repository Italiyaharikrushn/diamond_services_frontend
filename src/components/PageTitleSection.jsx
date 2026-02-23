import { Paper } from "@mui/material";
import RichTextEditor from "./RichTextEditor";
import { SettingRow } from "./SettingRow";

const PageTitleSection = ({ value, onChange }) => (
    <SettingRow title="Page Title" isTopAligned>
        <Paper variant="outlined" sx={{ p: 3 }}>
            <RichTextEditor
                value={value || ""}
                onChange={onChange}
                minHeight={60}
            />
        </Paper>
    </SettingRow>
);

export default PageTitleSection;

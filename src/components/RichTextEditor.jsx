import { Box } from "@mui/material";
import React, { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const toolbarOptions = [
    ["bold", "italic", "underline", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link"],
    ["clean"]
];

const RichTextEditor = ({ value, onChange, placeholder, minHeight = 60, borderRadius = 2 }) => {
    const quillRef = useRef(null);
    return (
        <Box
            sx={{
                border: "1px solid #9e9a9a",
                borderRadius: borderRadius,
                overflow: "hidden",
                backgroundColor: "#fff",

                "& .ql-toolbar": {
                    border: "none",
                    borderBottom: "1px solid #e0e0e0",
                    padding: "8px 0px",
                },
                "& .ql-container": {
                    border: "none",
                },
                "& .quill ":{
                    padding:"0px 12px",
                },

                /* Editor height & padding */
                "& .ql-editor": {
                    minHeight: minHeight,
                    padding: "12px",
                    fontSize: "14px",
                },

                /* Focus effect */
                "&:focus-within": {
                    borderColor: "#1976d2",
                },
            }}
        >
            <ReactQuill
                ref={quillRef}
                theme="snow"
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                modules={{
                    toolbar: toolbarOptions,
                }}
                sx={{ minHeight: "20px" }}
            />
        </Box>
    );
};

export default RichTextEditor;

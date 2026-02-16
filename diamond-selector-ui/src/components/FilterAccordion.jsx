import { Typography, Accordion, AccordionSummary, AccordionDetails, Divider } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FilterAccordion = ({ children, title }) => {
    return (
        <>
            <Accordion defaultExpanded={true} disableGutters sx={{ boxShadow: "none", "&:before": { display: "none" } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{
                    px: 0,
                }}>
                    <Typography variant="p" fontWeight={500} boxSizing={2} sx={{ fontSize: "18px", margin: "0px" }}>{title}</Typography>
                </AccordionSummary>


                <AccordionDetails sx={{ px: 1 }}>
                    {children}
                </AccordionDetails>
            </Accordion>
            <Divider />
        </>
    )
}

export default FilterAccordion 

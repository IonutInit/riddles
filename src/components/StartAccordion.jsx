import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StartAccordion = () => {
  return (
    <div className="start-accordion">
      <Accordion
        sx={{
          width: 512,
          backgroundColor: "var(--color3)",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ textAlign: "center" }}
        >
          <Typography
            sx={{
              fontFamily: "var(--font1)",
              fontSize: "32px",
            }}
          >
            read more
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            sx={{
              fontFamily: "var(--font1)",
            }}
          >
            <p>hello</p>
            <p>hello again</p>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default StartAccordion;

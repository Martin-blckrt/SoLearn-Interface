import React from "react"
import '../styles/advancedSearch.css';

import LocationInput from "./locationInput";
import NumberInput from "./numberInput"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import RightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function AdvancedSearch() {
    return (
        <div>
            <Accordion className="advanced_dropdown">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className="advancedText">
                    Advanced Search
                </AccordionSummary>
                <AccordionDetails className="ac_details">
                    <div className="advanced_container">
                        <LocationInput>
                        </LocationInput>
                        <NumberInput className="number">
                        </NumberInput>
                        <Box className="predict_button">
                            <Fab sx={{
                                color: 'white',
                                bgcolor: '#5B8D44',
                                '&:hover': {
                                    bgcolor: '#005403',
                                },
                            }} aria-label="predict">
                                <RightIcon />
                            </Fab>
                        </Box>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

//https://mui.com/material-ui/react-progress/
//https://mui.com/material-ui/react-snackbar/

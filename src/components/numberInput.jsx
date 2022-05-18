import React from "react"
import '../styles/numberInput.css';
import NumberFormat from 'react-number-format';
import TextField from '@mui/material/TextField';
import { Box } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';

const withValueLimit = ({ floatValue }) => floatValue <= 9999999;

export default function NumberInput(props) {
    return (
        <Box>
            <InputLabel className="num_label" sx={{color:"#5b8d44"}}>How many panels ?</InputLabel>
            <NumberFormat
                {...props}
                allowEmptyFormatting = {true}
                allowNegative = {false}
                className="num_input"
                customInput={TextField}
                decimalScale={0}
                defaultValue={1}
                isAllowed={withValueLimit}
                type="number"
                thousandSeparator={' '}
            />
        </Box>
    );
}

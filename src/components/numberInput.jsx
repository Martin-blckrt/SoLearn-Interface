import React from "react"
import '../styles/numberInput.css';
import NumberFormat from 'react-number-format';
import TextField from '@mui/material/TextField';

const withValueLimit = ({ floatValue }) => floatValue <= 9999999;

export default function NumberInput(props) {
    return (
        <div className="num_container">
            <label className="num_label">How many panels ?</label>
            <NumberFormat
                {...props}
                allowEmptyFormatting = {true}
                allowNegative = {false}
                className="num_input"
                customInput={TextField}
                decimalScale={0}
                defaultValue={1}
                isAllowed={withValueLimit}
                thousandSeparator={' '}
            />
        </div>
    );
}

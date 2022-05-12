import React from "react"
import '../styles/numberInput.css';
import NumberFormat from 'react-number-format';
import TextField from '@mui/material/TextField';

export default function NumberInput(props) {
    return (
        <div className="num_container">
            <label className="num_label">How many panels ?</label>
            <NumberFormat
                {...props}
                className="num_input"
                allowNegative = {false}
                value={1}
                customInput={TextField}
                type="text"
                thousandSeparator={' '}
            />
        </div>
    );
}

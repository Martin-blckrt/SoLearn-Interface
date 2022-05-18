import React from "react"
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)({
    '& fieldset, .Mui-focused fieldset.MuiOutlinedInput-notchedOutline': {
        borderColor: '#5B8D44',
    },
    '.Mui-focused.Mui-error fieldset.MuiOutlinedInput-notchedOutline' :{
        borderColor : "#d32f2f"
    },
    '& label, & label.Mui-focused': {
        color:"#5B8D44"
    },
    '& label.Mui-focused.Mui-error': {
        color:"#d32f2f"
    }
});

export default StyledTextField;
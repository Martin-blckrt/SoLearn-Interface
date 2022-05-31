import React from "react"
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';

const ValidationTextField = styled(TextField)({
    '& input:valid + fieldset': {
      borderColor: '#5B8D44',
      borderWidth: 2,
    }
  });

export default ValidationTextField;
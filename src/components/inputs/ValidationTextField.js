import React from "react"
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';

const ValidationTextField = styled(TextField)({
    '& input:valid + fieldset': {
      borderColor: '#5B8D44',
      borderWidth: 2,
    },

    'label.Mui-error, label.Mui-error span' : {
      color : '#d32f2f',
    },

    'label.Mui-focused, label.Mui-focused span, &.valid label, &.valid label span' : {
      color : '#5B8D44',
    },

    '& .Mui-focused input[id] + fieldset':{
      borderColor: '#5B8D44',
      borderWidth: 2,
    }
  });

export default ValidationTextField;
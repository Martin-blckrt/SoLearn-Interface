import React from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import '../styles/locationInput.css';

import ardennes from "../assets/départements/ardennes.png";
import belfort from "../assets/départements/belfort.png";
import charente from "../assets/départements/charente-maritime.png";
import hautesPy from "../assets/départements/hautes pyrenees.png";
import orne from "../assets/départements/orne.png";
import vendee from "../assets/départements/vendee.png";

export default function LocationInput() {
    const locations = [{code:'ARD', label:"Ardennes", src:ardennes},
        {code:'BEL', label:"Belfort", src:belfort},
        {code:'CHA', label:"Charente-Maritime", src:charente},
        {code:'HPY', label:"Hautes Pyrenées", src:hautesPy},
        {code:'ORN', label:"Orne", src:orne},
        {code:'VEN', label:"Vendée", src:vendee}]

    return (
        <Autocomplete
            id="location_selector"
            sx={{ width: 300 }}
            options={locations}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img src={option.src}
                         loading="lazy"
                         width="20"
                         alt=""/>
                    {option.label} ({option.code})
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Choose a location"
                    inputProps={{
                        ...params.inputProps,
                    }}
                />
            )}
        />
    );
}

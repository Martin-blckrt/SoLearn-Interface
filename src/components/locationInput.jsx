import React from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import '../styles/locationInput.css';

export default function LocationInput() {
    const locations = [{code:'AUV', label:"Auvergne"},
        {code:'BEL', label:"Belfort"},
        {code:'NAN', label:"Nancy"},
        {code:'OTH', label:"Un autre endroit"}]
    return (
        <Autocomplete
            id="location_selector"
            sx={{ width: 300 }}
            options={locations}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
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

import React from "react"
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import StyledTextField from "./inputs/StyledTextField";

class LocationInput extends React.Component {
    constructor(props){
        super(props);
        this.state={
            locations : [
            ],
            input_error : false
        }
    }

    handlerChange(e){
        let error = true;
        let attr = ""
        if(/^[0-9][ab]?[0-9]*$/i.test(e.target.value)){
            //faire la requête à clément
            attr = "code";
            error = false;
        }else if(/^[a-z]+$/i.test(e.target.value)){
            //faire la requête à clément
            attr = "nom";
            error = false;
        }
        if(attr != ""){
            fetch("http://localhost:8000/geography/search/communes",{
                "method" : "POST",
                "headers" : {
                    "content-type" : "application/json"
                },
                body:JSON.stringify({
                    "attr": attr,
                    "query" : e.target.value
                })
            })
            .then(data=>data.json())
            .then(communes=>{
                this.setState({input_error : error, locations : communes});
            });
        }
    }

    handlerValidate(e, value){
        this.props.handler(value.code, value.nom, value.dep);
    }

    render(){
        return (
            <Autocomplete
                id="location_selector"
                sx={{ width: 300 }}
                options={this.state.locations}
                autoHighlight
                filterOptions={(options)=>options}
                getOptionLabel={(option) => `${option.nom} - ${option.code}`}
                renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 }, '&:hover':{color :"#5B8D44"} }} {...props}>
                        {`${option.nom} - ${option.code}`}
                    </Box>
                )}
                onChange={this.handlerValidate.bind(this)}
                renderInput={(params) => (
                    <StyledTextField
                        {...params}
                        error={this.state.input_error}
                        label="Choose a location"
                        inputProps={{
                            ...params.inputProps,
                        }}
                        helperText={this.state.input_error ? "Not a valid name or postcode" : ""}
                        onChange={this.handlerChange.bind(this)}
                    />
                )}
            />
        );
    }
}



export default LocationInput;
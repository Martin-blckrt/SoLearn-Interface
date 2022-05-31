import React from "react";
import { Typography } from "@mui/material";
import TextInfos from "./TextInfos";

class InfosPwd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open : false,
            errors : props.errors
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.open != this.props.open){
            this.setState({open : this.props.open});
        }else if(prevProps.errors != this.props.errors){
            this.setState({errors : this.props.errors});
        }
    }

    render(){
        return(
            <div style={{'display' : this.state.open ? "block" : "none"}}>
                <TextInfos color={this.state.errors.error_nb_chars ? "#d32f2f" : "#005403"} text="At least 12 characters"></TextInfos>
                <TextInfos color={this.state.errors.error_mix_n_l ? "#d32f2f" : "#005403"} text="Mixture of letters and numbers"></TextInfos>
                <TextInfos color={this.state.errors.error_mix_u_l_chars ? "#d32f2f" : "#005403"} text="Mixture of uppercase and lowercase letters"></TextInfos>
                <TextInfos color={this.state.errors.error_spec_char ? "#d32f2f" : "#005403"} text="At least one special character, e.g. ,;!:@?#"></TextInfos>
            </div>
        )
    }
}

export default InfosPwd;
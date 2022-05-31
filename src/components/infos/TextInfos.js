import React from "react";
import { Typography } from "@mui/material";

class TextInfos extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            color : props.color
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.color != this.props.color){
            this.setState({color : this.props.color});
        }
    }

    render(){
        return(
            <div>
                <Typography
                    sx={{
                        fontSize : "0.8rem",
                        marginLeft : "5%",
                        marginBottom : "0.4rem",
                        marginTop : "0.4rem",
                    }}
                    color={this.state.color}
                >{this.props.text}</Typography>
            </div>
        );
    }
}

export default TextInfos;
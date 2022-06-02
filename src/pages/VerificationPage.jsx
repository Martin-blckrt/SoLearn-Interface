import React from "react";
import Header from "../components/header";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import SolarPanelGif from "../assets/solar panel.gif";
import { Box, Typography } from "@mui/material";
import { verifAccountRequest } from "../components/misc/requests";

const VerificationPage = (props) => {

    let {verif_token} = useParams();
    let navigate = useNavigate();
    
    const verifAccount = async () =>{
        const account_token = await verifAccountRequest(verif_token);
        sessionStorage.setItem("account_token", account_token);
        setTimeout(()=>{
            navigate("../home", {replace : true});
        }, 2000);
    }

    verifAccount();

    return(
        <div>
            <Header/>
            <Box
                sx={{
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"space-between",
                    alignItems:"center"
                }}
            >
                <img className="solarPanelGif" src={SolarPanelGif} alt="loading"/>
                <Typography variant="h4" style={{color:"#005403"}}>We verify your account...</Typography>
            </Box>
        </div>
    );
}


export default VerificationPage;
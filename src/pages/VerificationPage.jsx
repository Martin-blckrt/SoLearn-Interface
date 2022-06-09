import React from "react";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import SolarPanelGif from "../assets/solar panel.gif";
import { Box, Typography } from "@mui/material";
import { verifAccountRequest } from "../components/misc/requests";

const VerificationPage = (props) => {

    const verif_token = window.location.pathname.split("/")[2];
    let navigate = useNavigate();
    
    const verifAccount = async () =>{
        const account_token = await verifAccountRequest(verif_token);
        localStorage.setItem("access_token", account_token.access);
        localStorage.setItem("refresh_token", account_token.refresh);
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
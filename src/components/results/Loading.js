import React from "react";
import Header from "../../components/header";
import Stack from '@mui/material/Stack';
import SolarPanelGif from "../../assets/solar panel.gif";
import { LinearProgress } from "@mui/material";

export default function Loading(props){
    return(
        <div>
            <Header/>
            <Stack sx={{ width: '100%', color: '#5b8d44' }} spacing={2}>
                <LinearProgress color="inherit"/>
            </Stack>
            <div className="computingContainer">
                <img className="solarPanelGif" src={SolarPanelGif} alt="loading"/>
                Computing ...
            </div>
        </div>
    );
}
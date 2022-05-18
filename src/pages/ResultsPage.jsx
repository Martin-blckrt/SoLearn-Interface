import '../styles/ResultsPage.css';

import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Header from "../components/header";
import React, {useEffect, useState} from "react";
import Graph from "../assets/graph.png";
import SolarPanelGif from "../assets/solar panel.gif";
import {FileDownloadOutlined} from "@mui/icons-material";

function ResultsPage(props) {
    const [isShown, setIsShown] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setIsShown(true);
        }, 3000);
    }, []);
    console.log(props.location)
    if (isShown) {
        return (
            <div>
                <Header/>
                <div className="pageResultsContainer">
                    <div className="leftResultsContainer">
                        <div className="resultsTitle">
                            Estimated Production for <a className="locationTitle">Here</a>
                        </div>
                        <div className="graphContainer">
                            <img className="graphImg" src={Graph} alt="graph" />
                        </div>
                        <div className="downloadContainer">
                            <FileDownloadOutlined sx={{ marginRight: "4px"}}/>
                            Download the data as a csv file
                        </div>
                    </div>
                    <div className="rightResultsContainer">
                        <div className="financialContainer">
                            Financial Estimate
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
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

}

export default ResultsPage;

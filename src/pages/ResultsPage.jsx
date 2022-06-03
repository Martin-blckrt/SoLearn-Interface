import '../styles/ResultsPage.css';

import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Header from "../components/header";
import React, {useEffect, useState} from "react";
import Graph from "../assets/graph.png";
import SolarPanelGif from "../assets/solar panel.gif";
import {FileDownloadOutlined} from "@mui/icons-material";
import Chart from 'chart.js/auto';

function ResultsPage(props) {
    let myChart = null;
    const [isShown, setIsShown] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setIsShown(true);
        }, 3000);
        if (myChart !== null)
            myChart.destroy();
        myChart = new Chart(document.getElementById('myChart').getContext('2d'), config);
    }, []);


    const labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    const data = {
        labels: labels,
        datasets: [{backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {}
    };

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
                            <canvas id="myChart"></canvas>
                        </div>
                        <div className="downloadContainer">
                            <FileDownloadOutlined sx={{ marginRight: "4px"}}/>
                            Download the data as a json file
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

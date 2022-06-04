import '../styles/ResultsPage.css';

import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Header from "../components/header";
import React, {useEffect, useState} from "react";
import Graph from "../assets/graph.png";
import SolarPanelGif from "../assets/solar panel.gif";
import {FileDownloadOutlined} from "@mui/icons-material";
import FinancialEstimate from "../components/financialEstimate";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';

function ResultsPage(props) {
    const [isShown, setIsShown] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setIsShown(true);
        }, 3000);
    }, []);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );

      const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'top' ,
          },
          title: {
            display: false,
            text: 'Chart.js Line Chart',
          },
        },
      };

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
        datasets: [{backgroundColor: '#005403',
            borderColor: '#5b8d44',
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
                            <Line options={options} data={data} />
                        </div>
                        <div className="downloadContainer">
                            <FileDownloadOutlined sx={{ marginRight: "4px"}}/>
                            Download the data as a json file
                        </div>
                    </div>
                    <div className="rightResultsContainer">
                        <div className="resultsTitle">
                            Financial Estimate
                        </div>
                        <div className="financialContainer">
                            <FinancialEstimate/>
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

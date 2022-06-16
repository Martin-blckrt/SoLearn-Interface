import { FileDownloadOutlined, LivingOutlined } from "@mui/icons-material";
import FinancialEstimate from "../../components/financialEstimate";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Header from "../../components/header";

export default function Results(props) {
	ChartJS.register(
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		Title,
		Tooltip,
		Legend
	);

	const predictions_to_display = {};
	let sum = 0;

	for (const dt in props.datas.prediction) {
		predictions_to_display[new Date(Number(dt)).toLocaleString()] =
			props.datas.prediction[dt];
		sum += props.datas.prediction[dt];
	}

	const total = (sum / props.datas.prediction.length) * 48;

	console.log(predictions_to_display);

	const options = {
		responsive: true,
		maintainAspectRation: false,
		plugins: {
			legend: {
				display: false,
				position: "top",
			},
			title: {
				display: false,
				text: "Chart.js Line Chart",
			},
		},
	};

	const data = {
		datasets: [
			{
				backgroundColor: "#005403",
				borderColor: "#5b8d44",
				data: predictions_to_display,
			},
		],
	};

	return (
		<div>
			<Header />
			<div className="pageResultsContainer">
				<div className="leftResultsContainer">
					<div className="resultsTitle">
						Estimated Production for{" "}
						<span className="locationTitle">{props.city_name}</span> based on
						the next <span className="locationTitle">48h</span>
					</div>
					<div className="graphContainer">
						<Line options={options} height={"100%"} data={data} />
					</div>
				</div>
				<div className="downloadContainer">
					<FileDownloadOutlined sx={{ marginRight: "4px" }} />
					Download the data as a json file
				</div>
				<div className="rightResultsContainer">
					<div className="resultsTitle">Financial Estimate</div>
					<div className="financialContainer">
						<FinancialEstimate total_estimated={total.toFixed(3)} />
					</div>
				</div>
			</div>
		</div>
	);
}

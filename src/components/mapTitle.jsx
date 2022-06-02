import React from "react"
import '../styles/mapTitle.css';

export default function MapTitle() {
    return (
        <div className="bigContainer">
            <p className="bigMessage">
                Predict<a className="your">&nbsp;your</a><br></br> solar panel production
            </p>
            <p className="smallMessage">
                Click on your location on the map and see how much energy you could produce !
            </p>
        </div>
    );
}

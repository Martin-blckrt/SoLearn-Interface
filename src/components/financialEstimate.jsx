import React, {useState} from "react"
import '../styles/financialEstimate.css';
import numbers from "../assets/numbers_blur.png";
import {isLoggedIn} from "../utils/auth";
import DialogBoxPremium from "./dialog_box/DialogBoxPremium";

export default function FinancialEstimate(props) {
    if (isLoggedIn()) {
        return (
            <div className="container">
                <div className="bigNumber">
                    {Number(props.total_estimated * 0.1814).toFixed(2)} € <p className="earned">over the last 48 hours</p>
                </div>
                <div className="financialInfo">
                    <div className="extraFInfo">
                        {props.total_estimated} kW <p className="extraFinancial">Power resold</p>
                    </div>
                    <div className="extraFInfo">
                        0,1814 €/kW<p className="extraFinancial">Resell rate</p>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="notPremiumMessage">
                <img className="numbersImg" src={numbers} alt="numbers" />
                <DialogBoxPremium openedFrom={"financialEstimate"}/>
            </div>
        );
    }
}

import React, {useState} from "react"
import '../styles/financialEstimate.css';
import numbers from "../assets/numbers_blur.png";

export default function FinancialEstimate(props) {
    const premiumUser = false; //fake
    if (premiumUser) {
        return (
            <div className="container">
                <div className="bigNumber">
                    580€ <p className="earned">over the last 7 days</p>
                </div>
                <div className="financialInfo">
                    <div className="extraFInfo">
                        235 kW <p className="extraFinancial">Power resold</p>
                    </div>
                    <div className="extraFInfo">
                        3.21 €/kW<p className="extraFinancial">Resell rate</p>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="notPremiumMessage">
                <img className="numbersImg" src={numbers} alt="numbers" />
                Subscribe to <p style={{color: '#0BDA51', display: "contents", fontSize: '25px', fontWeight: '500'}}>premium</p> for more estimations and the financial estimate !
            </div>
        );
    }
}

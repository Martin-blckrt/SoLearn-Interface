import React from "react"
import '../styles/header.css';
import logo from "../assets/Logo.png";

export default function Header() {
    return (
        <div className="topContainer">
            <a href="/src/pages" target="_blank" rel="noopener noreferrer">
                <div className="logoContainer">
                    <img className="logoImg" src={logo} alt="logo" />
                    <div className="logoText">
                        Solar <br/> Predictor
                    </div>
                </div>
            </a>
            <div className="endContainer">
                <div className="aboutContainer">
                    About
                </div>
                <div className="moreContainer">
                    Get premium
                </div>
            </div>
        </div>
    )
}

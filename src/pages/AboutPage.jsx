import '../styles/AboutPage.css';
import vidPres from '../assets/PremierJetLeger.mp4'
import Header from "../components/header";

function AboutPage() {
    return (
        <div>
            <Header/>
            <div className="bigAboutContainer">
                <div className="bigTitle">
                    <p>Our Project</p>
                    Solar Predictor is a student project made by 5 french students from l'Université de Technologie
                    de Belfort-Montbéliard, aiming to
                </div>
                <div className="videoHolder">
                    <video src={vidPres} width="100%" height="100%" controls></video>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;

import '../styles/AboutPage.css';
import vidPres from '../assets/PremierJetLeger.mp4'
import mlIMG from '../assets/ml.jpg'
import dsIMG from '../assets/dataset.png'
import rsIMG from '../assets/rising_seas.jpg'
import Header from "../components/header";
import {Button} from "@mui/material";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import DialogBoxRegister from "../components/dialog_box/DialogBoxRegister";

function AboutPage() {
    return (
        <div style={{position: 'relative', paddingBottom: '200px'}}>
            <Header aboutLoc={true}/>
            <div className="bigAboutContainer">
                <div className="bigTitle">
                    <p style={{fontWeight: 500, fontSize: '40px', marginBottom: '30px'}}>Our Project</p>
                    SoLearn is a student project made by 5 french students from l'Université de Technologie
                    de Belfort-Montbéliard, aiming to encourage the use of solar panels and renewable energies
                    in order to create a brighter and more sustainable future.
                </div>
                <div className="secondLayerContainer">
                    <div className="secondLayerLeft">
                        <p style={{fontWeight: 500, fontSize: '26px'}}>But what exactly do we do ?</p>
                        SoLearn was created to predict a theoretical solar panel production on the short-term for any
                        given geographical region. The result : armed with this tool and within a couple of clicks,
                        anyone can see how many benefits a solar panel could bring them !
                    </div>
                    <div className="secondLayerRight">
                        <video src={vidPres} width="100%" height="100%" controls style={{borderRadius: '20px'}}></video>
                    </div>
                </div>
                <div className="thirdLayerContainer">
                    <div className="thirdLayerLeft">
                        <img src={mlIMG} width="100%" height="100%" style={{borderRadius: '30px'}} alt={"machine learning"}></img>
                    </div>
                    <div className="thirdLayerRight">
                        <p style={{fontWeight: 500, fontSize: '26px'}}>But how do we do it ?</p>
                        SoLearn is the results of several months of testing different machine learning algorithms
                        in order to find the <a style={{color: '#0BDA51'}}>one</a>. Our perfected algorithm is then able,
                        along with meteorological data, to predict how much energy one or many solar panels could
                        produce over a given time.
                    </div>
                </div>
                <div className="intermediateMsg">
                    SoLearn has something to offer to everyone.<br></br>
                    You are just curious ? Click on the map !<br></br>
                    You are trying to see if going solar is worth it ? Get premium !
                </div>
                <div className="fourthLayerContainer">
                    <div className="fourthLayerLeft">
                        <p style={{fontWeight: 500, fontSize: '26px'}}>But where do we get information ?</p>
                        SoLearn got information from many different sources. Our initial training dataset comes from
                        a study on photovoltaic energy generation made by UK Power Networks, and our
                        algorithm was perfected on data provided by Asso BDPV, a non-profit organization promoting
                        photovoltaic electricity information and <production className=""></production>
                    </div>
                    <div className="fourthLayerRight">
                        <img src={dsIMG} width="100%" height="100%" style={{borderRadius: '30px'}} alt={"information"}></img>
                    </div>
                </div>
                <div className="fifthLayerContainer">
                    <div className="fifthLayerLeft">
                        <img src={rsIMG} width="100%" height="100%" style={{borderRadius: '30px'}} alt={"machine learning"}></img>
                    </div>
                    <div className="fifthLayerRight">
                        <p style={{fontWeight: 500, fontSize: '26px'}}>But why do we do it ?</p>
                        Our initiative stemmed from the report issued by the Intergovernmental Panel on Climate Change
                        in april 2022, in which they alerted on the fact that over a billion coastal areas will be
                        threatened by rising waters by 2050. In that same report, they also suggested to invest in
                        solar and wind power due to the increasingly widespread water stress. We wanted to do our part
                        and put our skills to contribution, and that's how SoLearn was created.
                    </div>
                </div>
                <div className="intermediateMsg">
                    Want to support our cause and project ?<br></br>
                    It's easy : just create an account !
                </div>
                <DialogBoxRegister openedFrom={"aboutPage"}/>
            </div>
            <div className="custom-shape-divider-bottom-1654341115">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                     preserveAspectRatio="none">
                    <path
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                        opacity=".25" className="shape-fill"></path>
                    <path
                        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                        opacity=".5" className="shape-fill"></path>
                    <path
                        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                        className="shape-fill"></path>
                </svg>
            </div>
        </div>
    );
}

export default AboutPage;

import {React, useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import ResultsPage from './pages/ResultsPage';
import AboutPage from "./pages/AboutPage";
import Header from "./components/header"
import reportWebVitals from './utils/reportWebVitals';
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import VerificationPage from './pages/VerificationPage';
import {isLoggedIn} from "./utils/auth";
import { checkToken } from './components/misc/requests';

const root = ReactDOM.createRoot(document.getElementById('root'));

const AuthWrapper = ({ children }) => {
    const [auth, setAuth] = useState(false);
    useEffect(() => {
        async function fetchData() {
            try{
                await checkToken();
                setAuth(true);
            }catch{
                setAuth(false);
                //localStorage.removeItem("access_token");
            }
        }
        fetchData();
    }, []);

    return auth ? children : <Navigate to="/about"/> ;
  };

root.render(
    <Router>
        <Routes>
            <Route exact path="/"
                    element={<Navigate to="/about"/>}/>
            <Route exact path="/map" element = {<MapPage/>}/>
            <Route path="/results" element = {<ResultsPage/>}/>
            <Route exact path="/about" element={<AboutPage/>}/>
            <Route path="/verification/:token" element={<VerificationPage/>}/>
            <Route
                path="*"
                element={
                    <main>
                        <Header/>
                        <p style={{paddingLeft: "25px"}}>Looks like you have fat fingers !</p>
                    </main>
                }
            />
        </Routes>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

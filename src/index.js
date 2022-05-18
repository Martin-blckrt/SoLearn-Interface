import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import AboutPage from "./pages/AboutPage";
import Header from "./components/header"
import reportWebVitals from './utils/reportWebVitals';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage/>}/>
                <Route path="/results" element={<ResultsPage/>}/>
                <Route exact path="/about" element={<AboutPage/>}/>
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
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

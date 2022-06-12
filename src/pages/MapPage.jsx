import '../styles/MapPage.css';

import Header from "../components/header";
import MapTitle from "../components/mapTitle"
import AdvancedSearch from "../components/advancedSearch"
import Map from '../components/map/Map';
import React from 'react';
import latinize from 'latinize';
import { Button, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";

export const  withNavigation = (Component) => {
  return props => <Component {...props} navigate={useNavigate()} />;
} 

class MapPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      advanced_code : "00",
      advanced_name : "00",
      dep : "00-00"
    }
    this.city_code = null;
    this.coords = null;
    this.city_name = "";
  }

  chooseAdvanced(code, name, dep){
    this.setState({advanced_code : code, advanced_name : latinize(name.toLowerCase()).replace(/['\s]/g,"-"), dep : dep})
  }

  setCityCodeAndCoords(city_code, coords, city_name){
    this.city_code = city_code;
    this.coords = coords;
    this.city_name = city_name;
  }

  submitToPredictor(){
    this.props.navigate("/results", {state : {
      city_code : this.city_code,
      latitude : this.coords.lat,
      longitude : this.coords.lon,
      city_name: this.city_name
    }});
    //const datas = callPredictor(this.city_code, this.coords.lat, this.coords.lon);
    //console.log(datas);
  }

  render(){
    return (
      <div className="App">
        <Header/>
        <div className="horizontalMapContainer">
          <div className="leftMapContainer">
            <MapTitle>
            </MapTitle>
            <AdvancedSearch chooseAdvanced={this.chooseAdvanced.bind(this)}>
            </AdvancedSearch>
            <Box sx={{alignSelf : "end", height : "50%", display:"flex"}}>
              <Button variant="contained" sx={{backgroundColor : "#005403", alignSelf:"end"}} onClick={this.submitToPredictor.bind(this)}>Predict</Button>
            </Box>
          </div>
          <div className="rightMapContainer">
              <Map dep={this.state.dep} advancedCode={this.state.advanced_code} advancedName={this.state.advanced_name} setCityCodeAndCoords={this.setCityCodeAndCoords.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}

export default withNavigation(MapPage);

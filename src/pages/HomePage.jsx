import '../styles/HomePage.css';

import Header from "../components/header";
import HomeTitle from "../components/homeTitle"
import AdvancedSearch from "../components/advancedSearch"
import Map from '../components/map/Map';
import React from 'react';
import latinize from 'latinize';

class HomePage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      advanced_code : "00",
      advanced_name : "00",
      dep : "00-00"
    }
  }

  chooseAdvanced(code, name, dep){
    this.setState({advanced_code : code, advanced_name : latinize(name.toLowerCase()).replace(/['\s]/g,"-"), dep : dep})
  }

  render(){
    return (
      <div className="App">
        <Header/>
        <div className="horizontalHomeContainer">
          <div className="leftHomeContainer">
            <HomeTitle>
            </HomeTitle>
            <AdvancedSearch chooseAdvanced={this.chooseAdvanced.bind(this)}>
            </AdvancedSearch>
          </div>
          <div className="rightHomeContainer">
              <Map dep={this.state.dep} advancedCode={this.state.advanced_code} advancedName={this.state.advanced_name}/>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;

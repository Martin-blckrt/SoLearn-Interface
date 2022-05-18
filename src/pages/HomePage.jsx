import '../styles/HomePage.css';

import Header from "../components/header";
import HomeTitle from "../components/homeTitle"
import AdvancedSearch from "../components/advancedSearch"
import Map from '../components/map/Map';

function HomePage() {
  return (
      <div className="App">
        <Header/>
        <div className="horizontalHomeContainer">
          <div className="leftHomeContainer">
            <HomeTitle>
            </HomeTitle>
            <AdvancedSearch>
            </AdvancedSearch>
          </div>
          <div className="rightHomeContainer">
              <Map/>
          </div>
        </div>
      </div>
  );
}

export default HomePage;

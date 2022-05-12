import '../styles/HomePage.css';

import Header from "../components/header";
import HomeTitle from "../components/homeTitle"
import AdvancedSearch from "../components/advancedSearch"
import Map from '../components/map/Map';

function HomePage() {
  return (
      <div className="App">
        <Header>
        </Header>
        <div className="horizontalContainer">
          <div className="leftContainer">
            <HomeTitle>
            </HomeTitle>
            <AdvancedSearch>
            </AdvancedSearch>
          </div>
          <div className="rightContainer">
              <Map></Map>
          </div>
        </div>
      </div>
  );
}

export default HomePage;

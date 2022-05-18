import React from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup, FeatureGroup, Polygon, GeoJSON } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import Departement from './Departement';
import Commune from './Commune';
import '../../styles/Map.css';

const blueOptions = { color: '#081b78', fillColor: '#081b78'};
const greenOptions = { color: '#087020', fillColor: '#087020' };

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          departements : [],
          communes : [],
          selected_code : props.dep.split(/-(.+)/s)[0],
          selected_commune : props.advancedCode,
          dep_ref :null,
          com_ref:null,
          meteo : {},
        };
        this.min_zoom = 6;
        this.map_ref = React.createRef();
        this.dep_refs = {};
        this.com_refs = {};
      }

    componentDidMount() {
        fetch("http://localhost:8000/geography/departements/all",{
            "method" : "GET",
            "headers" : {
                "content-type" : "application/json"
            }
        })
        .then(data=>data.json())
        .then(geojson=>{
            const parsed = JSON.parse(geojson);
            parsed.forEach((data)=>{
                this.dep_refs[data.properties.code] = React.createRef();
            });
            this.setState({departements : parsed});
        });
    }

    handlerTimeout(map){
        this.min_zoom = Math.ceil(map.getZoom());
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.dep_ref !== prevState.dep_ref && this.state.dep_ref != null) {
            const map = this.map_ref.current;  //get native Map instance
            const group = this.state.dep_ref; //get native featureGroup instance
            map.flyToBounds(group.getBounds(), {'duration':0.5});
            setTimeout(this.handlerTimeout.bind(this),500,map);
        }else if(this.props.advancedCode != prevProps.advancedCode){
            const dep_datas = this.props.dep.split(/-(.+)/s);
            this.selectDepartement(dep_datas[0], dep_datas[1]);
            setTimeout(this.selectCommune.bind(this), 500, this.props.advancedCode);
        }
      }

    selectDepartement(code, name){
        console.log(code, name);
        fetch("http://localhost:8000/geography/departements/communes/all",{
            "method" : "POST",
            "headers" : {
                "content-type" : "application/json"
            },
            body:JSON.stringify({
                "dep": `${code}-${name}`
            })
        })
        .then(data=>data.json())
        .then(geojson=>{
            geojson.features.forEach((data)=>{
                this.com_refs[data.properties.code] = React.createRef();
            });
            this.setState({selected_code: code, communes : geojson.features, dep_ref:this.dep_refs[code].current});
        });
    }

    selectCommune(code_commune){
        if(this.state.com_ref != null){
            this.state.com_ref.setStyle(greenOptions);
        }
        console.log(this.com_refs);
        const com_ref = this.com_refs[code_commune].current;
        com_ref.setStyle(blueOptions);
        com_ref.bringToFront();
        this.getCityFromCommune(code_commune);
        this.setState({com_ref:com_ref});
    }

    getCityFromCommune(code){
        fetch(`https://geo.api.gouv.fr/communes/${code}?fields=codesPostaux&format=json&geometry=centre`,{
            "method" : "GET",
            "headers" : {
                "content-type" : "application/json"
            }
        })
        .then(data=>data.json())
        .then(res=>{
            this.getCoordsFromCode(res.codesPostaux[0]);
        });
        
    }

    getCoordsFromCode(code){
        fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${code},FR&appid=fe4219bc43e2fefcdcf1528cadca3ddd`,{
            "method" : "GET",
            "headers" : {
                "content-type" : "application/json"
            }
        })
        .then(data=>data.json())
        .then(res=>{
            console.log(res.lat, res.lon);
            this.getMeteoFromCoords(res.lat, res.lon);
        });
    }

    getMeteoFromCoords(lat, lon){
        console.log(lat, lon);
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=49afb958f2e6418e3e582687eeda45b4`,{
            "method" : "GET",
            "headers" : {
                "content-type" : "application/json"
            }
        })
        .then(data=>data.json())
        .then(res=>{
            console.log(res);
        });
    }

    handlerZoomEnd(e){
        if(this.min_zoom > e.target.getZoom()){
            this.setState({selected_code : "00", selected_commune : "00"});
        }
    }

    render() {
        return (
            <div>
                <MapContainer ref={this.map_ref} style={{float:"right",height:"85vh", width:"50vw", zIndex:0}} center={[46.430, 2.219]} zoom={6} scrollWheelZoom={true} whenReady={(map)=>map.target.on("zoomend", this.handlerZoomEnd.bind(this))}>
                    <TileLayer
                        attribution='Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
                        url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
                    />
                    {
                        this.state.departements.map(geoJSON=>{
                            if(geoJSON.properties.code != this.state.selected_code){
                                return <Departement depRef={this.dep_refs[geoJSON.properties.code]} key={geoJSON.properties.code} datas={geoJSON} selectDepartement={this.selectDepartement.bind(this)}></Departement>
                            }else{
                                return this.state.communes.map(geoJSON=>{
                                    return <Commune comRef={this.com_refs[geoJSON.properties.code]} key={geoJSON.properties.code} datas={geoJSON} selectCommune={this.selectCommune.bind(this)}></Commune>
                                });
                            }
                        })
                    }
                </MapContainer>

            </div>
        );
    }
}

export default Map;

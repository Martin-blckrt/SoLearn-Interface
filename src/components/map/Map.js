import React from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup, FeatureGroup, Polygon, GeoJSON } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import Departement from './Departement';
import Commune from './Commune';
import '../../styles/Map.css';
import { useNavigate } from "react-router-dom";
import {getAllDepartements, getAllCommunesOfDepartement, getCityFromCommune, getCoordsFromCode, getMeteoFromCoords, getSolarFromCoords, checkToken} from '../misc/requests';

const blueOptions = { color: '#081b78', fillColor: '#081b78'};
const greenOptions = { color: '#087020', fillColor: '#087020' };

export const  withNavigation = (Component) => {
    return props => <Component {...props} navigate={useNavigate()} />;
} 

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
        this.is_processing_commune = false;
        this.min_zoom = 6;
        this.map_ref = React.createRef();
        this.dep_refs = {};
        this.com_refs = {};
      }

    async componentDidMount() {
        if(await checkToken()){
            const deps = await getAllDepartements();
            deps.forEach((dep)=>{
                this.dep_refs[dep.properties.code] = React.createRef();
            });
            this.setState({departements : deps});
        }else{
            this.props.navigate("/");
        }
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

    async selectDepartement(code, name){
        const communes = await getAllCommunesOfDepartement(code, name);
        communes.features.forEach((commune)=>{
            this.com_refs[commune.properties.code] = React.createRef();
        });
        this.setState({selected_code: code, communes : communes.features, dep_ref:this.dep_refs[code].current});
    }

    async selectCommune(code_commune){
        if(!this.is_processing_commune){
            this.is_processing_commune = true;
            console.log(this.state.com_ref)
            if(this.state.com_ref != null){
                this.state.com_ref.setStyle(greenOptions);
            }
            const com_ref = this.com_refs[code_commune].current;
            com_ref.setStyle(blueOptions);
            com_ref.bringToFront();
            await this.getDatas(code_commune);
            this.is_processing_commune = false;
            this.setState({com_ref:com_ref});
        }
    }

    async getDatas(code){
        const city_data = await getCityFromCommune(code);
        const coords = await getCoordsFromCode(city_data.codesPostaux[0]);
        this.props.setCityCodeAndCoords(city_data.codesPostaux[0], coords, city_data.nom);
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

export default withNavigation(Map);

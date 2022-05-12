import React from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup, FeatureGroup, Polygon, GeoJSON } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import latinize from "latinize";

const greenOptions = { color: '#13b038', fillColor: '#13b038' };

class Departement extends React.Component {
    constructor(props){
        super(props);
        this.dep_ref = React.createRef();
    }

    render() {
        return (
            <FeatureGroup ref={this.dep_ref} pathOptions={greenOptions}>
                <GeoJSON data={this.props.datas} eventHandlers={{
                    click: ()=>{
                        this.props.selectDepartement(this.props.datas.properties.code, latinize(this.props.datas.properties.nom.toLowerCase()).replace("'","-"),this.dep_ref);
                    }
                }}></GeoJSON>
            </FeatureGroup>
        );
    }
}

export default Departement;
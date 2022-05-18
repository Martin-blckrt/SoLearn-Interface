import React from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup, FeatureGroup, Polygon, GeoJSON } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import latinize from "latinize";

const greenOptions = { color: '#13b038', fillColor: '#13b038' };

class Departement extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <FeatureGroup ref={this.props.depRef} pathOptions={greenOptions}>
                <GeoJSON data={this.props.datas} id={this.props.id} eventHandlers={{
                    click: ()=>{
                        this.props.selectDepartement(this.props.datas.properties.code, latinize(this.props.datas.properties.nom.toLowerCase()).replace(/['\s]/g,"-"));
                    }
                }}></GeoJSON>
            </FeatureGroup>
        );
    }
}

export default Departement;
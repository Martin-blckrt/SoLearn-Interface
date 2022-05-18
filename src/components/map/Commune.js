import React from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup, FeatureGroup, Polygon, GeoJSON } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

const greenOptions = { color: '#087020', fillColor: '#087020' };

class Commune extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <FeatureGroup ref={this.props.comRef} pathOptions={greenOptions}>
                <GeoJSON data={this.props.datas} eventHandlers={{
                    click: ()=>{
                        this.props.selectCommune(this.props.datas.properties.code);
                    }
                }}></GeoJSON>
            </FeatureGroup>
        );
    }
}

export default Commune;
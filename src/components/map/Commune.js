import React from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup, FeatureGroup, Polygon, GeoJSON } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

const greenOptions = { color: '#087020', fillColor: '#087020' };

class Commune extends React.Component {
    constructor(props){
        super(props);
        this.com_ref = React.createRef();
    }

    render() {
        return (
            <FeatureGroup ref={this.com_ref} pathOptions={greenOptions}>
                <GeoJSON data={this.props.datas} eventHandlers={{
                    click: ()=>{
                        this.props.selectCommune(this.com_ref.current, this.props.datas.properties.code);
                    }
                }}></GeoJSON>
            </FeatureGroup>
        );
    }
}

export default Commune;
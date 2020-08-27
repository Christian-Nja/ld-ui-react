import React from 'react';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './TimeIndexedTypedLocation.css';

import { locationIcon } from '../../icon/ld-ui-icon';

export default function TimeIndexedTypedLocation(props) {
    const position = [
        props.data.timeIndexedTypedLocations[0].coordinates.latitude,
        props.data.timeIndexedTypedLocations[0].coordinates.longitude,
    ];
    const zoom = 6;
    return (
        <div>
            <Map center={position} zoom={zoom}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={locationIcon}></Marker>
            </Map>
        </div>
    );
}

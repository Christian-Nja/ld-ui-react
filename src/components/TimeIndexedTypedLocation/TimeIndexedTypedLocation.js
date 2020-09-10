import React, { useRef, useEffect } from 'react';

import { Map, TileLayer, Marker, FeatureGroup } from 'react-leaflet';
import Polyline from 'react-leaflet-arrowheads';
import 'leaflet/dist/leaflet.css';
import './TimeIndexedTypedLocation.css';

import { locationIcon } from '../../icon/ld-ui-icon';

import ClickableTooltip from './ClickableTooltip';

export default function TimeIndexedTypedLocation(props) {
    console.log(JSON.stringify(props.timeIndexedTypedLocations[0]));

    // optional as zoom is handled by markers
    const defaultCenter = [51, 0];
    const defaultZoom = 10;

    const lines = getTimeOrientedCoordinates(props.timeIndexedTypedLocations);

    const mapRef = useRef(null);

    // fit map focus to markers
    const onFeatureGroupAdd = (e) => {
        mapRef.current.leafletElement.fitBounds(e.target.getBounds());
    };

    return (
        <div>
            <Map
                center={defaultCenter}
                zoom={defaultZoom}
                ref={mapRef}
                zoomControl={false}
                attributionControl={false}
            >
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polyline
                    positions={lines}
                    arrowheads={{
                        fill: true,
                        size: '1%',
                        proportionalToTotal: true,
                    }}
                />
                <FeatureGroup onAdd={onFeatureGroupAdd}>
                    {props.timeIndexedTypedLocations.map((tITL, index) => {
                        return (
                            <Marker
                                position={[tITL.latitude, tITL.longitude]}
                                icon={locationIcon}
                                key={index}
                            >
                                <ClickableTooltip
                                    timeInterval={`${tITL.startTime} - ${
                                        tITL.endTime !== ''
                                            ? tITL.endTime
                                            : 'Today'
                                    }`}
                                    siteLabel={tITL.siteLabel}
                                ></ClickableTooltip>
                            </Marker>
                        );
                    })}
                </FeatureGroup>
            </Map>
        </div>
    );
}

function getTimeOrientedCoordinates(timeIndexedTypedLocations) {
    // here we're assuming time as years
    // bugs my arise if you pass datetime
    timeIndexedTypedLocations.sort((a, b) => {
        return parseInt(a.startTime) - parseInt(b.startTime);
    });
    var coordinatesArray = [];
    timeIndexedTypedLocations.forEach((element) => {
        coordinatesArray.push([element.latitude, element.longitude]);
    });
    return coordinatesArray;
}

/*
<button onClick={handleClick}>Zoom</button>

const handleClick = () => {
    const map = mapRef.current.leafletElement;
    const group = groupRef.current.leafletElement;
    map.fitBounds(group.getBounds());
};
*/

import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

// import "overlapping-marker-spiderfier-leaflet/dist/oms";
// const OverlappingMarkerSpiderfier = window.OverlappingMarkerSpiderfier;
// https://stackoverflow.com/questions/59306768/marker-clustering-leaflet-markercluster-with-react-leaflet-2-0

/**
 * css
 */
import 'leaflet/dist/leaflet.css';
import './TimeIndexedTypedLocation.css';

/**
 * Internal modules
 */

import { useMap } from '../hooks/ld-ui-hooks';
import { blueMarkerIcon } from '../../icon/ld-ui-icon';
import tITLPopup from './tITLPopup';

export default function TimeIndexedTypedLocation(props) {
    // optional as zoom is handled by markers
    const lines = getTimeOrientedCoordinates(props.timeIndexedTypedLocations);

    const mapRef = useRef(null);
    const markerRefs = useRef([]);

    useMap(mapRef);

    useEffect(() => {
        const mcg = L.markerClusterGroup();
        /** display markers */
        var bounds = L.latLngBounds();

        props.timeIndexedTypedLocations.forEach((tITL, index) => {
            const markerPosition = [
                parseFloat(tITL.latitude),
                parseFloat(tITL.longitude),
            ];
            const popupContent = {
                city: tITL.city,
                siteLabel: tITL.siteLabel,
                timeInterval: `${tITL.startTime} - ${
                    tITL.endTime !== '' ? tITL.endTime : 'Today'
                }`,
            };
            var popup = L.popup()
                .setContent(tITLPopup(popupContent))
                .setLatLng(markerPosition);

            markerRefs.current[index] = L.marker(markerPosition, {
                icon: blueMarkerIcon,
            })
                .addTo(mcg)
                .bindPopup(popup);

            //            bounds.extend(markerPosition);
            //mapRef.current.fitBounds(bounds, { padding: [50, 50] });
            mapRef.current.addLayer(mcg);
        });
    }, []);

    // add marker
    // const markerRef = useRef(null);
    // useEffect(() => {
    //     if (markerRef.current) {
    //         markerRef.current.setLatLng(markerPosition);
    //     } else {
    //         markerRef.current = L.marker(markerPosition).addTo(mapRef.current);
    //     }
    // }, [markerPosition]);

    return <div id="map"></div>;
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

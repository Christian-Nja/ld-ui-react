import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import '@elfalem/leaflet-curve';
import 'leaflet-polylinedecorator';
/**
 * css
 */
import 'leaflet/dist/leaflet.css';
import './TimeIndexedTypedLocation.css';

/**
 * Internal modules
 */

import { useMap } from '../hooks/ld-ui-hooks';
import { blueMarkerIcon, blackArrowHeadIcon } from '../../icon/ld-ui-icon';
import tITLPopup from './tITLPopup';
import { _getControlPoint } from '../../utilities/math';

export default function TimeIndexedTypedLocation(props) {
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

            bounds.extend(markerPosition);
            //            sleep(1000, index).then(() => {});
        });

        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
        mapRef.current.addLayer(mcg);

        let arrows = [];
        for (let i = 0; i < lines.length - 1; i++) {
            let path = drawCurve(lines[i], lines[i + 1], mapRef);
            arrows.push(path);
            let arrowhead = arrowHead(lines[i + 1]);
            arrowhead.addTo(mapRef.current);
        }

        arrows.forEach((arrow) => {
            arrow.addTo(mapRef.current);
        });

        //var path = drawCurve(lines[0], lines[1]);
        //path.addTo(mapRef.current);
    }, []);

    return <div id="map"></div>;
}

function arrowHead(coordinates) {
    return L.marker(coordinates, {
        icon: blackArrowHeadIcon,
    });
}

function drawCurve(coordinates_1, coordinates_2, mapRef) {
    const controlPointXoffset = 1;
    let path = L.curve(
        [
            'M',
            coordinates_1,
            'Q',
            _getControlPoint(coordinates_1, coordinates_2, controlPointXoffset),
            coordinates_2,
        ],
        { color: 'red', fill: false }
    );

    return path;
}

function getTimeOrientedCoordinates(timeIndexedTypedLocations) {
    // here we're assuming time as years
    // bugs my arise if you pass datetime
    timeIndexedTypedLocations.sort((a, b) => {
        return parseInt(a.startTime) - parseInt(b.startTime);
    });
    var coordinatesArray = [];
    timeIndexedTypedLocations.forEach((element) => {
        coordinatesArray.push([
            parseFloat(element.latitude),
            parseFloat(element.longitude),
        ]);
    });
    return coordinatesArray;
}

function sleep(ms, index) {
    console.log(index, ms);
    return new Promise((resolve) => setTimeout(resolve, index * ms));
}

import React, { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet-arrowheads';
import 'leaflet-arc';
/**
 * css
 */
import 'leaflet/dist/leaflet.css';
import './TimeIndexedTypedLocation.css';

/**
 * Internal modules
 */

import CONFIG from './config';
import { useMap } from '../hooks/ld-ui-hooks';
import tITLPopup from './tITLPopup';
import { _getControlPoint } from '../../utilities/math';

/**
 *
 * @param {Object} props React properties
 */
export default function TimeIndexedTypedLocation(props) {
    const lines = getTimeOrientedCoordinates(props.timeIndexedTypedLocations);
    const DARK_PROVIDER = 0;
    const DAY_PROVIDER = 1;

    /* configuration state 
     _______________________*/
    const [mapProvider, setMapProvider] = useState({
        url: CONFIG.MAP[DAY_PROVIDER].PROVIDER,
        attribution: CONFIG.MAP[DAY_PROVIDER].ATTRIBUTION,
    });
    const [isDepiction, setDepiction] = useState(CONFIG.DEPICTION);
    const [arrowState, setArrowState] = useState({
        color: CONFIG.ARROW.COLOR,
        headColor: CONFIG.ARROW.HEAD_COLOR,
        fillColor: CONFIG.ARROW.FILL_COLOR,
        size: CONFIG.ARROW.SIZE,
    });
    const [popupState, setPopupState] = useState({
        open: CONFIG.POPUP.OPEN,
        close: CONFIG.POPUP.CLOSE,
        openCluster: CONFIG.POPUP.OPEN_CLUSTER,
    });

    /** refs */
    const mapRef = useRef(null);
    const markerRefs = useRef([]);

    useMap(mapRef, mapProvider);

    useEffect(() => {
        const mcg = L.markerClusterGroup({
            iconCreateFunction: (cluster) => {
                return L.divIcon({
                    html: `${CONFIG.MARKER_ICON[1](cluster.getChildCount())}`,
                    className: 'cluster-icon',
                    iconAnchor: [15, 50],
                });
            },
        }).on(popupState.openCluster, function (e) {
            e.layer.spiderfy();
        });
        // .on("clustermouseout", function (e) {
        //     // setTimeout(() => {
        //     //     e.layer.unspiderfy();
        //     // }, 4000);
        //     // clear timeout
        // });

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
                icon: CONFIG.MARKER_ICON[0],
            })
                .addTo(mcg)
                .bindPopup(popup)
                .on(popupState.open, function (e) {
                    this.openPopup();
                })
                .on(popupState.close, function (e) {
                    this.closePopup();
                });

            bounds.extend(markerPosition);
            //            sleep(1000, index).then(() => {});
        });

        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
        mapRef.current.addLayer(mcg);

        let arrows = [];
        for (let i = 0; i < lines.length - 1; i++) {
            let arrow = getArrow(lines[i], lines[i + 1], arrowState);
            arrows.push(arrow);
        }

        arrows.forEach((arrow, index) => {
            sleep(2000, index).then(() => {
                arrow.addTo(mapRef.current);
            });
        });
    }, []);

    return (
        <div>
            {isDepiction ? (
                <img
                    className={'depiction'}
                    src={props.timeIndexedTypedLocations[0].depiction}
                ></img>
            ) : null}
            <div id="map"></div>
        </div>
    );
}

function getArrow(coordinates_1, coordinates_2, arrowState) {
    return L.Polyline.Arc(coordinates_1, coordinates_2, {
        vertices: 300,
        className: 'arrowheads',
        color: arrowState.color,
    }).arrowheads({
        yawn: 40,
        fill: true,
        size: arrowState.size,
        frequency: 'endonly',
        color: arrowState.headColor,
        fillColor: arrowState.fillColor,
    });
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
    return new Promise((resolve) => setTimeout(resolve, index * ms));
}

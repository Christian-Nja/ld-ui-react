import React, { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import * as d3 from 'd3';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

/**
 * css
 */
import 'leaflet/dist/leaflet.css';
import './TimeIndexedTypedLocation.css';

/**
 * Internal modules
 */

import CONFIG from './config';
import { useMap, usePane } from '../hooks/ld-ui-hooks';
import tITLPopup from './tITLPopup';

/* Define constants
 */
const DARK_PROVIDER = 0;
const DAY_PROVIDER = 1;
const GEO_JSON_LATITUDE = 1;
const GEO_JSON_LONGITUDE = 0;

/**
 *
 * @param {Object} props React properties
 */
export default function TimeIndexedTypedLocation(props) {
    /** mapRef */
    const mapRef = useRef(null);

    /** initialize map */
    useMap(mapRef, {
        url: CONFIG.MAP[DAY_PROVIDER].PROVIDER,
        attribution: CONFIG.MAP[DAY_PROVIDER].ATTRIBUTION,
    });
    /** initialize d3 layer */
    usePane(mapRef, 'd3-layer');

    /**
     * Prepare d3 functions
     */
    const projectLine = d3
        .line()
        .x(function (d) {
            return getLayerPoint(d).x;
        })
        .y(function (d) {
            return getLayerPoint(d).y;
        })
        .curve(d3.curveLinear);

    // this is used just to get bounds of d3 layer
    const transform = d3.geoTransform({ point: projectGeoPointToLeafletSvg }),
        path = d3.geoPath().projection(transform); // transform and map geoJson to map

    /**
     * inputs a GeoJSON data and returns the projected leaflet svg point
     * coordinates
     *
     * @param {object} d GeoJSON Point @see {@link https://en.wikipedia.org/wiki/GeoJSON|GeoJSON}
     * @returns {object} Leaflet Point @see {@link https://leafletjs.com/reference-1.7.1.html#point|Leaflet_Point}
     */
    function getLayerPoint(d) {
        var x = d.geometry.coordinates[GEO_JSON_LATITUDE];
        var y = d.geometry.coordinates[GEO_JSON_LONGITUDE];
        return mapRef.current.latLngToLayerPoint(new L.LatLng(x, y));
    }

    /**
     * This function is a d3 transform @see {@link https://github.com/d3/d3-geo/blob/v2.0.0/README.md#transforms|d3-transform} for further infos
     *
     * You can use it like this:

     * @example
     * var transform = d3.geoTransform({ point: projectPoint })
     * var path = d3.geoPath(transform)
     * 
     * You can now project points on an svg surface on a leaflet map
     *
     * @param {number} long Geojson point longitude
     * @param {number} lat Geojson point latitude
     */
    function projectGeoPointToLeafletSvg(long, lat) {
        var point = mapRef.current.latLngToLayerPoint(new L.LatLng(lat, long));
        this.stream.point(point.x, point.y);
    }

    /**
     * THE VISUALIZATION EFFECT
     */
    useEffect(() => {
        /* Defining an svg layer for D3 
        ________________________________*/

        var svg = d3
            .select(mapRef.current.getPane('d3-layer'))
            .append('svg')
            .attr('style', 'position:relative');

        var g = svg.append('g').attr('class', 'leaflet-zoom-hide');

        /* Iterating over data:
           - Creating markers and popup (Leaflet layer) 
           - Preparing GeoJSON for D3 Layer  @TODO: evaluate if moving markers on d3 layer
        ___________________________________*/

        const mcg = L.markerClusterGroup({
            iconCreateFunction: (cluster) => {
                return L.divIcon({
                    html: `${CONFIG.MARKER_ICON[1](cluster.getChildCount())}`,
                    className: 'cluster-icon',
                    iconAnchor: [15, 50],
                });
            },
        }).on(CONFIG.POPUP.OPEN_CLUSTER, function (e) {
            e.layer.spiderfy();
        });

        let geoJSON = {
            type: 'FeatureCollection',
            features: [],
        };

        props.timeIndexedTypedLocations.forEach((tITL, index) => {
            geoJSON.features.push({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [
                        parseFloat(tITL.longitude),
                        parseFloat(tITL.latitude),
                    ],
                },
            });

            const markerPosition = [
                geoJSON.features[index].geometry.coordinates[GEO_JSON_LATITUDE],
                geoJSON.features[index].geometry.coordinates[
                    GEO_JSON_LONGITUDE
                ],
            ];

            const popupContent = {
                city: tITL.city,
                siteLabel: tITL.siteLabel,
                timeInterval: `${tITL.startTime} - ${
                    tITL.endTime !== '' ? tITL.endTime : 'Today'
                }`,
            };
            const popup = L.popup()
                .setContent(tITLPopup(popupContent))
                .setLatLng(markerPosition);

            L.marker(markerPosition, {
                icon: CONFIG.MARKER_ICON[0],
            })
                .addTo(mcg)
                .bindPopup(popup)
                .on(CONFIG.POPUP.OPEN, function (e) {
                    this.openPopup();
                })
                .on(CONFIG.POPUP.CLOSE, function (e) {
                    this.closePopup();
                });
        });

        /* Add marker to maps and fit zoom
        ___________________________________ */
        mapRef.current.fitBounds(mcg.getBounds(), { padding: [120, 120] });
        mapRef.current.addLayer(mcg);

        /* Draw line connecting locations  
        ____________________________________*/

        let linePath = g
            .selectAll('.locationsLine')
            .data([geoJSON.features])
            .enter()
            .append('path')
            .attr('class', 'locationsLine')
            .attr('style', `stroke:${CONFIG.ARROW.COLOR}`);

        // This will be our traveling circle it will
        // travel along our path
        var travelMarker = g
            .append('circle')
            .attr('r', 10)
            .attr('id', 'marker')
            .attr('class', 'travelMarker');

        mapRef.current.on('zoomend', adaptD3Layer);
        adaptD3Layer();
        moveCulturalProperty();

        function adaptD3Layer() {
            // Get bounding box of points
            const bounds = path.bounds(geoJSON),
                topLeft = bounds[0],
                bottomRight = bounds[1];

            // Setting the size and location of the overall SVG container
            svg.attr('width', bottomRight[0] - topLeft[0] + 120)
                .attr('height', bottomRight[1] - topLeft[1] + 120)
                .style('left', topLeft[0] - 50 + 'px')
                .style('top', topLeft[1] - 50 + 'px');

            // translate group
            g.attr(
                'transform',
                `translate(${-topLeft[0] + 50},${-topLeft[1] + 50})`
            );

            travelMarker.attr('transform', function () {
                const START_POINT = 0;
                var x =
                    geoJSON.features[START_POINT].geometry.coordinates[
                        GEO_JSON_LONGITUDE
                    ];
                var y =
                    geoJSON.features[START_POINT].geometry.coordinates[
                        GEO_JSON_LATITUDE
                    ];

                return `translate(${
                    mapRef.current.latLngToLayerPoint(new L.LatLng(y, x)).x
                },${mapRef.current.latLngToLayerPoint(new L.LatLng(y, x)).y})`;
            });

            linePath.attr('d', projectLine);
        }

        function moveCulturalProperty() {
            linePath
                .transition()
                .duration(CONFIG.TRANSITION_DURATION)
                .attrTween('stroke-dasharray', tweenDash);
        }

        function tweenDash() {
            return function (t) {
                //total length of path (single value)
                const l = linePath.node().getTotalLength();
                const interpolate = d3.interpolateString(`0,${l}`, `${l},${l}`);

                //t is fraction of time 0-1 since transition began
                const marker = d3.select('#marker');

                // p is the point on the line (coordinates) at a given length
                // along the line. In this case if l=50 and we're midway through
                // the time then this would 25.
                const p = linePath.node().getPointAtLength(t * l);

                //Move the marker to that point
                marker.attr('transform', `translate(${p.x},${p.y})`);
                return interpolate(t);
            };
        }
    }, []);

    return (
        <div>
            {CONFIG.DEPICTION ? (
                <img
                    className={'depiction'}
                    src={props.timeIndexedTypedLocations[0].depiction}
                ></img>
            ) : null}
            <div id="map"></div>
        </div>
    );
}

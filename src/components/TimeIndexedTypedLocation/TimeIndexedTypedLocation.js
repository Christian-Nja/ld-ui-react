import React, { useRef, useEffect } from 'react';
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
import {
    projectLine,
    leafletTransform,
    fitSvg,
    getLayerPoint,
} from '../../utilities/d3leaflet';

/* Define constants
 */
const DARK_PROVIDER = 0;
const DAY_PROVIDER = 1;
const GEO_JSON_LATITUDE = 1;
const GEO_JSON_LONGITUDE = 0;

/**
 * A component to visualize TimeIndexedTypedLocation 's
 *
 *
 * @param {Object} props React properties
 * @param ...
 *
 * @TODO - describe props interface
 *       - add style to props interface
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
    usePane(mapRef, 'd3-layer', 625);

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
    const path = leafletTransform(projectGeoPointToLeafletSvg);

    useEffect(() => {
        /* Defining an svg layer for D3 
        ________________________________*/

        var svg = d3
            .select(mapRef.current.getPane('d3-layer'))
            .append('svg')
            .attr('style', 'position:relative');

        var g = svg.append('g').attr('class', 'leaflet-zoom-hide');

        svg.append('svg:defs')
            .append('svg:marker')
            .attr('id', 'arrow')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 0)
            .attr('refY', 0)
            .attr('markerWidth', 6)
            .attr('markerHeight', 6)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M0,-5L10,0L0,5')
            .attr('class', 'arrowHead');

        /* Iterating over data:
           - Creating markers and popup (Leaflet layer) 
           - Preparing GeoJSON for D3 Layer  
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

        /* Draw line connecting locations and arrowheads
        _________________________________________________*/

        let linePath = g
            .selectAll('.locationsLine')
            .data([geoJSON.features])
            .enter()
            .append('path')
            .attr('class', 'locationsLine')
            .attr('style', `stroke:${CONFIG.ARROW.COLOR}`);

        const depiction = g
            .append('svg:image')
            .attr('x', -20)
            .attr('y', -20)
            .attr('height', 60)
            .attr('width', 50)
            .attr('xlink:href', props.timeIndexedTypedLocations[0].depiction);

        mapRef.current.on('zoomend', adaptD3Layer);
        adaptD3Layer();

        function adaptD3Layer() {
            // Get bounding box of points / coordinates / data / markers in the map
            const bounds = path.bounds(geoJSON),
                topLeft = bounds[0],
                bottomRight = bounds[1];

            // Setting the size and location of the overall SVG container
            fitSvg(svg, bounds);

            // translate group
            g.attr(
                'transform',
                `translate(${-topLeft[0] + 50},${-topLeft[1] + 50})`
            );

            depiction.attr('transform', function () {
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

            linePath.attr('marker-end', 'url(#arrow)');
            linePath.attr('marker-mid', 'url(#arrow)');

            linePath.attr('d', projectLine(mapRef.current));

            moveLine();
        }

        function moveLine() {
            linePath
                .transition()
                .ease(d3.easeLinear)
                .duration(CONFIG.TRANSITION_DURATION)
                .attrTween('stroke-dasharray', tweenDash);
        }

        function tweenDash() {
            return function (t) {
                //total length of path (single value)
                const l = linePath.node().getTotalLength();
                const interpolate = d3.interpolateString(`0,${l}`, `${l},${l}`);

                // p is the point on the line (coordinates) at a given length
                // along the line. In this case if l=50 and we're midway through
                // the time then this would 25.
                const p = linePath.node().getPointAtLength(t * l);

                //Move the image to that point
                depiction.attr('transform', `translate(${p.x},${p.y})`);

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

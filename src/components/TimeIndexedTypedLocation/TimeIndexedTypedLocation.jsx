import React, { useRef, useEffect, useState } from "react";
import L from "leaflet";
import * as d3 from "d3";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

/**
 * css
 */
import "leaflet/dist/leaflet.css";
import "./TimeIndexedTypedLocation.css";

/**
 * Internal modules
 */

import CONFIG from "./config";
import { useMap, usePane } from "../hooks/ld-ui-hooks";
import tITLPopup from "./tITLPopup";
import {
    projectLine,
    leafletTransform,
    fitSvg,
    getLayerPoint,
    passOver,
} from "../../utilities/d3leaflet";
import { getAngle } from "../../utilities/math";

/* Define constants
 */
const GEO_JSON_LATITUDE = 1;
const GEO_JSON_LONGITUDE = 0;
const ORIGIN = 0;
const FIRST_ARROWHEAD = 1;

const D3_ZINDEX = 625; // over markers under tooltip and popup

/**
 * @typedef TimeIndexedTypedLocation
 * @property {string} long longitude of the location as a string
 * @property {string} lat latitude of the location as a string
 * @property {string} startTime start time of the interval the indexed location
 * @property {string} endTime end time of the interval of the indexed location
 * @property {string} locationType the type of the location
 */

/**
 * @description A component to show time indexed typed locations in a geographical map.
 *
 * @author Christian Colonna
 * @date 26-11-2020
 * @export
 * @component
 * @param {{ timeIndexedTypedLocations : TimeIndexedTypedLocation [], depiction : string } }
 */
export default function TimeIndexedTypedLocation({
    timeIndexedTypedLocations,
    cPropDepiction,
    cPropLabel,
    onCulturalPropertyClick = () => {
        console.log("click");
    },
}) {
    /** mapRef */
    const mapRef = useRef(null);

    /** initialize map */
    useMap(mapRef, {
        url: CONFIG.MAP[CONFIG.DEFAULT_PROVIDER].PROVIDER,
        attribution: CONFIG.MAP[CONFIG.DEFAULT_PROVIDER].ATTRIBUTION,
    });
    /** initialize d3 layer */
    usePane(mapRef, "d3-layer", D3_ZINDEX);

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
            .select(mapRef.current.getPane("d3-layer"))
            .append("svg")
            .attr("style", "position:relative");

        var g = svg.append("g").attr("class", "leaflet-zoom-hide");

        /* Iterating over data:
           - Creating markers and popup (Leaflet layer) 
           - Preparing GeoJSON          (D3 Layer)  
        ___________________________________*/
        const mcg = L.markerClusterGroup({
            iconCreateFunction: (cluster) => {
                return L.divIcon({
                    html: `${CONFIG.MARKER_ICON[1](cluster.getChildCount())}`,
                    className: "cluster-icon",
                    iconAnchor: [15, 50],
                });
            },
        }).on(CONFIG.POPUP.OPEN_CLUSTER, function (e) {
            e.layer.spiderfy();
        });

        let geoJSON = {
            type: "FeatureCollection",
            features: [],
        };

        sortByTime(timeIndexedTypedLocations);

        timeIndexedTypedLocations.forEach((tITL, index) => {
            geoJSON.features.push({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [parseFloat(tITL.long), parseFloat(tITL.lat)],
                },
            });

            const markerPosition = [
                geoJSON.features[index].geometry.coordinates[GEO_JSON_LATITUDE],
                geoJSON.features[index].geometry.coordinates[
                    GEO_JSON_LONGITUDE
                ],
            ];

            const popupContent = {
                timeInterval: `${tITL.startTime} - ${
                    tITL.endTime !== "" ? tITL.endTime : "Today"
                }`,
                locationType: tITL.locationType.split("/").pop(), // at the moment we pass the uri TODO: pass the label
                culturalProperty:
                    timeIndexedTypedLocations[0].cPropLabel !== ""
                        ? timeIndexedTypedLocations[0].cPropLabel
                        : "Bene culturale",
                address: timeIndexedTypedLocations[0].addressLabel,
            };
            const popup = L.popup()
                .setContent(tITLPopup(popupContent))
                .setLatLng(markerPosition);

            L.marker(markerPosition, {
                icon: CONFIG.MARKER_ICON[0],
            })
                .addTo(mcg)
                .bindPopup(popup)
                .on("click", function (e) {
                    this.openPopup();
                    const cProp = document.getElementsByClassName(
                        "cultural-property"
                    );
                    console.log(cProp);
                    cProp[0].style.cursor = "pointer";
                    cProp[0].addEventListener("click", function (e) {
                        onCulturalPropertyClick();
                    });
                });
        });

        /* Add marker to maps and fit zoom
        ___________________________________ */
        mapRef.current.fitBounds(mcg.getBounds(), { padding: [120, 120] });
        mapRef.current.addLayer(mcg);

        /* Draw line connecting locations and arrowheads
        _________________________________________________*/

        let linePath = g
            .selectAll(".locationsLine")
            .data([geoJSON.features])
            .enter()
            .append("path")
            .attr("class", "locationsLine")
            .attr("style", `stroke:${CONFIG.ARROW.COLOR}`);

        const arrowheads = g
            .selectAll(".arrowheads")
            .data(geoJSON.features)
            .enter()
            .append("svg:path")
            .attr("class", "arrowheads")
            .attr(
                "d",
                d3
                    .symbol()
                    .type(d3.symbolTriangle)
                    .size(CONFIG.ARROW.ARROWHEAD_SIZE)
            )
            .style("stroke", "blue")
            .style("fill", "blue");

        // check if the depiction has been put between timeIndexTypedLocation pattern data
        cPropDepiction = cPropDepiction
            ? cPropDepiction
            : timeIndexedTypedLocations[0].depiction;

        const depiction = g
            .append("svg:image")
            .attr("x", -20)
            .attr("y", -20)
            .attr("height", 120)
            .attr("width", 60)
            .attr("xlink:href", cPropDepiction);

        let arrowheadsNodes;

        mapRef.current.on("zoomend", adaptD3Layer);
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
                "transform",
                `translate(${-topLeft[0] + 50},${-topLeft[1] + 50})`
            );

            depiction.attr("transform", function () {
                var x =
                    geoJSON.features[ORIGIN].geometry.coordinates[
                        GEO_JSON_LONGITUDE
                    ];
                var y =
                    geoJSON.features[ORIGIN].geometry.coordinates[
                        GEO_JSON_LATITUDE
                    ];

                return `translate(${
                    mapRef.current.latLngToLayerPoint(new L.LatLng(y, x)).x
                },${mapRef.current.latLngToLayerPoint(new L.LatLng(y, x)).y})`;
            });

            // make arrowheads transparent
            arrowheadsNodes = arrowheads.nodes();
            // make arrowheads transparent at first time
            arrowheadsNodes.forEach((a) => {
                a.style.opacity = 0;
            });

            // translate and rotate arrowheads
            arrowheads.attr("transform", function (d, i) {
                if (i === ORIGIN) {
                    return;
                }
                const rotationAngle = getAngle(
                    arrowheadsNodes[i].__data__.geometry.coordinates,
                    arrowheadsNodes[i - 1].__data__.geometry.coordinates
                );

                return `translate(${
                    getLayerPoint(d, mapRef.current).x
                },${getLayerPoint(d, mapRef.current).y}) rotate(${rotationAngle})`;
            });

            // https://stackoverflow.com/a/25946400/12506641 check this for arc
            linePath.attr("d", projectLine(mapRef.current));

            moveLine();
        }

        function moveLine() {
            linePath
                .transition()
                .ease(d3.easeLinear)
                .duration(CONFIG.TRANSITION_DURATION)
                .attrTween("stroke-dasharray", tweenDash);
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

                // if there's some arrow to appear
                if (arrowheadsNodes[FIRST_ARROWHEAD]) {
                    const arrow = getLayerPoint(
                        arrowheadsNodes[FIRST_ARROWHEAD].__data__,
                        mapRef.current
                    );
                    const tolerance = 5;

                    if (passOver([p.x, p.y], [arrow.x, arrow.y], tolerance)) {
                        arrowheadsNodes[FIRST_ARROWHEAD].style.opacity = 1; // make arrowhead visible
                        arrowheadsNodes.splice(FIRST_ARROWHEAD, 1); // remove from arrowheads to appear
                    }
                }

                //Move the image to that point
                depiction.attr("transform", `translate(${p.x},${p.y})`);

                return interpolate(t);
            };
        }
    }, []);

    return (
        <div>
            <div id="map"></div>
        </div>
    );
}

/**
 * Sort the resources by time
 * modify the original array
 *
 * @param {Object[]} timeIndexedTypedLocations
 */
function sortByTime(timeIndexedTypedLocations) {
    timeIndexedTypedLocations.sort((a, b) => {
        return parseInt(a.startTime) - parseInt(b.startTime);
    });
    return timeIndexedTypedLocations;
}

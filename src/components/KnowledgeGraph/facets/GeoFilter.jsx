import React, {
    useContext,
    useState,
    useRef,
    useEffect,
    useLayoutEffect,
} from "react";
import { Context } from "../Context";

import { useAlert } from "../../hooks/ld-ui-hooks";

import { Map, TileLayer, FeatureGroup, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";

import { cloneDeep } from "lodash";

import GeoJsonGeometriesLookup from "geojson-geometries-lookup";

const circleToPolygon = require("circle-to-polygon");
const numberOfEdges = 64;

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet-draw/dist/leaflet.draw.css";
import { blueMarkerIcon } from "../../../icon/ld-ui-icon";

/**
 * node {
 *     id: uri
 *     lat: latitude
 *     long: longitude
 * }
 */

GeoFilter.defaultProps = {
    id: "geo",
    options: {},
};

const POLYGON_CREATED = 1;
const SHAPE_DELETED = 2;

export default function GeoFilter({
    id = "geo",
    options = {},
    closeFilterMenuItem = () => {
        console.log("close filter");
    },
}) {
    const startDrawFlag = "Start draw";
    const stopDrawFlag = "Stop Draw";

    const [mapUIState, setMapUI] = useState(startDrawFlag);
    const [mapState, setMapState] = useState(null);

    const mapRef = useRef();
    const editRef = useRef();

    const [context, setContext] = useContext(Context);
    const setAlert = useAlert(context, setContext);
    // read nodes from global context
    const nodes = context.nodes;
    const active = context.filterConfig[id].state;

    // prepare map
    useEffect(() => {
        console.log("mapRef");
        if (mapRef.current) {
            const map = mapRef.current.leafletElement;
            const mcg = L.markerClusterGroup();
            mcg.clearLayers();

            nodes.forEach((node) => {
                if (node.lat && node.long) {
                    L.marker([node.lat, node.long], {
                        icon: blueMarkerIcon,
                    }).addTo(mcg);
                    // .bindPopup(L.popup().setContent(customPopup).setLatLng([node.lat, node.long]))
                }
            });
            map.fitBounds(mcg.getBounds(), {
                padding: [120, 120],
                maxZoom: 8,
            });
            map.addLayer(mcg);
        }
    }, [mapRef]);

    // This code is needed to listen for change on geo button filter class -> change is triggered on opening button
    // Once it opens the resize event is dispatched. This is needed to solve an issue with leaflet
    // if leaflet map container has style display:none it doesn't size properly tiles
    // we did this to mantain decoupled menu button and filter
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutationRecord) {
            window.dispatchEvent(new Event("resize"));
        });
    });
    var target = document.getElementsByClassName(`${id}-filter-button`)[0];
    if (target) {
        observer.observe(target, {
            attributes: true,
            attributeFilter: ["class"],
        });
    }

    const initialFeatureGroup = { type: "FeatureCollection", features: [] };
    const [featureGroup, setFeatureGroup] = useState(
        context.filterConfig[id].options.featureGroup
            ? context.filterConfig[id].options.featureGroup
            : initialFeatureGroup
    );

    const ZOOM_LEVEL = 12;
    const MAX_ZOOM = 8;
    const [center, setCenter] = useState({ lat: 24.2, lng: 54.37 });

    // run this effect only on component update
    const isMounted = useRef(false);
    useEffect(() => {
        if (isMounted) {
            let newRemovedNodes = cloneDeep(context.removedNodes);
            let newFilterConfig = cloneDeep(context.filterConfig);
            if (active) {
                // here logic to set true only nodes inside featureGroup
                nodes.forEach((node) => {
                    // disable every node without the value key
                    if (!node.lat || !node.long) {
                        let nodeState = newRemovedNodes.get(node.id);
                        nodeState.set(id, false);
                    }
                    // touch only nodes with geometry
                    if (node.lat && node.long) {
                        // get node in map
                        let nodeState = newRemovedNodes.get(node.id);
                        let geolookup = new GeoJsonGeometriesLookup(
                            featureGroup
                        );
                        let point = {
                            type: "Point",
                            coordinates: [node.long, node.lat],
                        };
                        if (geolookup.hasContainers(point)) {
                            // node inside geoJSON set true
                            nodeState.set(id, true);
                        } else {
                            // node not in geoJSON set false
                            nodeState.set(id, false);
                        }
                    }
                });
            } else {
                // filter inactive
                // every node is true on this filter key
                // this filter hasn't effect on nodes
                nodes.forEach((node) => {
                    let nodeState = newRemovedNodes.get(node.id);
                    nodeState.set(id, true);
                });
            }
            newFilterConfig[id].options.featureGroup = featureGroup;
            console.log("[*] We are filtering");
            console.log(newRemovedNodes);
            setContext({
                ...context,
                removedNodes: newRemovedNodes,
                filterConfig: newFilterConfig,
            });
        } else {
            isMounted.current = true;
        }
    }, [featureGroup, active]);

    useEffect(() => {
        console.log("Context inside geo filter");
        console.log(context);
        console.log("Fiature group in filter");
        console.log(featureGroup);
        // launch message just if filter is active
        if (active) {
            setAlert("Nodes filtered");
        }
    }, [context.removedNodes]);

    const onFilterCreated = (e) => {
        const l = e.layer;
        let newFeature = l.toGeoJSON();
        newFeature.properties.id = L.stamp(l);
        // add id
        if (l instanceof L.Circle) {
            const radius = l.getRadius();
            const center = l.getLatLng();
            let polygon = circleToPolygon(
                [center.lng, center.lat],
                radius,
                numberOfEdges
            );
            newFeature.geometry = polygon;
        }

        let newFeatureGroup = cloneDeep(featureGroup);
        newFeatureGroup.features.push(newFeature);
        setFeatureGroup(newFeatureGroup);
    };

    const onEdited = (e) => {
        let newFeatureGroup = cloneDeep(featureGroup);
        e.layers.eachLayer((l) => {
            let newFeature = l.toGeoJSON();
            const id = L.stamp(l);
            newFeature.properties.id = id;
            if (l instanceof L.Circle) {
                const radius = l.getRadius();
                const center = l.getLatLng();
                let polygon = circleToPolygon(
                    [center.lng, center.lat],
                    radius,
                    numberOfEdges
                );
                newFeature.geometry = polygon;
            }
            // remove modified feature by id
            newFeatureGroup.features = newFeatureGroup.features.filter((f) => {
                return f.properties.id !== id;
            });
            newFeatureGroup.features.push(newFeature);
        });
        setFeatureGroup(newFeatureGroup);
    };

    const onDeleted = (e) => {
        // with the commented approach there are problems with session featureGroup
        // cancel remove them by leaflet map (html), but are not removed by sessionStorage
        // as cancel is cancel all
        // we reinitialize the layer to 0 featureGroups

        // let newFeatureGroup = cloneDeep(featureGroup);
        // e.layers.eachLayer((l) => {
        //     const id = L.stamp(l);
        //     // remove modified feature by id
        //     newFeatureGroup.features = newFeatureGroup.features.filter((f) => {
        //         return f.properties.id !== id;
        //     });
        // });
        console.log("on deleted");
        setFeatureGroup(initialFeatureGroup);
    };

    const onCreated = (e) => {
        setMapState({ id: POLYGON_CREATED, e: e });
    };

    // update filter
    useEffect(() => {
        console.log("UPDATE filters");
        if (mapState) {
            if (mapState.id === POLYGON_CREATED) {
                onFilterCreated(mapState.e);
            }
            if (mapState.id === SHAPE_DELETED) {
                console.log("Deleted");
                onDeleted();
            }
        }
    }, [mapState]);
    // update UI
    useLayoutEffect(() => {
        if (mapState) {
            if (mapState.id === POLYGON_CREATED) {
                setMapUI(startDrawFlag);
            }
        }
    }, [mapState]);

    // https://github.com/simonepri/geojson-geometries-lookup#geojsongeometrieslookuphascontainersgeometry-options--boolean

    return (
        <div>
            <Map
                zoomControl={false}
                center={center}
                zoom={ZOOM_LEVEL}
                maxZoom={MAX_ZOOM}
                ref={mapRef}
                attributionControl={false}
                id="leaflet-map"
                style={{
                    //                 position: fixed;
                    // top: 0;
                    // left: 0;
                    // left: 0;
                    // h: 1000px;
                    /* height: 600px; */
                    /* margin-top: -300px; */
                    // margin-left: -450px;
                    position: "fixed",
                    top: 0,
                    left: 0,
                    border: "2px solid rgb(54, 48, 74)",
                    borderRadius: 4,
                    zIndex: 4,
                    // zIndex: 1,
                }}
            >
                <FeatureGroup>
                    <EditControl
                        ref={editRef}
                        position="topright"
                        onCreated={onCreated}
                        onEdited={onEdited}
                        onDeleted={onDeleted}
                        draw={{
                            rectangle: false,
                            polyline: false,
                            circlemarker: false,
                            marker: false,
                            circle: true,
                            polygon: true,
                        }}
                    />
                    <GeoJSON data={featureGroup} />
                </FeatureGroup>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                {/* <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> */}
            </Map>
            <div
                className="map-button close-button"
                onClick={closeFilterMenuItem}
            >
                X
            </div>
            <div className="button-container">
                <div
                    className="map-button edit-button"
                    onClick={() => {
                        if (mapUIState === startDrawFlag) {
                            editRef.current.leafletElement._toolbars.draw._modes.polygon.handler.enable();
                            setMapUI(stopDrawFlag);
                        }
                        if (mapUIState === stopDrawFlag) {
                            editRef.current.leafletElement._toolbars.draw._modes.polygon.handler.completeShape();
                            editRef.current.leafletElement._toolbars.draw._modes.polygon.handler.disable();
                            setMapUI(startDrawFlag);
                        }
                    }}
                >
                    {mapUIState}
                </div>
                {featureGroup.features.length > 0 && (
                    <div
                        className="map-button delete-button"
                        onClick={() => {
                            console.log(
                                editRef.current.leafletElement._toolbars.edit
                                    ._modes.remove.handler
                            );
                            // startDelete
                            editRef.current.leafletElement._toolbars.edit._modes.remove.handler.enable();
                            // saveDelete
                            editRef.current.leafletElement._toolbars.edit._modes.remove.handler.removeAllLayers();
                            editRef.current.leafletElement._toolbars.edit._modes.remove.handler.disable();
                            setMapState({ id: SHAPE_DELETED, e: null });
                        }}
                    >
                        Clear Map
                    </div>
                )}
            </div>
        </div>
    );
}

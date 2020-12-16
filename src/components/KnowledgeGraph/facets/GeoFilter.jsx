import React, { useState, useRef } from "react";

import { Map, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

GeoFilter.defaultProps = {
    options: {
        key: "geo",
    },
};

export default function GeoFilter({
    options = {
        key: "geo",
    },
}) {
    const mapRef = useRef();

    const ZOOM_LEVEL = 12;
    const [center, setCenter] = useState({ lat: 24.2, lng: 54.37 });

    const onCreated = (e) => {
        console.log(e);
    };

    const onEdited = (e) => {
        console.log(e);
    };

    const onDeleted = (e) => {
        console.log(e);
    };

    return (
        <Map
            center={center}
            zoom={ZOOM_LEVEL}
            mapRef={mapRef}
            attributionControl={false}
        >
            <FeatureGroup>
                <EditControl
                    position="topright"
                    onCreated={onCreated}
                    onEdited={onEdited}
                    onDeleted={onDeleted}
                    draw={{
                        rectangle: false,
                        polyline: false,
                        circlemarker: false,
                        marker: false,
                        circle: false,
                    }}
                />
            </FeatureGroup>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </Map>
    );
}

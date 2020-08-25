import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet"

import "leaflet/dist/leaflet.css";
import "./TimeIndexedTypedLocation.css"

export default function TimeIndexedTypedLocation(props)  {
    const data = {
        timeIndexedTypedLocations : [
            {
                startTime : 1987,
                endTime : 2000,
                locationType : "CurrentPhysicalLocation",
                coordinates : {
                    latitude: 41.8933203,
                    longitude: 12.4829321 
                }
            }
        ]
    }
    const position = [data.timeIndexedTypedLocations[0].coordinates.latitude, data.timeIndexedTypedLocations[0].coordinates.longitude]
    const zoom = 13
    return       <div>                    <Map center={position} zoom={zoom}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                          A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                  </Map></div>

}


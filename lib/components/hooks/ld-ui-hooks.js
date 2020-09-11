'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.useMap = useMap;

var _react = require('react');

function useMap(mapRef) {
    (0, _react.useEffect)(function () {
    /** mounts map */
        mapRef.current = L.map('map', {
            center: [0, 0],
            zoom: 1,
            layers: [L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            })],
            zoomControl: false,
            attributionControl: false
        });
        return function cleanup() {
            mapRef.current.remove();
        };
    }, []);
}
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.useMap = useMap;

var _react = require('react');

//'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
//'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
function useMap(mapRef, mapProvider) {
    (0, _react.useEffect)(function () {
    /** mounts map */
        mapRef.current = L.map('map', {
            center: [0, 0],
            zoom: 1,
            layers: [L.tileLayer(mapProvider.url, {
                attribution: mapProvider.attribution
            })],
            zoomControl: false,
            attributionControl: false
        });
        return function cleanup() {
            mapRef.current.remove();
        };
    }, []);
}
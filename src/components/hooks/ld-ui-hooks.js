import { useEffect } from 'react';

/**
 * Display a Leaflet map in react component
 *
 * @param {Object} mapRef
 * @param {Object} mapProvider
 * @param {string} mapProvider.url
 * @param {string} mapProvider.attribution
 */
export function useMap(mapRef, mapProvider) {
    useEffect(() => {
        /** mounts map */
        mapRef.current = L.map('map', {
            center: [0, 0],
            zoom: 1,
            layers: [
                L.tileLayer(mapProvider.url, {
                    attribution: mapProvider.attribution,
                }),
            ],
            zoomControl: false,
            attributionControl: false,
        });

        return function cleanup() {
            mapRef.current.remove();
        };
    }, []);
}

/**
 * Mount a pane to the Leaflet map.
 * You can mount a layer for d3 or other graphic libraries or FeatureGroups.
 *
 * @param {Object} mapRef a ref to a Leaflet map
 * @param {string} paneName a name for the pane
 * @param {number} paneZIndex default 450
 */
export function usePane(mapRef, paneName, paneZIndex = 450) {
    useEffect(() => {
        mapRef.current.createPane(paneName);
        mapRef.current.getPane(paneName).style.zIndex = paneZIndex; // overlay-pane is 400 https://github.com/Leaflet/Leaflet/blob/v1.0.0/dist/leaflet.css#L87

        mapRef.current.getPane(paneName).style.pointerEvents = 'none';
    }, []);
}

import { useEffect } from 'react';

//'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'

//'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

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

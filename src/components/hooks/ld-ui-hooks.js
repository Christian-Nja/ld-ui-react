import { useEffect } from 'react';

export function useMap(mapRef) {
    useEffect(() => {
        /** mounts map */
        mapRef.current = L.map('map', {
            center: [0, 0],
            zoom: 1,
            layers: [
                L.tileLayer(
                    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    {
                        attribution:
                            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    }
                ),
            ],
            zoomControl: false,
            attributionControl: false,
        });
        return function cleanup() {
            mapRef.current.remove();
        };
    }, []);
}

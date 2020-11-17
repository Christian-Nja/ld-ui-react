import { useState, useEffect } from 'react';

import { defineProp } from '../../utilities/generics';

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

/**
 * @description A hook for Graphin visualization library. Returns layout and a function to set layout.
 * @author Christian Colonna
 * @date 10-11-2020
 * @export
 * @param {Object} baseLayout
 * @param {string} [baseLayout.name=force]
 * @param {Object} [baseLayout.options={}]
 * @returns {Object} layoutHandler
 */
export function useLayout(baseLayout) {
    const defaultLayout = defineProp(baseLayout, {
        name: 'force',
        options: {},
    });
    const [layout, setLayout] = useState(defaultLayout);
    return {
        name: layout,
        setLayout: (newLayout) => {
            setLayout({
                ...layout,
                name: newLayout,
            });
        },
    };
}

/**
 * @description A hook for Graphin visualization library. Bind filter function on node doubleclick
 * @author Christian Colonna
 * @date 16-11-2020
 * @export
 * @param {*} graphRef
 * @param {callback} filter (node) => {}
 */
export function useGraphinDoubleClick(graphRef, filter) {
    useEffect(() => {
        const { graph } = graphRef.current;
        const handleNodeDoubleClick = (e) => {
            const node = e.item._cfg;
            filter(node);
        };
        graph.on('node:dblclick', handleNodeDoubleClick);

        // release listener when component unmount
        return () => {
            graph.off('node:dblclick', handleNodeDoubleClick);
        };
    }, []);
}

/**
 * Returns window dimensions, listening to resize event.
 *
 * Example:
 *
 * const Component = () => {
 *     const { height, width } = useWindowDimensions();
 * }
 */
export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

/**
 * Returns an object with browser window dimension
 * @returns {Object} {width, height}
 */
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

import { useState, useEffect } from "react";

import { defineProp } from "../../utilities/generics";

/* LD-UI-REACT
_____________________________________________________________ */

/**
 * @description A function to invert binary state.
 * @example 
 *  const [open, handleOpen] = useBinaryState(false)
 *  const [isLoaded, handleLoaded] = useBinaryState(true) 

 * @author Christian Colonna
 * @date 22-11-2020
 * @export
 * @param {boolean} [open=false]
 * @returns {function} the handler arrow function to change state set it onClick|Hover.. listeners
 */
export function useBinaryState(startOpen = false) {
    const [open, setOpen] = useState(startOpen);

    const handleOpen = () => {
        let newOpen = !open;
        setOpen(newOpen);
    };
    return [open, handleOpen];
}

/**
 * @description An hook for array with binary values
 *              Returns a function to update the state.
 *              Function accept an element as arg, if element is in state
 *              array it removes it else it add it.
 * @author Christian Colonna
 * @date 30-11-2020
 * @export
 * @param {any[]} [initialArg=[]] initial state
 * @returns {(item: any)=>{}} if item is in state array remove it else add it
 */
export function useBinaryArrayState(initialArg = []) {
    const [state, setState] = useState(initialArg);

    const updateState = (index) => {
        state.includes(index)
            ? // index in array then pull out
              setState(
                  state.filter((item) => {
                      return item !== index;
                  })
              )
            : // index not in array then push in
              setState((state) => [...state, index]);
    };
    return [state, updateState];
}

/* LEAFLET
_____________________________________________________________ */

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
        mapRef.current = L.map("map", {
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

        mapRef.current.getPane(paneName).style.pointerEvents = "none";
    }, []);
}

/* GRAPHIN
_____________________________________________________________ */

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
        name: "force",
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
        graph.on("node:dblclick", handleNodeDoubleClick);

        // release listener when component unmount
        return () => {
            graph.off("node:dblclick", handleNodeDoubleClick);
        };
    }, []);
}

/* GENERICS
_____________________________________________________________ */

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

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
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

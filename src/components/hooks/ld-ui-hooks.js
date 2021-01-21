import { useState, useEffect } from "react";

import { defineProp } from "../../utilities/generics";

import { cloneDeep } from "lodash";

/* LD-UI-REACT
_____________________________________________________________ */

// to refactor you need to initialize the state outside o KG and pass the context, setContext from there
export function useHelp(context, setContext, message) {
    console.log(message);
    const setMessage = () => {
        setContext({ ...context, help: message });
    };
    return setMessage;
}

export function useAlert(context, setContext) {
    useEffect(() => {
        if (context.alert) {
            const interval = showAlertBox();
            return () => clearInterval(interval);
        }
    }, [context.alert]);

    const showAlert = (/*message*/) => {
        setContext({
            ...context,
            alert: {
                switch: context.alert ? !context.alert.switch : true,
                // message: message,
            },
        });
    };
    return showAlert;
}

export function showAlertBox(hideTime = 1500) {
    document.getElementById("alert-box").classList.add("show-alert");
    const interval = setInterval(() => {
        document.getElementById("alert-box").classList.remove("show-alert");
    }, hideTime);
    return interval;
}

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
        options: {
            animation: false,
            enableWorker: true,
            defSpringLen: (_edge, source, target) => {
                const nodeSize = 100;
                const Sdegree = source.data.layout?.degree;
                const Tdegree = target.data.layout?.degree;
                const minDegree = Math.min(Sdegree, Tdegree);
                return minDegree < 3 ? nodeSize * 5 : minDegree * nodeSize * 2;
            },
        },
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
export function useGraphinDoubleClick(graphRef, filter, depArray) {
    useEffect(() => {
        if (graphRef.current) {
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
        }
    }, []);
}

export function useGraphinHover(graphRef) {
    useEffect(() => {
        const { graph } = graphRef.current;

        const clearAllStats = () => {
            graph.setAutoPaint(false);
            graph.getNodes().forEach(function (node) {
                graph.clearItemStates(node);
            });
            graph.getEdges().forEach(function (edge) {
                graph.clearItemStates(edge);
            });
            graph.paint();
            graph.setAutoPaint(true);
        };
        const onMouseEnter = (e) => {
            const item = e.item;
            graph.setAutoPaint(false);
            graph.getNodes().forEach(function (node) {
                graph.clearItemStates(node);
                graph.setItemState(node, "highlight.dark", true);
            });
            graph.setItemState(item, "highlight.dark", false);
            graph.setItemState(item, "highlight.light", true);
            graph.getEdges().forEach(function (edge) {
                if (edge.getSource() === item) {
                    graph.setItemState(
                        edge.getTarget(),
                        "highlight.dark",
                        false
                    );
                    graph.setItemState(
                        edge.getTarget(),
                        "highlight.light",
                        true
                    );
                    graph.setItemState(edge, "highlight.light", true);
                    edge.toFront();
                } else if (edge.getTarget() === item) {
                    graph.setItemState(
                        edge.getSource(),
                        "highlight.dark",
                        false
                    );
                    graph.setItemState(
                        edge.getSource(),
                        "highlight.light",
                        true
                    );
                    graph.setItemState(edge, "highlight.light", true);
                    edge.toFront();
                } else {
                    graph.setItemState(edge, "highlight.light", false);
                }
            });
            graph.paint();
            graph.setAutoPaint(true);
        };
        graph.on("node:mouseenter", onMouseEnter);
        graph.on("node:mouseleave", clearAllStats);
        graph.on("canvas:click", clearAllStats);

        return () => {
            graph.off("node:mouseenter", onMouseEnter);
            graph.on("node:mouseleave", clearAllStats);
            graph.on("canvas:click", clearAllStats);
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

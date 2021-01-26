import React, { useState, useRef, useEffect } from "react";

import PatternMenu from "./PatternMenu";
import List from "./List";
import HelpBox from "./HelpBox";
import AlertBox from "./AlertBox";
import { Context } from "./Context";

// Graphin Components
import Graphin from "@antv/graphin";
import "@antv/graphin/dist/index.css"; // Don't forget to import css
import "./KG.css";

// a defined hook for graphin layout
import { useLayout, useGraphinDoubleClick } from "../hooks/ld-ui-hooks";

// import { Map } from "immutable";

import MatomoTracker from "@datapunt/matomo-tracker-js";

export default function KG({
    data = {
        graph: { nodes: [], edges: [] },
        list: [],
        nodes: [],
    },
    children,
    onContextChange = (context) => {},
    onNodeDoubleClick = (node) => {},
    onItemClick = (node) => {},
    textOnNodeHover = (model) => {
        return ``;
    },
    itemTooltip = null,
    defaultConfig,
    listTitle,
    defaultLayoutOptions = {
        menu: true,
        help: true,
        tableLayout: false,
        graphLayout: true,
        currentLayout: "graph",
    },
}) {
    if (data.graph.nodes) {
        const tracker = new MatomoTracker({
            urlBase: "http://localhost:10080/",
            siteId: 1,
            // userId: "UID76903202", // optional, default value: `undefined`.
            // trackerUrl: "https://LINK.TO.DOMAIN/tracking.php", // optional, default value: `${urlBase}matomo.php`
            // srcUrl: "https://LINK.TO.DOMAIN/tracking.js", // optional, default value: `${urlBase}matomo.js`
            disabled: false, // optional, false by default. Makes all tracking calls no-ops if set to true.
            heartBeat: {
                // optional, enabled by default
                active: true, // optional, default value: true
                seconds: 10, // optional, default value: `15
            },
            linkTracking: false, // optional, default value: true
            // configurations: {
            //     // optional, default value: {}
            //     // any valid matomo configuration, all below are optional
            //     disableCookies: true,
            //     setSecureCookie: true,
            //     setRequestMethod: "POST",
            // },
        });

        tracker.trackPageView();

        // pass this to PatternMenu component to have a panel to switch layouts
        const layoutHandler = useLayout();
        const [layoutOptions, setLayoutOptions] = useState(
            defaultLayoutOptions
        );

        // matomo tracking
        // *****<=========>
        // const { enableLinkTracking } = useMatomo();
        // enableLinkTracking();

        useEffect(() => {
            let graphContainer = document.getElementById("graphin-container");
            if (layoutOptions.currentLayout === "graph") {
                graphContainer.style.display = "";
                // listContainer.style.display = "none"
            } else {
                let listContainer = document.getElementById("list-container");
                graphContainer.style.display = "none";
                listContainer.style.display = "";
            }
        }, [layoutOptions]);

        // graphRef for mix React virtual DOM and graphin imperative operation on DOM
        const graphRef = useRef(null);

        // set default mask TODO: change this from global config to have a persistent state on browser ecc.
        let defaultFiltering = [];
        let filterConfig = {};
        const defaultFilterConfig = defaultConfig
            ? defaultConfig.filterConfig
            : {};
        const defaultRemovedNodes = defaultConfig
            ? defaultConfig.removedNodes
            : null;
        React.Children.toArray(children).forEach((child) => {
            filterConfig[child.props.id] = {
                state: defaultFilterConfig[child.props.id]
                    ? defaultFilterConfig[child.props.id].state
                    : false,
                options: defaultFilterConfig[child.props.id]
                    ? defaultFilterConfig[child.props.id].options
                    : child.props.options,
            };
            defaultFiltering.push([child.props.id, true]);
        });

        // every node has a map by filters: <node_id_5> : [ <time> : True , <searchbar> : False , ... ]
        let removedNodes = [];
        data.graph.nodes.forEach((node) => {
            removedNodes.push([node.id, new Map(defaultFiltering)]);
        });

        const initialState = {
            nodes: data.nodes,
            removedNodes: defaultRemovedNodes || new Map(removedNodes),
            filterConfig: filterConfig,
        };
        const [context, setContext] = useState(initialState); // todo setContext as useReducer with setRemovedNodes actions, setConfigurations ...

        useEffect(() => {
            onContextChange(context);
        }, [context]);

        useGraphinDoubleClick(graphRef, onNodeDoubleClick);

        // duplicate logic, we need to abstract some Data or Dataset interface
        // this interface can be represented as Graph or List, filtering should
        // act only one
        // Consider using Graphology lib to represent Data or Dataset
        // or better the representation best for performance (hashmap?)
        const filteredList = data.list.filter((node) => {
            let filterValues = context.removedNodes.get(node.id);
            if (
                Array.from(filterValues.values()).every((v) => {
                    return v;
                })
            ) {
                return node;
            }
        });

        console.log("GRAPH");
        console.log(data.graph.toVisual(context.removedNodes));

        return (
            // <MatomoProvider value={instance}>
            <Context.Provider value={[context, setContext]}>
                <div style={graphContainerStyle}>
                    <AlertBox />
                    {layoutOptions.help ? <HelpBox /> : null}
                    {layoutOptions.menu ? (
                        <PatternMenu
                            layoutHandler={layoutHandler}
                            layoutOptions={layoutOptions}
                            setLayoutOptions={setLayoutOptions}
                        >
                            {children}
                        </PatternMenu>
                    ) : null}
                    <Graphin
                        data={data.graph.toVisual(context.removedNodes)}
                        ref={graphRef}
                        layout={layoutHandler.name}
                        extend={{
                            nodeShape: () => {
                                return [
                                    {
                                        name: "CustomNode",
                                        render: renderCustomNodeShape,
                                    },
                                ];
                            },
                        }}
                        options={{
                            //keyShapeZoom: 0.001,
                            zoom: 0.7,
                            fitView: true,
                            fitViewPadding: [300, 300, 300, 200],
                            modes: {
                                default: [
                                    {
                                        type: "tooltip",
                                        formatText(model) {
                                            // const text = `occurrences:<br/> ${model.data.occurences}`;
                                            const text = textOnNodeHover(model);
                                            return text;
                                        },
                                    },
                                ],
                            },
                        }}
                    ></Graphin>
                    {layoutOptions.currentLayout === "list" && (
                        <div
                            style={{ ...listContainerStyle }}
                            id="list-container"
                        >
                            <List
                                itemTooltip={itemTooltip}
                                onItemClick={onItemClick}
                                list={filteredList}
                                title={listTitle ? listTitle : "Data"}
                            ></List>
                        </div>
                    )}
                </div>
            </Context.Provider>
            // </MatomoProvider>
        );
    } else return <div></div>;
}

const graphContainerStyle = {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    margin: "auto",
};

const listContainerStyle = {
    marginLeft: "5%",
    marginRight: "2%",
    position: "absolute",
    top: 70,
    width: "90%",
};

const renderCustomNodeShape = (node) => {
    const style = {
        ...node.style,
    };
    const badgeNumber = 0;

    return {
        shape: "CustomNode",
        shapeComponents: [
            {
                shape: "rect",
                attrs: {
                    id: "rect-container",
                    x: 0,
                    y: 0,
                    width: style.containerWidth,
                    height: style.containerWidth,
                    fill: style.containerFill,
                    stroke: style.containerStroke,
                    cursor: "pointer",
                    lineWidth: 2,
                    radius: style.containerWidth / 2,
                },
            },
            // {
            //     shape: "circle",
            //     attrs: {
            //         id: "badge",
            //         x: style.containerWidth,
            //         y: 0,
            //         r: style.badgeSize,
            //         fill: style.badgeFill,
            //         cursor: "pointer",
            //         lineWidth: 1,
            //     },
            // },
            // {
            //     shape: "text",
            //     attrs: {
            //         id: "badge-text",
            //         x: style.containerWidth,
            //         y: -4,
            //         text: badgeNumber,
            //         fontSize: 10,
            //         cursor: "pointer",
            //         fill: "#fff",
            //         textAlign: "center",
            //         textBaseline: "top",
            //     },
            // },
            {
                shape: "text",
                attrs: {
                    id: "text-desc",
                    text: node.data.label,
                    x: style.containerWidth / 2,
                    y: style.containerWidth * 1.1,
                    cursor: "pointer",
                    fontSize: style.fontSize,
                    fill: style.fontColor,
                    fontWeight: "lighter",
                    fontFamily: "Courier New",
                    textAlign: "center",
                    textBaseline: "top",
                },
            },
        ],
        state: {
            selected: {
                "rect-container": {
                    stroke: style.containerStroke,
                    fill: style.containerStroke,
                    animate: {
                        attrs: {
                            lineWidth: 6,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowBlur: 2,
                            shadowColor: "#fff",
                            repeat: false, // 循环
                        },
                        duration: 200,
                        easing: "easeCubic",
                        callback: null,
                        delay: 0,
                    },
                },
                "node-icon": {
                    fill: "#fff",
                },
                badge: {
                    lineWidth: 6,
                },
            },
        },
        // HIGHLITE CHANGE COLOR
        "highlight.dark": {
            "rect-container": {
                fill: style.dark,
                stroke: style.dark,
                lineWidth: 0,
            },
            "node-icon": {
                fill: style.dark,
            },
            "text-desc": {
                fill: "#eee",
            },
            badge: {
                fill: style.dark,
            },
            "badge-text": {
                fill: style.dark,
            },
        },
    };
};

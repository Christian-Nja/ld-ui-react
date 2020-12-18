import React, { useState, useRef, useEffect } from "react";

import PatternMenu from "./PatternMenu";
import List from "./List";
import HelpBox from "./HelpBox";
import { Context } from "./Context";

// Graphin Components
import Graphin from "@antv/graphin";
import "@antv/graphin/dist/index.css"; // Don't forget to import css
import "./KG.css";

// a defined hook for graphin layout
import { useLayout, useGraphinDoubleClick } from "../hooks/ld-ui-hooks";

// import { Map } from "immutable";

export default function KG({
    tableFormatter = (node) => {
        return node;
    },
    children,
    graph,
    onNodeDoubleClick = (node) => {},
    onItemClick = (node) => {},
    textOnNodeHover = (model) => {
        return ``;
    },
    itemTooltip = null,
    defaultLayoutOptions = {
        menu: true,
        help: true,
        tableLayout: false,
        graphLayout: true,
        currentLayout: "graph",
    },
}) {
    if (graph.nodes) {
        // pass this to PatternMenu component to have a panel to switch layouts
        const layoutHandler = useLayout();
        const [layoutOptions, setLayoutOptions] = useState(
            defaultLayoutOptions
        );

        console.log(graph.nodes);

        useEffect(() => {
            let graphContainer = document.getElementById("graphin-container");
            if (layoutOptions.currentLayout === "graph") {
                graphContainer.style.display = "";
            } else {
                graphContainer.style.display = "none";
            }
        }, [layoutOptions]);

        // graphRef for mix React virtual DOM and graphin imperative operation on DOM
        const graphRef = useRef(null);

        // set default mask TODO: change this from global config to have a persistent state on browser ecc.
        let defaultFiltering = [];
        React.Children.toArray(children).map((child) => {
            defaultFiltering.push([child.props.options.key, true]);
        });

        // every node has a map by filters: <node_id_5> : [ <time> : True , <searchbar> : False , ... ]
        let map = [];
        graph.nodes.forEach((node) => {
            map.push([node.id, new Map(defaultFiltering)]);
        });

        const initialState = { removedNodes: new Map(map) };
        const [context, setContext] = useState(initialState); // todo setContext as useReducer with setRemovedNodes actions, setConfigurations ...

        // const [];
        // set graph parameters : event handler, colors, shape

        // on node double click
        useGraphinDoubleClick(graphRef, onNodeDoubleClick);

        return (
            <Context.Provider value={[context, setContext]}>
                <div style={graphContainerStyle}>
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
                        data={graph.toVisual(context.removedNodes)}
                        ref={graphRef}
                        layout={layoutHandler.name}
                        options={{
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
                        <div style={{ ...listContainerStyle }}>
                            <List
                                itemTooltip={itemTooltip}
                                onItemClick={onItemClick}
                                tableFormatter={tableFormatter}
                                graph={graph.toVisual(context.removedNodes)}
                            ></List>
                        </div>
                    )}
                </div>
            </Context.Provider>
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
    marginTop: 40,
    marginLeft: 100,
    width: 900,
};

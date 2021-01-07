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
    defaultLayoutOptions = {
        menu: true,
        help: true,
        tableLayout: false,
        graphLayout: true,
        currentLayout: "graph",
    },
}) {
    if (data.graph.nodes) {
        // pass this to PatternMenu component to have a panel to switch layouts
        const layoutHandler = useLayout();
        const [layoutOptions, setLayoutOptions] = useState(
            defaultLayoutOptions
        );

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

        console.log("initial context");
        console.log(context);

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
                        data={data.graph.toVisual(context.removedNodes)}
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
                                list={filteredList}
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

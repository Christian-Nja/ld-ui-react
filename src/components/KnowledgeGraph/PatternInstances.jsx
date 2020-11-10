import React, { useRef } from "react";

import Graphin from "@antv/graphin";
import Graph from "../classes/Graph";
import PatternMenu from "./PatternMenu";
import { useLayout } from "../hooks/ld-ui-hooks";

import "@antv/graphin/dist/index.css";

export default function PatternInstances(props) {
    const graphRef = useRef(null);

    const layoutHandler = useLayout();

    let graph = new Graph();

    graph.addNodes(
        props.instances.map((instance) => {
            return {
                id: instance.instance,
            };
        })
    );

    const filter = (node, id) => {
        node.style.primaryColor = graph.nodeGradient()[id];
        console.log("node size");
        console.log(node.syle.nodeSize);
        console.log("new size");
        console.log(graph.degree(node) * node.style.nodeSize);
        node.style.nodeSize = graph.degree(node) * node.style.nodeSize;
    };
    graph.breadthFirstSearch(filter);

    return (
        <div style={props.graphContainerStyle}>
            <PatternMenu layoutHandler={layoutHandler} />
            <Graphin
                data={graph.toJson()}
                layout={layoutHandler.name}
                ref={graphRef}
            ></Graphin>
        </div>
    );
}

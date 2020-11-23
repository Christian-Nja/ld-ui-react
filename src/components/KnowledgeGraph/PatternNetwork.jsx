// React
import React, { useRef, useState, useEffect } from "react";

// Class and functions
import { defineProp } from "../../utilities/generics";
import { scale } from "../../utilities/math";
import Graph from "../classes/Graph";

// Components for Patterns
import PatternMenu from "./PatternMenu";
import PatternList from "../classes/PatternList";

// Graphin Components
import Graphin from "@antv/graphin";
import { ContextMenu } from "@antv/graphin-components";
import "@antv/graphin/dist/index.css"; // Don't forget to import css
// a defined hook for graphin layout
import { useLayout, useGraphinDoubleClick } from "../hooks/ld-ui-hooks";

export default function PatternNetwork(props) {
    // parse and initialize props
    const specializations = defineProp(props.patterns.specializations, []);
    const compositions = defineProp(props.patterns.compositions, []);
    const list = defineProp(props.patterns.list, []);

    // graphRef for mix React virtual DOM and graphin imperative operation on DOM
    const graphRef = useRef(null);

    // pass this to PatternMenu component to have a panel to switch layouts
    const layoutHandler = useLayout();

    // an intermidiate class that receives pattern data and creates a graph to be passed to Graphin instance
    let graph = new Graph();
    // list of patterns with occurences for each pattern
    const patternList = new PatternList(list);

    // add specialization relations to graph
    graph.addRelations(specializations, Graph.relType.SUB, "CircleNode", 24);

    // add compositions relations to graph pattern
    graph.addRelations(compositions, Graph.relType.COMPONENT, "CircleNode", 24);

    // this filter is passed to a bfs algorithm to apply colors and size scaling to every node
    // we use bfs to assign similar color to semantically close nodes
    const nodeColorSizeFilter = (node, id) => {
        // set colors according to a gradient
        node.style.primaryColor = graph.nodeGradient()[id];

        // set size as a proportion of occurrences
        const occurences = patternList.getOccurencesByPattern(node.id);

        node.style.nodeSize =
            occurences < 300 ? 12 + occurences : 12 + 300 + occurences * 0.01;
    };

    graph.breadthFirstSearch(nodeColorSizeFilter);

    // on node double click load pattern instances
    useGraphinDoubleClick(graphRef, props.getInstances);

    return (
        <div style={graphContainerStyle}>
            <PatternMenu
                layoutHandler={layoutHandler}
                getInstances={props.getInstances}
            ></PatternMenu>
            <Graphin
                data={graph.toJson()}
                ref={graphRef}
                layout={layoutHandler.name}
            >
                <ContextMenu></ContextMenu>
            </Graphin>
        </div>
    );
}

const graphContainerStyle = {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    margin: "auto",
};

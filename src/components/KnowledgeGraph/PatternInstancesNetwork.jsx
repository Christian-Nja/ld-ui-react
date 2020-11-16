// React
import React, { useRef, useEffect } from "react";

// function and classes
import Graph from "../classes/Graph";
import { defineProp } from "../../utilities/generics";

// Pattern components
import PatternMenu from "./PatternMenu";

// Graphin components
import Graphin from "@antv/graphin";
import { useLayout } from "../hooks/ld-ui-hooks";
import "@antv/graphin/dist/index.css";

export default function PatternInstancesNetwork(props) {
    // graphRef for mix React virtual DOM and graphin imperative operation on DOM
    const graphRef = useRef(null);

    // parse instances
    const instances = defineProp(props.patterns.instances, []);

    // pass this to Layout component to have a panel to switch layouts
    const layoutHandler = useLayout();

    // an intermidiate class that receives pattern data and creates a graph to be passed to Graphin instance
    let graph = new Graph();

    // add instances to Graph
    graph.addNodes(
        instances.map((instance) => {
            return {
                id: instance.instance,
            };
        })
    );

    // TODO: set a color for each instance, set size based on node degree
    const filter = (node, id) => {
        node.style.primaryColor = graph.nodeGradient()[id];
        node.style.nodeSize = graph.degree(node) * node.style.nodeSize;
    };
    graph.breadthFirstSearch(filter);

    // effect to handle useGraphDoubleClick
    useEffect(() => {
        const { graph } = graphRef.current;
        // on double click trigger getInstances
        graph.on("node:dblclick", (e) => {
            const nodeId = e.item._cfg.id;
            props.getInstance(nodeId);
        });
        // TODO: return graph.off(...registered events)
    }, []);

    return (
        <div style={graphContainerStyle}>
            <PatternMenu layoutHandler={layoutHandler} />
            <Graphin
                data={graph.toJson()}
                layout={layoutHandler.name}
                ref={graphRef}
            ></Graphin>
        </div>
    );
}

// TODO: pass this to global theme useContext react mechanism
const graphContainerStyle = {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    margin: "auto",
};

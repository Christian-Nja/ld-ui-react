import React, { useRef } from "react";

import Graphin from "@antv/graphin";
import Graph from "../classes/Graph";
import LayoutSelector from "./LayoutSelector";

import "@antv/graphin/dist/index.css";

export default function PatternInstances(props) {
    const graphRef = useRef(null);

    const [layout, setLayout] = React.useState({
        name: "force",
        options: {},
    });

    let graph = new Graph();

    graph.addNodes(
        props.instances.map((instance) => {
            return {
                id: instance.instance,
            };
        })
    );
    return (
        <div style={props.graphContainerStyle}>
            <LayoutSelector
                value={layout.name}
                onClick={(value) => {
                    setLayout({
                        ...layout,
                        name: value,
                    });
                }}
            />
            <Graphin
                data={graph.toJson()}
                layout={layout}
                ref={graphRef}
            ></Graphin>
        </div>
    );
}

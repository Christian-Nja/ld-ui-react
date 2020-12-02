// React
import React, { useRef, useState, useEffect } from "react";

// Class and functions
import { defineProp } from "../../utilities/generics";
import Graph from "../classes/Graph";
import { baseLog } from "../../utilities/math";

// Components for Patterns
import PatternMenu from "./PatternMenu";
import PatternList from "../classes/PatternList";

import PropertyFilter from "./facets/PropertyFilter";
import SliderFilter from "./facets/SliderFilter";

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

    const [graph, setGraph] = useState(new Graph());

    // pass this to PatternMenu component to have a panel to switch layouts
    const layoutHandler = useLayout();

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

        console.log(node.style.primaryColor);

        // set size as a proportion of occurrences
        const occurences = patternList.getOccurencesByPattern(node.id);

        // we add this as we can filter on this with slider filter
        node.data.occurences = occurences;

        if (occurences !== 0) {
            node.style.cursor = "pointer";
        }
        if (occurences === 0) {
            node.style.opacity = 0.3;
        }

        node.style.nodeSize =
            occurences !== 0
                ? 12 +
                  Number.parseInt(occurences * baseLog(2, occurences) * 0.5)
                : 12;
    };

    graph.breadthFirstSearch(nodeColorSizeFilter);

    const properties = graph.nodes.map((node) => {
        const occurences = patternList.getOccurencesByPattern(node.id);
        return {
            title: node.label,
            value: occurences,
            color: node.style.primaryColor,
            uri: node.id,
        };
    });

    const handleTypeFilter = (filterNodes) => {
        graph.addFilter({ key: "id", mask: filterNodes, class: "cat" });
        const newData = new Graph(graph.nodes, graph.edges, graph.filters);
        setGraph(newData);
    };

    // on node double click load pattern instances
    useGraphinDoubleClick(graphRef, props.getInstances);

    // min/max
    let instancesRange = [0, 0];
    let occurencesFrequency = [];
    graph.nodes.forEach((node) => {
        const occur = patternList.getOccurencesByPattern(node.id);
        occurencesFrequency.push(occur);
    });
    occurencesFrequency.sort((a, b) => a - b);
    instancesRange = [
        Math.min(...occurencesFrequency),
        Math.max(...occurencesFrequency),
    ];

    const handleSliderFilter = (range) => {
        graph.addFilter({
            key: "occurences",
            range: range,
            class: "num",
        });
        const newData = new Graph(graph.nodes, graph.edges, graph.filters);
        setGraph(newData);
    };

    return (
        <div style={graphContainerStyle}>
            <PatternMenu
                layoutHandler={layoutHandler}
                getInstances={props.getInstances}
            >
                <PropertyFilter
                    properties={properties}
                    title={"Filter by pattern"}
                    onFilter={(filtered) => {
                        handleTypeFilter(filtered);
                    }}
                />
                <SliderFilter
                    title={"Filter by number of instances"}
                    domain={instancesRange}
                    onFilter={(range) => {
                        handleSliderFilter(range);
                    }}
                />
            </PatternMenu>
            <Graphin
                data={graph.toVisual()}
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

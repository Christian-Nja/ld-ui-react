// React
import React, { useRef, useState, useEffect } from "react";

// Class and functions
import { defineProp } from "../../utilities/generics";
import Graph from "../classes/Graph";

// Components for Patterns
import PatternMenu from "./PatternMenu";
import PatternList from "../classes/PatternList";

import TypeFilter from "./facets/TypeFilter";

// Graphin Components
import Graphin from "@antv/graphin";
import { ContextMenu } from "@antv/graphin-components";
import "@antv/graphin/dist/index.css"; // Don't forget to import css
// a defined hook for graphin layout
import { useLayout, useGraphinDoubleClick } from "../hooks/ld-ui-hooks";

// an intermidiate class that receives pattern data and creates a graph to be passed to Graphin instance
let graph = new Graph();

export default function PatternNetwork(props) {
    // parse and initialize props
    const specializations = defineProp(props.patterns.specializations, []);
    const compositions = defineProp(props.patterns.compositions, []);
    const list = defineProp(props.patterns.list, []);

    // graphRef for mix React virtual DOM and graphin imperative operation on DOM
    const graphRef = useRef(null);

    const [data, setData] = useState(graph);

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

        // set size as a proportion of occurrences
        const occurences = patternList.getOccurencesByPattern(node.id);

        node.style.nodeSize =
            occurences < 300 ? 12 + occurences : 12 + 300 + occurences * 0.01;
    };

    graph.breadthFirstSearch(nodeColorSizeFilter);

    // wtf
    // this cause a good comparison JSON.stringify
    //  https://stackoverflow.com/questions/54095994/react-useeffect-comparing-objects/54096391#54096391
    // add useMemo and all the shit
    useEffect(() => {
        console.log("I reset all after filter");
        setData(graph);
    }, [JSON.stringify(graph.toVisual())]);

    const types = graph.nodes.map((node) => {
        const occurences = patternList.getOccurencesByPattern(node.id);
        return {
            title: node.label,
            value: occurences,
            color: node.style.primaryColor,
            uri: node.id,
        };
    });

    const handleTypeFilter = (filterNodes) => {
        data.addFilter({ key: "type", mask: filterNodes });
        const newData = new Graph(data.nodes, data.edges, data.filters);
        setData(newData);
    };

    // on node double click load pattern instances
    useGraphinDoubleClick(graphRef, props.getInstances);

    // data
    console.log("PNetwork rerender");

    return (
        <div style={graphContainerStyle}>
            <PatternMenu
                layoutHandler={layoutHandler}
                getInstances={props.getInstances}
            >
                <TypeFilter
                    types={types}
                    title={"Filter by type"}
                    onFilter={(filtered) => {
                        handleTypeFilter(filtered);
                    }}
                ></TypeFilter>
            </PatternMenu>
            <Graphin
                data={data.toVisual()}
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

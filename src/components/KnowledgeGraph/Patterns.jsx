import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";

import SelectButton from "./SelectButton";
import PatternMenu from "./PatternMenu";
import Graph from "../classes/Graph";

import Graphin from "@antv/graphin";
import { ContextMenu } from "@antv/graphin-components";

export default function Patterns(props) {
    const graphRef = useRef(null);
    const [selectedNodes, setSelectedNodes] = useState([]);
    const [clicked, setClicked] = useState(null);

    let graph = new Graph();

    graph.addRelations(
        props.specializations,
        Graph.relType.SUB,
        "CircleNode",
        24
    );
    graph.addRelations(
        props.compositions,
        Graph.relType.COMPONENT,
        "CircleNode",
        24
    );

    useEffect(() => {
        const { graph } = graphRef.current;
        graph.on("node:click", (e) => {
            const nodeId = e.item._cfg.id;
            setClicked(nodeId);
        });
        graph.on("canvas:click", (e) => {
            setClicked(null);
        });
    }, []);

    // options for right-click-on-node menu
    const menuOptions = [
        {
            key: "select",
            title: "",
            visible: true,
            iconType: (
                <SelectButton
                    active={selectedNodes.includes(clicked) ? true : false}
                ></SelectButton>
            ),
            onClick: (e) => {
                // find node selected in the Graphin instance
                const nodes = e.graph.findAllByState("node", "selected");
                const nodeId = nodes.map((node) => node.get("id"))[0];
                // add the node to this selection
                if (nodeId.length === 0) {
                    console.log(`Node not found`);
                } else {
                    selectedNodes.includes(nodeId)
                        ? setSelectedNodes((selectedNodes) => {
                              selectedNodes.splice(
                                  selectedNodes.indexOf(nodeId),
                                  1
                              );
                              setSelectedNodes((selectedNodes) => [
                                  ...selectedNodes,
                              ]);
                          })
                        : setSelectedNodes((selectedNodes) => [
                              ...selectedNodes,
                              nodeId,
                          ]);
                }
            },
        },
    ];

    return (
        <div style={props.graphContainerStyle}>
            <PatternMenu
                selectedNodes={selectedNodes}
                getInstances={props.getInstances}
            ></PatternMenu>
            <Graphin data={graph.toJson()} ref={graphRef}>
                <ContextMenu options={menuOptions}></ContextMenu>
            </Graphin>
        </div>
    );
}

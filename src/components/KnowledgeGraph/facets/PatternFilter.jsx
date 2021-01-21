import React, { useEffect, useState, useContext, useRef } from "react";

import { PieChart } from "react-minimal-pie-chart";
import { useBinaryArrayState } from "../../hooks/ld-ui-hooks";
import { Context } from "../Context";

import { cloneDeep } from "lodash";

PatternFilter.defaultProps = {
    id: "pie",
    options: {},
};

/**
 * @description Filter data
 * @author Christian Colonna
 * @date 29-11-2020
 * @export
 * @param {[{ label : string, count : number, color : string, id : string
 * }]} {Object[]} { properties } label: Property label, count: number of instances, color: color
 * @param {function} onFilter callback is called every time change filtered array,
 *                            it receives as argument the array of element filtered out.
 *                            Array contains index of the element as it passed as input to the filter.
 * @returns {JSX.Element}
 */
export default function PatternFilter({
    onFilter = (filtered) => {},
    id = "pie",
    options = {},
}) {
    // listen to local central state
    const [context, setContext] = useContext(Context);

    const [hovered, setHovered] = useState(null);
    const [filtered, setFiltered] = useBinaryArrayState(
        context.filterConfig[id].options.filtered || []
    );

    const properties = context.nodes;
    const active = context.filterConfig[id].state;

    console.log("PATTERN FILTER MOUNTED");

    // run this effect only on component update
    const isMounted = useRef(false);
    useEffect(() => {
        if (isMounted.current) {
            let newRemovedNodes = cloneDeep(context.removedNodes);
            let newFilterConfig = cloneDeep(context.filterConfig);
            if (active) {
                // if filter active it works

                properties.forEach((node) => {
                    let nodeState = newRemovedNodes.get(node.id);
                    // remove every node with 0 occurences
                    if (node.value === 0) {
                        nodeState.set(id, false);
                    } else {
                        // remove node filtered out by the user
                        if (filtered.includes(node.id)) {
                            nodeState.set(id, false);
                        } else {
                            nodeState.set(id, true);
                        }
                    }
                });
            } else {
                // filter inactive every node should be set to true for this filter
                properties.forEach((node) => {
                    let nodeState = newRemovedNodes.get(node.id);
                    nodeState.set(id, true);
                });
            }
            newFilterConfig[id].options.filtered = filtered;
            setContext({
                ...context,
                removedNodes: newRemovedNodes,
                filterConfig: newFilterConfig,
            });
        } else {
            isMounted.current = true;
        }
    }, [filtered, active]);

    const data = properties.map((entry) => {
        return {
            ...entry,
            color: filtered.includes(entry.id) ? "grey" : entry.color,
        };
    });

    return (
        <PieChart
            lengthAngle={-360}
            animate
            paddingAngle={1}
            data={data}
            label={() => {
                return data[hovered] ? data[hovered].value : null;
            }}
            segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
            labelStyle={{
                fontSize: "20px",
                fontFamily: "sans-serif",
                fill: data[hovered] ? data[hovered].color : null,
            }}
            onMouseOver={(_, index) => {
                setHovered(index);
            }}
            onMouseOut={() => {
                setHovered(null);
            }}
            onClick={(_, index) => {
                setFiltered(data[index].id);
            }}
            lineWidth={30}
            labelPosition={0}
        />
    );
}

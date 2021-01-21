import React, { useEffect, useState, useContext, useRef } from "react";

import { PieChart } from "react-minimal-pie-chart";
import { useBinaryArrayState } from "../../hooks/ld-ui-hooks";
import { Context } from "../Context";

import { cloneDeep } from "lodash";

import ColorGenerator from "../../classes/ColorGenerator";
import { useAlert } from "../../hooks/ld-ui-hooks";

PropertyFilter.defaultProps = {
    id: "pie",
    options: {},
    property: "id",
};

/**
 * @description Filter data
 * @author Christian Colonna
 * @date 29-11-2020
 * @export
 * @param {[{ label : string, count : number, color : string, id : string
 * }]} {Object[]} { nodes } label: Property label, count: number of instances, color: color
 * @param {function} onFilter callback is called every time change filtered array,
 *                            it receives as argument the array of element filtered out.
 *                            Array contains index of the element as it passed as input to the filter.
 * @returns {JSX.Element}
 */
export default function PropertyFilter({
    onFilter = (filtered) => {},
    id = "pie",
    options = {},
    property = "id",
}) {
    // listen to local central state
    const [context, setContext] = useContext(Context);
    const showAlert = useAlert(context, setContext);

    const [hovered, setHovered] = useState(null);
    const [filtered, setFiltered] = useBinaryArrayState(
        context.filterConfig[id].options.filtered || []
    );

    const nodes = context.nodes;
    const active = context.filterConfig[id].state;

    // run this effect only on component update
    const isMounted = useRef(false);
    useEffect(() => {
        if (isMounted.current) {
            let newRemovedNodes = cloneDeep(context.removedNodes);
            let newFilterConfig = cloneDeep(context.filterConfig);
            if (active) {
                // if filter active it works
                nodes.forEach((node) => {
                    let nodeState = newRemovedNodes.get(node.id);
                    // remove every node without the property
                    if (!node[property]) {
                        nodeState.set(id, false);
                    } else {
                        // remove node filtered out by the user
                        if (filtered.includes(node[property])) {
                            nodeState.set(id, false);
                        } else {
                            nodeState.set(id, true);
                        }
                    }
                });
            } else {
                // filter inactive every node should be set to true for this filter
                nodes.forEach((node) => {
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

    useEffect(() => {
        // launch message just if filter is active
        if (active) {
            showAlert();
        }
    }, [context.removedNodes]);

    let values = {};

    nodes.forEach((node) => {
        if (!values[node[property]]) {
            values[node[property]] = {
                id: node.id,
                color: node.color,
                value: 1,
            };
        } else {
            values[node[property]].value++;
        }
    });
    const colors = new ColorGenerator({
        colorCount: Object.keys(values).length,
    });

    const rndColors = colors.getColor();
    const data = Object.keys(values).map((k) => {
        let c = rndColors.next();
        return {
            id: values[k].id,
            title: k,
            value: values[k].value,
            color: filtered.includes(k) ? "grey" : c.value,
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
                setFiltered(data[index].title);
            }}
            lineWidth={30}
            labelPosition={0}
        />
    );
}

import React, { useEffect, useState, useContext } from "react";

import { PieChart } from "react-minimal-pie-chart";
import { useBinaryArrayState } from "../../hooks/ld-ui-hooks";
import { Context } from "../Context";

import { cloneDeep } from "lodash";

PropertyFilter.defaultProps = {
    options: {
        key: "pie",
    },
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
export default function PropertyFilter({
    properties,
    onFilter = (filtered) => {},
    options = {
        key: "pie",
    },
}) {
    // listen to local central state
    const [context, setContext] = useContext(Context);

    const [hovered, setHovered] = useState(null);
    const [filtered, setFiltered] = useBinaryArrayState([]);

    useEffect(() => {
        let newRemovedNodes = cloneDeep(context.removedNodes);
        properties.forEach((node) => {
            let nodeState = newRemovedNodes.get(node.id);
            if (filtered.includes(node.id)) {
                nodeState.set(options.key, false);
            } else {
                nodeState.set(options.key, true);
            }
        });
        setContext({ ...context, removedNodes: newRemovedNodes });
    }, [filtered]);

    console.log("global state");
    console.log(context);

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

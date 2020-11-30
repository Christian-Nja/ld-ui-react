import React, { useEffect, useState } from "react";

import { PieChart } from "react-minimal-pie-chart";
import { useBinaryArrayState } from "../../hooks/ld-ui-hooks";

/**
 * @description Filter data
 * @author Christian Colonna
 * @date 29-11-2020
 * @export
 * @param {[{ type : string, count : number, color : string, uri : string
 * }]} {Object[]} { types } type: Resource type, count: number of instances, color: color
 * @param {function} onFilter callback is called every time change filtered array,
 *                            it receives as argument the array of element filtered out.
 *                            Array contains index of the element as it passed as input to the filter.
 * @returns {JSX.Element}
 */
export default function TypeFilter({ types, onFilter = (filtered) => {} }) {
    const [hovered, setHovered] = useState(null);
    const [filtered, setFiltered] = useBinaryArrayState([]);

    useEffect(() => {
        onFilter(
            filtered.map((uri) => {
                return { id: uri };
            })
        );
    }, [filtered]);

    const data = types.map((entry) => {
        return {
            ...entry,
            color: filtered.includes(entry.uri) ? "grey" : entry.color,
        };
    });

    console.log("i rerender");

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
                setFiltered(data[index].uri);
            }}
            lineWidth={30}
            labelPosition={0}
        />
    );
}

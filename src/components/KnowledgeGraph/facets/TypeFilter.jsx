import React, { useEffect, useState } from "react";

import { PieChart } from "react-minimal-pie-chart";

/**
 * @description Filter data
 * @author Christian Colonna
 * @date 29-11-2020
 * @export
 * @param {[{ type : string, count : number, color : string
 * }]} {Object[]} { types } type: Resource type, count: number of instances, color: color
 * @param {function} onFilter callback is called every time change filtered array,
 *                            it receives as argument the array of element filtered out.
 *                            Array contains index of the element as it passed as input to the filter.
 * @returns {JSX.Element}
 */
export default function TypeFilter({ types, onFilter = (filtered) => {} }) {
    const [hovered, setHovered] = useState(null);
    const [filtered, setFiltered] = useState([]);

    const updateState = (index) => {
        filtered.includes(index)
            ? // index in array then pull out
              setFiltered(
                  filtered.filter((item) => {
                      return item !== index;
                  })
              )
            : // index not in filtered then push in
              setFiltered((filtered) => [...filtered, index]);
    };

    useEffect(() => {
        onFilter(filtered);
    }, [filtered]);

    const data = types.map((entry, index) => {
        return {
            ...entry,
            color: filtered.includes(index) ? "grey" : entry.color,
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
                updateState(index);
            }}
            lineWidth={30}
            labelPosition={0}
        />
    );
}

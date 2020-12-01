import React, { useEffect, useState } from "react";

import { PieChart } from "react-minimal-pie-chart";
import { useBinaryArrayState } from "../../hooks/ld-ui-hooks";

/**
 * @description Filter data
 * @author Christian Colonna
 * @date 29-11-2020
 * @export
 * @param {[{ label : string, count : number, color : string, uri : string
 * }]} {Object[]} { properties } label: Property label, count: number of instances, color: color
 * @param {function} onFilter callback is called every time change filtered array,
 *                            it receives as argument the array of element filtered out.
 *                            Array contains index of the element as it passed as input to the filter.
 * @returns {JSX.Element}
 */
export default function PropertyFilter({
    properties,
    onFilter = (filtered) => {},
}) {
    const [hovered, setHovered] = useState(null);
    const [filtered, setFiltered] = useBinaryArrayState([]);

    useEffect(() => {
        console.log(filtered);
        onFilter(filtered);
    }, [filtered]);

    const data = properties.map((entry) => {
        return {
            ...entry,
            color: filtered.includes(entry.uri) ? "grey" : entry.color,
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
                setFiltered(data[index].uri);
            }}
            lineWidth={30}
            labelPosition={0}
        />
    );
}

/**
 * node.id  ----> id del pattern  WRONG come dice misael c'è già il node
 *
 * { nodi con varie proprietà
 * }
 *
 * filtro
 * {
 *  proprietà : id
 * }
 *
 *
 * graph.filter(nodi.data)
 *
 * ritorna tutti nodi con la proprietà non selezionata
 *
 */

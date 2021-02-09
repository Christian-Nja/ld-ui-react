import React, { useEffect, useState, useContext, useRef } from "react";

import { PieChart } from "react-minimal-pie-chart";
import { useBinaryArrayState } from "../../hooks/ld-ui-hooks";

import { forEach } from "lodash";
import { useKGCtx } from "../../../knowledgegraph/KGCtx/useKGCtx";
import useFilter from "../../../filters/FilterCtx/useFilter";

PatternFilter.defaultProps = {
    id: "patternPie",
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
export default function PatternFilter({ id = "patternPie" }) {
    const { knowledgeGraph } = useKGCtx();

    const patterns = knowledgeGraph.getPatterns();
    console.log("Filter by Patterns");
    console.log(patterns);

    const filterCallback = (pattern) => {
        if (
            Number.parseInt(pattern.occurences) !== 0 &&
            !filtered.includes(pattern.getUri())
        ) {
            return true;
        }
        return false;
    };

    const initialFilterOptions = {
        active: false,
        filterCallback: filterCallback,
    };

    const { filter, setFilterOptions } = useFilter(id, initialFilterOptions);

    const [filtered, setFiltered] = useBinaryArrayState(
        (filter && filter.getOption("filtered")) || []
    );
    const [hovered, setHovered] = useState(null);

    useEffect(() => {
        if (filter) {
            setFilterOptions({
                ...filter.options,
                filtered: filtered,
                filterCallback: filterCallback,
            });
        }
    }, [filtered]);

    const data = patterns.map((entry) => {
        return {
            ...entry,
            color: filtered.includes(entry.getUri()) ? "grey" : entry.color,
            title: entry.getLabel(),
            value: Number.parseInt(entry.occurences),
            id: entry.getUri(),
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

import React, { useEffect, useState, useContext, useRef } from "react";

import { PieChart } from "react-minimal-pie-chart";
import { useBinaryArrayState } from "../../hooks/ld-ui-hooks";

import { forEach } from "lodash";
import { useKGCtx } from "../../../knowledgegraph/KGCtx/useKGCtx";
import useFilter from "../../../filters/FilterCtx/useFilter";

import { FilterPatternByViewStrategy } from "../../../filters/filter-algorithms/FilterPatternByViewStrategy";
import Filter from "../../../filters/Filter";

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

    const [filtered, setFiltered] = useBinaryArrayState(
        (filter && filter.getOption("filtered")) || []
    );
    const [hovered, setHovered] = useState(null);

    const filterAlgorithm = FilterPatternByViewStrategy.create({ filtered });

    const initialFilterOptions = {
        active: false,
        filterCallback: filterAlgorithm,
    };

    const { filter, setFilterOptions } = useFilter(id, initialFilterOptions);

    useEffect(() => {
        if (filter) {
            setFilterOptions({
                ...filter.options,
                filterCallback: filterAlgorithm,
            });
        }
    }, [filtered]);

    const data = patterns.map((entry) => {
        return {
            ...entry,
            color: filtered.includes(entry.getUri()) ? "grey" : entry.nodeColor,
            title: entry.getLabel(),
            value: Number.parseInt(entry.occurences),
            id: entry.getUri(),
        };
    });

    return (
        <div>
            <div class="pie-chart-title">
                {data[hovered] ? data[hovered].title : null}
            </div>
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
                    fill: data[hovered] ? data[hovered].nodeColor : null,
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
        </div>
    );
}

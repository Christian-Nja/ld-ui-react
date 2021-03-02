import React, { useState, useEffect, useMemo } from "react";

import SliderFilter from "./SliderFilter";
import { useKGCtx } from "../../../knowledgegraph/KGCtx/useKGCtx";
import useFilter from "../../../filters/FilterCtx/useFilter";

import { FilterEndTimeStrategy } from "../../../filters/filter-algorithms/FilterEndTimeStrategy";

/**
 * node {
 *     id: uri
 *     startTime: startTime
 *     endTime: endTime
 * }
 */

TimeIntervalFilter.defaultProps = {
    id: "time",
    options: {},
};

export default function TimeIntervalFilter({ id = "time", options = {} }) {
    const { knowledgeGraph } = useKGCtx();

    // read nodes from global context
    const resources = knowledgeGraph.getResources();

    const initialFilterOptions = {
        active: true,
        filterCallback: filterAlgorithm,
    };
    const { filter, setFilterOptions } = useFilter(id, initialFilterOptions);

    // if domain not in options compute it
    const initialRange = useMemo(() => findTimeDomain(resources), [resources]);

    const [range, setRange] = useState(
        [filter && filter.getOption("endTime")] || [initialRange[1]]
    );

    const filterAlgorithm = FilterEndTimeStrategy.create({ endTime: range[0] });

    useEffect(() => {
        if (filter) {
            setFilterOptions({
                ...filter.options,
                filterCallback: filterAlgorithm,
            });
        }
    }, [range]);

    return (
        <SliderFilter
            range={range}
            setRange={setRange}
            domain={initialRange}
            reversed={true}
        />
    );
}

function findTimeDomain(arr) {
    let min, max;
    for (let i = 1, len = arr.length; i < len; i++) {
        if (arr[i].startTime) {
            let s = Number.parseInt(arr[i].startTime);
            if (min === undefined) min = s;
            else min = s < min ? s : min;
        }
        if (arr[i].endTime) {
            let e = Number.parseInt(arr[i].endTime);
            if (max === undefined) max = e;
            else max = e > max ? e : max;
        }
    }
    return [min, max];
}

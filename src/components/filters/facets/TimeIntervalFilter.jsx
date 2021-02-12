import React, { useState, useEffect, useMemo, useRef } from "react";

import SliderFilter from "./SliderFilter";
import { useKGCtx } from "../../../knowledgegraph/KGCtx/useKGCtx";
import useFilter from "../../../filters/FilterCtx/useFilter";

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

    // from the age of time
    const initialTime = -100000;
    const now = new Date();
    const currentTime = now.getFullYear();

    // if domain not in options compute it
    const initialRange = useMemo(() => findTimeDomain(resources), [resources]);

    const defaultRange = [initialRange[1], initialRange[1]];

    const filterCallback = (resource) => {
        if (!resource.startTime && !resource.endTime) {
            return false;
        } else if (!resource.startTime) {
            if (range[0] >= initialTime && range[1] <= resource.endTime) {
                // node inside time interval set true
                return true;
            } else {
                // node not in range set false
                return false;
            }
        } else if (!resource.endTime) {
            // Handle nodes with missing endTime
            // we consider as if it is today
            //
            // get node in map
            if (range[0] >= resource.startTime && range[1] <= currentTime) {
                // node inside time interval set true
                return true;
            } else {
                // node not in range set false
                return false;
            }
        } else {
            // Handle nodes with startTime and endTime defined
            if (
                range[0] >= resource.startTime &&
                range[1] <= resource.endTime
            ) {
                // node inside time interval set true
                return true;
            } else {
                // node not in range set false
                return false;
            }
        }
    };
    const initialFilterOptions = {
        active: false,
        filterCallback: filterCallback,
        isMounted: true,
    };
    const { filter, setFilterOptions } = useFilter(id, initialFilterOptions);

    const [range, setRange] = useState(
        (filter && filter.getOption("range")) || defaultRange || initialRange
    );

    useEffect(() => {
        if (filter) {
            setFilterOptions({
                ...filter.options,
                range: range,
                filterCallback: filterCallback,
            });
        }
    }, [range]);

    return (
        <SliderFilter range={range} setRange={setRange} domain={initialRange} />
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

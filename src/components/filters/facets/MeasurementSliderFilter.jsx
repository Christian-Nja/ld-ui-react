import React, { useState, useEffect } from "react";

import { useKGCtx } from "../../../knowledgegraph/KGCtx/useKGCtx";
import useFilter from "../../../filters/FilterCtx/useFilter";
import SliderFilter from "./SliderFilter";

import findSliderDomain from "./findSliderDomain";

import { find } from "lodash";

import Qty from "js-quantities";
const MIN = 0;
const MAX = 1;

export default function MeasurementSliderFilter({
    id = "slider",
    options = {},
    measurementType,
}) {
    const formatTicks = (d) => {
        return Qty(`${d} ${measurementUnit}`).format("m");
    };

    const { knowledgeGraph } = useKGCtx();

    const resources = knowledgeGraph.getResources();

    const measurementUnitKey = `${measurementType}MeasurementUnit`;
    const measurementUnit = find(resources, (r) => {
        return r[measurementUnitKey];
    })[measurementUnitKey];

    const filterCallback = (pattern) => {
        if (
            pattern[measurementType] >= range[MIN] &&
            pattern[measurementType] <= range[MAX]
        ) {
            return true;
        } else {
            return false;
        }
    };
    const initialFilterOptions = {
        active: false,
        filterCallback: filterCallback,
    };
    const { filter, setFilterOptions } = useFilter(id, initialFilterOptions);

    const initialRange = findSliderDomain(resources, measurementType);

    const [range, setRange] = useState(
        (filter && filter.getOption("range")) || initialRange
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

    if (resources.length < 2) {
        return null;
    }

    return (
        <SliderFilter
            range={range}
            setRange={setRange}
            domain={initialRange}
            formatTicks={formatTicks}
        />
    );
}

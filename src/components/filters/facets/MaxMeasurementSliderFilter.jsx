import React, { useState, useEffect } from "react";

import { useKGCtx } from "../../../knowledgegraph/KGCtx/useKGCtx";
import useFilter from "../../../filters/FilterCtx/useFilter";
import SliderFilter from "./SliderFilter";

import findSliderDomain from "./findSliderDomain";

import { find } from "lodash";

import Qty from "js-quantities";
import { FilterMaxValueStrategy } from "../../../filters/filter-algorithms/FilterMaxValueStrategy";
const MIN = 0;
const MAX = 1;

export default function MaxMeasurementSliderFilter({
    id = "maxMeasurement",
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

    const initialFilterOptions = {
        active: true,
        filterCallback: filterAlgorithm,
    };

    const { filter, setFilterOptions } = useFilter(id, initialFilterOptions);

    const initialRange = findSliderDomain(resources, measurementType);

    const [range, setRange] = useState(
        [filter && filter.getOption("maxValue")] || initialRange[0]
    );
    const filterAlgorithm = FilterMaxValueStrategy.create({
        maxValue: range[0],
        resourceProperty: measurementType,
    });

    useEffect(() => {
        if (filter) {
            setFilterOptions({
                ...filter.options,
                filterCallback: filterAlgorithm,
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
            reversed={true}
        />
    );
}

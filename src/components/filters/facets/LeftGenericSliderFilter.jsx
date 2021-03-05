import React, { useState, useEffect, useMemo } from "react";
import useFilter from "../../../filters/FilterCtx/useFilter";
import SliderFilter from "./SliderFilter";

import findSliderDomain from "./findSliderDomain";
import { FilterMinValueStrategy } from "../../../filters/filter-algorithms/FilterMinValueStrategy";

export default function LeftGenericSliderFilter({
    id = "genericSlider",
    resourceProperty,
    resources = [],
    isActive = true,
    defaultRange,
    resourceTypeFilterHasEffectOn,
    formatTicks = (d) => {
        return d;
    },
}) {
    const initialFilterOptions = {
        active: isActive,
        filterCallback: filterAlgorithm,
    };
    const { filter, setFilterOptions } = useFilter(id, initialFilterOptions);

    const initialRange = findSliderDomain(resources, resourceProperty);
    defaultRange = defaultRange ? defaultRange : [initialRange[0]];
    const [range, setRange] = useState(
        filter && filter.getStrategyOption("minValue")
            ? [filter && filter.getStrategyOption("minValue")]
            : defaultRange
    );

    const filterAlgorithm = FilterMinValueStrategy.create({
        resourceProperty,
        resourceType: resourceTypeFilterHasEffectOn,
        minValue: range[0],
    });

    useEffect(() => {
        if (filter) {
            setFilterOptions({
                ...filter.options,
                filterCallback: filterAlgorithm,
            });
        }
    }, [range]);

    useEffect(() => {
        if (filter && !filter.getOption("filterCallback")) {
            setFilterOptions({
                ...filter.options,
                filterCallback: filterAlgorithm,
            });
        }
    }, [filterAlgorithm]);

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

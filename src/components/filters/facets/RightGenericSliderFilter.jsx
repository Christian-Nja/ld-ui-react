import React, { useState, useEffect, useMemo } from "react";
import useFilter from "../../../filters/FilterCtx/useFilter";
import SliderFilter from "./SliderFilter";

import findSliderDomain from "./findSliderDomain";
import { FilterMaxValueStrategy } from "../../../filters/filter-algorithms/FilterMaxValueStrategy";

export default function RightGenericSliderFilter({
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
    const [range, setRange] = useState(
        [filter && filter.getStrategyOption("maxValue")] ||
            defaultRange || [initialRange[1]]
    );

    const filterAlgorithm = FilterMaxValueStrategy.create({
        resourceProperty,
        resourceType: resourceTypeFilterHasEffectOn,
        maxValue: range[0],
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

import React, { useState, useEffect, useMemo } from "react";
import useFilter from "../../../filters/FilterCtx/useFilter";
import SliderFilter from "./SliderFilter";

import findSliderDomain from "./findSliderDomain";
import { FilterIntervalStrategy } from "../../../filters/filter-algorithms/FilterIntervalStrategy";

export default function GenericSliderFilter({
    id = "genericSlider",
    resourceProperty,
    resources = [],
    isActive = false,
    defaultRange,
    resourceTypeFilterHasEffectOn,
    formatTicks = (d) => {
        return d;
    },
}) {
    const initialRange = findSliderDomain(resources, resourceProperty);

    const [range, setRange] = useState(
        (filter && filter.getOption("range")) || defaultRange || initialRange
    );

    const filterAlgorithm = FilterIntervalStrategy.create({
        resourceProperty,
        resourceType: resourceTypeFilterHasEffectOn,
        range,
    });

    const initialFilterOptions = {
        active: isActive,
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

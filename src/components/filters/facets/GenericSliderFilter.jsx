import React, { useState, useEffect, useMemo } from "react";
import useFilter from "../../../filters/FilterCtx/useFilter";
import SliderFilter from "./SliderFilter";

import findSliderDomain from "./findSliderDomain";
import { FilterIntervalStrategy } from "../../../filters/filter-algorithms/FilterIntervalStrategy";
import { decimalPlaces } from "../../../utilities/math";

export default function GenericSliderFilter({
    id = "genericSlider",
    resourceProperty,
    resources = [],
    isActive = true,
    defaultRange,
    resourceTypeFilterHasEffectOn,
    formatTicks = (d) => {
        const decimals = decimalPlaces(d);
        return `${decimals > 1 ? d.toPrecision(2) : d}`;
    },
    sliderStep = 0.1,
}) {
    const initialFilterOptions = {
        active: isActive,
        filterCallback: filterAlgorithm,
    };
    const { filter, setFilterOptions } = useFilter(id, initialFilterOptions);

    const initialRange = findSliderDomain(resources, resourceProperty);
    const [range, setRange] = useState(
        (filter && filter.getStrategyOption("range")) ||
            defaultRange ||
            initialRange
    );

    const filterAlgorithm = FilterIntervalStrategy.create({
        resourceProperty,
        resourceType: resourceTypeFilterHasEffectOn,
        range,
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
            sliderStep={sliderStep}
        />
    );
}

import React, { useState, useEffect, useMemo } from "react";
import useFilter from "../../../filters/FilterCtx/useFilter";
import SliderFilter from "./SliderFilter";

import findSliderDomain from "./findSliderDomain";

const MIN = 0;
const MAX = 1;

export default function GenericSliderFilter({
    id = "genericSlider",
    resourceProperty,
    resources,
    isActive = false,
    defaultRange,
    resourceFilter = (r) => {
        //this function filter the knowledge graph resource filter can acts on
        return r; // example: (r) => {return r.getType() === "Pattern"} only patterns will be touched by filter the other resources discarded
    },
}) {
    const filterCallback = (resource) => {
        if (resourceFilter(resource)) {
            if (
                resource[resourceProperty] >= range[MIN] &&
                resource[resourceProperty] <= range[MAX]
            ) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    };
    const initialFilterOptions = {
        active: isActive,
        filterCallback: filterCallback,
        isMounted: true,
    };

    const { filter, setFilterOptions } = useFilter(id, initialFilterOptions);

    const initialRange = findSliderDomain(resources, resourceProperty);

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

    if (resources.length < 2) {
        return null;
    }

    return (
        <SliderFilter range={range} setRange={setRange} domain={initialRange} />
    );
}

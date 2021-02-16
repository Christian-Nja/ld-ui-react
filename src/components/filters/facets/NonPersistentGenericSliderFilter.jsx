import React, { useState, useEffect, useMemo } from "react";
import useNonPersistentFilter from "../../../filters/FilterCtx/useNonPersistentFilter";
import SliderFilter from "./SliderFilter";

import findSliderDomain from "./findSliderDomain";
import { scaleInto01 } from "../../../utilities/math";

const MIN = 0;
const MAX = 1;

export default function NonPersistentGenericSliderFilter({
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
            if (resource.alwaysVisible) {
                return true;
            }
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

    const { filter, setFilterOptions } = useNonPersistentFilter(
        id,
        initialFilterOptions
    );

    const initialRange = findSliderDomain(resources, resourceProperty);

    // we set by default max
    // defaultRange = [initialRange[MAX], initialRange[MAX]];

    const [range, setRange] = useState(
        (filter && filter.getOption("range")) || defaultRange || initialRange
    );

    useEffect(() => {
        if (filter) {
            setFilterOptions({
                ...filter.options,
                range: range,
                filterCallback: filterCallback,
                description: "",
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
            formatTicks={(d) => {
                return scaleInto01(
                    d,
                    initialRange[MIN],
                    initialRange[MAX]
                ).toFixed(2);
            }}
        />
    );
}

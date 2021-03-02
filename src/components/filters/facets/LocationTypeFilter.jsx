import React, { useState, useEffect } from "react";
import ViewController from "../../KnowledgeGraph/ViewController";
import { useKGCtx } from "../../../knowledgegraph/KGCtx/useKGCtx";
import useFilter from "../../../filters/FilterCtx/useFilter";
import { forEach, clone, some } from "lodash";
import { FilterLocationTypeStrategy } from "../../../filters/filter-algorithms/FilterLocationTypeStrategy";

export default function LocationTypeFilter({
    id = "locationType",
    isActive = true,
}) {
    const { knowledgeGraph } = useKGCtx();

    const resources = knowledgeGraph.getResources();

    const initialFilterOptions = {
        active: isActive,
        filterCallback: filterAlgorithm,
    };
    const { filter, setFilterOptions } = useFilter(id, initialFilterOptions);

    const defaultLocations = [];
    forEach(resources, (r) => {
        if (
            !some(defaultLocations, (loc) => {
                return loc.label === r.locationType;
            })
        ) {
            defaultLocations.push({
                uri: r.locationType,
                label: r.locationType,
                checked: false,
            });
        }
    });

    const [locations, setLocations] = useState(
        (filter && filter.getStrategyOption("locations")) || defaultLocations
    );

    const filterAlgorithm = FilterLocationTypeStrategy.create({
        locations: locations,
    });

    useEffect(() => {
        if (filter) {
            setFilterOptions({
                ...filter.options,
                filterCallback: filterAlgorithm,
            });
        }
    }, [locations]);

    return (
        <div style={{ marginLeft: 40, marginTop: 20 }}>
            <ViewController
                styles={{
                    checkboxContainer: {
                        marginBottom: 20,
                    },
                    checkboxLabel: {
                        fontSize: 20,
                        marginLeft: 10,
                        cursor: "pointer",
                    },
                    checkboxButton: {
                        width: 20,
                        height: 20,
                        cursor: "pointer",
                    },
                }}
                availableViews={locations}
                onViewConfigurationChange={(
                    clickedViewUri,
                    clickedViewState
                ) => {
                    const newLocations = clone(locations);
                    forEach(newLocations, (location) => {
                        if (location.uri === clickedViewUri) {
                            location.checked = clickedViewState;
                        }
                    });
                    setLocations(newLocations);
                }}
            />
        </div>
    );
}

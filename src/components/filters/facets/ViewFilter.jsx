import React, { useState, useEffect } from "react";
import ViewController from "../../KnowledgeGraph/ViewController";
import { useKGCtx } from "../../../knowledgegraph/KGCtx/useKGCtx";
import useFilter from "../../../filters/FilterCtx/useFilter";
import {
    forEach,
    clone,
    every,
    some,
    map,
    filter as lodashFilter,
} from "lodash";

export default function ViewFilter({
    title = "Filter by available views",
    id = "viewFilter",
    description = "Filter description",
    isActive = false,
}) {
    const { knowledgeGraph } = useKGCtx();

    const resources = knowledgeGraph.getResources();
    const defaultAvailableViews = [];
    forEach(resources, (r) => {
        const patternInstances = r.patternInstances;
        forEach(patternInstances, (patternInstance) => {
            if (
                !some(defaultAvailableViews, (defaultAvailableView) => {
                    return defaultAvailableView.uri === patternInstance.type;
                })
            ) {
                defaultAvailableViews.push({
                    uri: patternInstance.type,
                    label: patternInstance.typeLabel,
                    checked: false,
                }); // initialized with default checked value to false
            }
        });
    });

    const filterCallback = (resource) => {
        // no view selected return every resource
        if (
            !some(availableViews, (view) => {
                return view.checked === true;
            })
        ) {
            return true;
        }
        if (
            !resource.patternInstances ||
            resource.patternInstances.length === 0
        ) {
            return false;
        } else {
            const checkedViewsUri = map(
                lodashFilter(availableViews, (availableView) => {
                    return availableView.checked === true;
                }),
                (checkedView) => {
                    return checkedView.uri;
                }
            );
            const patternInstancesViews = map(
                resource.patternInstances,
                (patternInstance) => {
                    return patternInstance.type;
                }
            );
            if (
                // risorsa compare in almeno un istanza con il tipo tra i tipi selezionati
                // e.g. selezion Pattern1, Pattern2
                // risorsa deve comparire in almeno pattern_1 type Pattern1, pattern_2 type Pattern2
                every(checkedViewsUri, (checkedView) => {
                    return patternInstancesViews.includes(checkedView);
                })
            ) {
                return true;
            }
        }
    };
    const initialFilterOptions = {
        active: isActive,
        filterCallback: filterCallback,
    };

    const { filter, setFilterOptions } = useFilter(id, initialFilterOptions);

    const [availableViews, setAvailableViews] = useState(
        (filter && filter.getOption("availableViews")) || defaultAvailableViews
    );

    useEffect(() => {
        if (filter) {
            setFilterOptions({
                ...filter.options,
                availableViews: availableViews,
                filterCallback: filterCallback,
            });
        }
    }, [availableViews]);

    // const { classUri } = useKGCtx();

    // const [viewConfig, setViewConfig] = useState(
    //     conceptViewConfigRepository.read(classUri) || {}
    // );
    return (
        <div style={{ marginLeft: 70, marginTop: 20 }}>
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
                availableViews={availableViews}
                onViewConfigurationChange={(
                    clickedViewUri,
                    clickedViewState
                ) => {
                    const newAvailableViews = clone(availableViews);
                    forEach(availableViews, (availableView) => {
                        if (availableView.uri === clickedViewUri) {
                            availableView.checked = clickedViewState;
                        }
                    });
                    setAvailableViews(newAvailableViews);
                }}
            />
        </div>
    );
}

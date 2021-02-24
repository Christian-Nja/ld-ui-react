import React, { useState, useEffect } from "react";
import ViewController from "../../KnowledgeGraph/ViewController";
import { useKGCtx } from "../../../knowledgegraph/KGCtx/useKGCtx";
import useFilter from "../../../filters/FilterCtx/useFilter";
import { forEach, clone, some, filter as lodashFilter } from "lodash";
import { FilterResourceByViewStrategy } from "../../../filters/filter-algorithms/FilterResourceByViewStrategy";

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

    const { filter, setFilterOptions } = useFilter(id, initialFilterOptions);

    const [availableViews, setAvailableViews] = useState(
        (filter && filter.getOption("availableViews")) || defaultAvailableViews
    );

    const filterAlgorithm = FilterResourceByViewStrategy.create({
        views: availableViews,
    });

    const initialFilterOptions = {
        active: isActive,
        filterCallback: filterAlgorithm,
    };

    useEffect(() => {
        if (filter) {
            setFilterOptions({
                ...filter.options,
                filterCallback: filterAlgorithm,
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

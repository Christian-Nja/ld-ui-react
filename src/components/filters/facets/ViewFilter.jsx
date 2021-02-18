/**
 * 

 * sulla base di queste informazioni si setta la callback del filtro e si monta il classico 
 * filtro
 * ogni filtro va "scoopato" per classUri
 * 
 * Ogni schermata retrieva i filtri in base all'uri:
 * 
 * es:
 * screen1    useFilters(graphUri) solo quelli del grafo vengono riportati
 * screen2    useFilters(classUri) solo quelli per quella classe vengono recuperati
 * screen2    useFilters(patternUri) solo quelli per quel pattern vengono recuperati
 * 
 * nella FilteringResources vengono recuperati i filtri scoopati, non serve qualcuno che checka i filtri montati!
 * al più può checcare che tutti i filtri siano montati per evitare un primo rendering di tutte le risorse non montate
 * 
 */

import React, { useState, useEffect } from "react";
import ViewController from "../../KnowledgeGraph/ViewController";
import { useKGCtx } from "../../../knowledgegraph/KGCtx/useKGCtx";
import useFilter from "../../../filters/FilterCtx/useFilter";
import { forEach, clone, some, map, filter as lodashFilter } from "lodash";

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
        console.log("availableViews", availableViews);
        console.log("resourceToFilter", resource);

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
            if (
                // risorsa appartiene ad almeno un pattern di quelli selezionati
                some(resource.patternInstances, (patternInstance) => {
                    return checkedViewsUri.includes(patternInstance.type);
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
                    console.log("toggling");

                    const newAvailableViews = clone(availableViews);
                    forEach(availableViews, (availableView) => {
                        if (availableView.uri === clickedViewUri) {
                            availableView.checked = clickedViewState;
                        }
                    });
                    console.log("new available views", newAvailableViews);
                    setAvailableViews(newAvailableViews);
                }}
            />
        </div>
    );
}

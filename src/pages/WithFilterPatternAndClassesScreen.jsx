import PatternAndClassesScreen from "./PatternsAndClassesScreen";
import FilteringResource from "../components/filters/FilteringResource";
import React from "react";
import { useFilterCtx } from "../filters/FilterCtx/useFilterCtx";
import Filter from "../filters/Filter";

import { find, clone } from "lodash";

export default function WithFilterPatternAndClassesScreen({ knowledgeGraph }) {
    const { filters } = useFilterCtx();

    const dynamicAndStaticFilters = clone(filters);

    // if filter by centrality is not active
    // add a filter to remove all classes but those with alwaysVisible: true
    if (
        find(filters, (f) => {
            return f.getId() === "centrality" && !f.isActive();
        })
    ) {
        dynamicAndStaticFilters.push(
            Filter.create({
                id: "showFixedConcepts",
                options: {
                    active: true,
                    filterCallback: (resource) => {
                        if (resource.getType() === "Class") {
                            if (!resource.alwaysVisible) {
                                return false;
                            } else {
                                return true;
                            }
                        } else {
                            return true;
                        }
                    },
                },
            })
        );
    }

    return (
        <FilteringResource
            knowledgeGraph={knowledgeGraph}
            filters={dynamicAndStaticFilters}
        >
            <PatternAndClassesScreen />
        </FilteringResource>
    );
}

import React from "react";

import KnowledgeGraphPipe from "../../knowledgegraph/KnowledgeGraphPipe";
import KnowledgeGraph from "../../classes/KnowledgeGraph";
import Filter from "../../filters/Filter";
import { useFilterCtx } from "../../filters/FilterCtx/useFilterCtx";

import { filter, find } from "lodash";

export default function FilteringResource({ knowledgeGraph, children }) {
    // TODO: refactor this shit.
    // define well the filter oberver or better scope filters per page to remove this need!!!
    // scope filters per page!
    const { filters, filtersMountedFlag } = useFilterCtx();

    let filteredKnowledgeGraph;

    console.log("Filters mounted flag", filtersMountedFlag);
    if (filtersMountedFlag) {
        const supportedFilters = filter(filters, (filter) => {
            return filtersMountedFlag.includes(filter.getId());
        });

        // if filter by centrality is not active
        // add a filter to remove all classes but those with alwaysVisible: true
        // this shit should be removed it depends on domain business logic
        // todo move filter mounting at the top of the page
        if (
            find(supportedFilters, (f) => {
                return f.getId() === "centrality" && !f.isActive();
            })
        ) {
            supportedFilters.push(
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

        const kgPipe = KnowledgeGraphPipe.create(knowledgeGraph);
        // remove nodes connected to edge
        filteredKnowledgeGraph = kgPipe.chain(supportedFilters).toGraph();
    } else {
        filteredKnowledgeGraph = KnowledgeGraph.create();
    }

    return (
        <div>
            {children
                ? React.Children.map(children, (child) => {
                      return React.cloneElement(child, {
                          filteredKnowledgeGraph: filteredKnowledgeGraph,
                      });
                  })
                : null}
        </div>
    );
}

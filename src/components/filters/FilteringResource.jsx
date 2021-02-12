import React from "react";

import KnowledgeGraphPipe from "../../knowledgegraph/KnowledgeGraphPipe";
import KnowledgeGraph from "../../classes/KnowledgeGraph";
import { useFilterCtx } from "../../filters/FilterCtx/useFilterCtx";

import { filter } from "lodash";

export default function FilteringResource({
    knowledgeGraph,
    children,
    supportedFilterIds = [],
}) {
    const { filters, filtersMountedFlag } = useFilterCtx();

    let filteredKnowledgeGraph;

    console.log("Filters mounted flag", filtersMountedFlag);
    if (filtersMountedFlag) {
        const supportedFilters = filter(filters, (filter) => {
            return filtersMountedFlag.includes(filter.getId());
        });
        console.log("Mounted flag");
        console.log(filtersMountedFlag);
        console.log("supported mounted filters");
        console.log(supportedFilters);
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

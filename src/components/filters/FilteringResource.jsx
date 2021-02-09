import React from "react";

import KnowledgeGraphPipe from "../../knowledgegraph/KnowledgeGraphPipe";
import { useFilterCtx } from "../../filters/FilterCtx/useFilterCtx";

import { filter } from "lodash";

export default function FilteringResource({
    knowledgeGraph,
    children,
    supportedFilterIds = [],
}) {
    const { filters } = useFilterCtx();
    const supportedFilters = filter(filters, (filter) => {
        return supportedFilterIds.includes(filter.getId());
    });
    const kgPipe = KnowledgeGraphPipe.create(knowledgeGraph);
    // remove nodes connected to edge
    let filteredKnowledgeGraph = kgPipe.chain(supportedFilters).toGraph();
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

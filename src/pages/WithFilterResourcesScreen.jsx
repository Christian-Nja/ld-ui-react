import ResourcesScreen from "./ResourcesScreen";
import FilteringResource from "../components/filters/FilteringResource";
import React from "react";

import { useFilterCtx } from "../filters/FilterCtx/useFilterCtx";

export default function WithFilterResourcesScreen({ knowledgeGraph }) {
    const { filters } = useFilterCtx();

    return (
        <FilteringResource knowledgeGraph={knowledgeGraph} filters={filters}>
            <ResourcesScreen />
        </FilteringResource>
    );
}

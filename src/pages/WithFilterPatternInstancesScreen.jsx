import PatternInstancesScreen from "./PatternInstancesScreen";
import FilteringResource from "../components/filters/FilteringResource";
import React from "react";
import { useFilterCtx } from "../filters/FilterCtx/useFilterCtx";

export default function WithFilterPatternInstancesScreen({ knowledgeGraph }) {
    const { filters } = useFilterCtx();

    return (
        <FilteringResource knowledgeGraph={knowledgeGraph} filters={filters}>
            <PatternInstancesScreen />
        </FilteringResource>
    );
}

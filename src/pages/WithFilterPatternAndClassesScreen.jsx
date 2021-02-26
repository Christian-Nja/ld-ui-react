import PatternAndClassesScreen from "./PatternsAndClassesScreen";
import FilteringResource from "../components/filters/FilteringResource";
import React from "react";
import { useFilterCtx } from "../filters/FilterCtx/useFilterCtx";
import FilteringShowingJustOneKeyConceptPerView from "../components/filters/FilteringShowingJustOneKeyConceptPerView";

export default function WithFilterPatternAndClassesScreen({ knowledgeGraph }) {
    const { filters } = useFilterCtx();

    return (
        <FilteringResource knowledgeGraph={knowledgeGraph} filters={filters}>
            <FilteringShowingJustOneKeyConceptPerView filters={filters}>
                <PatternAndClassesScreen />
            </FilteringShowingJustOneKeyConceptPerView>
        </FilteringResource>
    );
}

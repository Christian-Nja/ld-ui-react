import PatternAndClassesScreen from "./PatternsAndClassesScreen";
import FilteringResource from "../components/filters/FilteringResource";
import React from "react";

export default function WithFilterPatternAndClassesScreen({ knowledgeGraph }) {
    return (
        <FilteringResource
            knowledgeGraph={knowledgeGraph}
            supportedFilterIds={["patternPie", "occurences"]}
        >
            <PatternAndClassesScreen />
        </FilteringResource>
    );
}

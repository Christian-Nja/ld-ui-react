import PatternInstancesScreen from "./PatternInstancesScreen";
import FilteringResource from "../components/filters/FilteringResource";
import React from "react";

export default function WithFilterPatternInstancesScreen({ knowledgeGraph }) {
    return (
        <FilteringResource knowledgeGraph={knowledgeGraph}>
            <PatternInstancesScreen />
        </FilteringResource>
    );
}

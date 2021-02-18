import ResourcesScreen from "./ResourcesScreen";
import FilteringResource from "../components/filters/FilteringResource";
import React from "react";

export default function WithFilterResourcesScreen({ knowledgeGraph }) {
    return (
        <FilteringResource knowledgeGraph={knowledgeGraph}>
            <ResourcesScreen />
        </FilteringResource>
    );
}

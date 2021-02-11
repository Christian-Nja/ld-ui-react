import ResourcesWithViewControllerScreen from "./ResourcesWithViewControllerScreen";
import FilteringResource from "../components/filters/FilteringResource";
import React from "react";

export default function WithFilterResourcesWithViewControllerScreen({
    knowledgeGraph,
}) {
    return (
        <FilteringResource
            knowledgeGraph={knowledgeGraph}
            supportedFilterIds={["search"]}
        >
            <ResourcesWithViewControllerScreen />
        </FilteringResource>
    );
}

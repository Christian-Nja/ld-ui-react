import PatternInstancesScreen from "./PatternInstancesScreen";
import FilteringResource from "../components/filters/FilteringResource";
import React from "react";

export default function WithFilterPatternInstancesScreen({ knowledgeGraph }) {
    return (
        <FilteringResource
            knowledgeGraph={knowledgeGraph}
            supportedFilterIds={[
                "geo",
                "time",
                "locationType",
                "parts",
                "measurements",
                "search",
                "diameter",
                "height",
                "width",
                "length",
                "depth",
            ]}
        >
            <PatternInstancesScreen />
        </FilteringResource>
    );
}

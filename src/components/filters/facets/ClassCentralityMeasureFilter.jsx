import React from "react";

import { useKGCtx } from "../../../knowledgegraph/KGCtx/useKGCtx";

import GenericSliderFilter from "./GenericSliderFilter";

export default function ClassCentralityMeasureFilter({}) {
    const { knowledgeGraph } = useKGCtx();
    const filterClasses = (resource) => {
        return resource.getType() === "Class";
    };
    return (
        <GenericSliderFilter
            resourceFilter={filterClasses}
            id="centrality"
            resourceProperty="centralityScore"
            resources={knowledgeGraph.getClasses()}
        />
    );
}

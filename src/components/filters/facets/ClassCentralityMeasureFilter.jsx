import React from "react";

import { useKGCtx } from "../../../knowledgegraph/KGCtx/useKGCtx";

import NonPersistentGenericSliderFilter from "./NonPersistentGenericSliderFilter";

export default function ClassCentralityMeasureFilter({}) {
    const { knowledgeGraph } = useKGCtx();
    const filterClasses = (resource) => {
        return resource.getType() === "Class";
    };
    return (
        <NonPersistentGenericSliderFilter
            resourceFilter={filterClasses}
            id="centrality"
            resourceProperty="centralityScore"
            resources={knowledgeGraph.getClasses()}
        />
    );
}

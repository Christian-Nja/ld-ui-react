import React from "react";
import { useKGCtx } from "../../../knowledgegraph/KGCtx/useKGCtx";

import GenericSliderFilter from "./GenericSliderFilter";

export default function OccurencesSliderFilter({}) {
    const { knowledgeGraph } = useKGCtx();
    const filterPattern = (resource) => {
        return resource.getType() === "Pattern";
    };
    return (
        <GenericSliderFilter
            resources={knowledgeGraph.getPatterns()}
            resourceFilter={filterPattern}
            id="occurences"
            resourceProperty="occurences"
        />
    );
}

import React from "react";
import { useKGCtx } from "../../../knowledgegraph/KGCtx/useKGCtx";

import GenericSliderFilter from "./GenericSliderFilter";

export default function OccurencesSliderFilter({}) {
    const { knowledgeGraph } = useKGCtx();

    return (
        <GenericSliderFilter
            resources={knowledgeGraph.getPatterns()}
            resourceTypeFilterHasEffectOn={"Pattern"}
            id="occurences"
            resourceProperty="occurences"
            sliderStep={1}
        />
    );
}

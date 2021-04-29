import React from "react";
import { useKGCtx } from "../../../knowledgegraph/KGCtx/useKGCtx";

import RightGenericSliderFilter from "./RightGenericSliderFilter";

export default function MaxMeasurementCountSliderFilter({}) {
    const { knowledgeGraph } = useKGCtx();
    return (
        <RightGenericSliderFilter
            resources={knowledgeGraph.getResources()}
            id="maxMeasurements"
            resourceProperty="measures"
            sliderStep={1}
        />
    );
}

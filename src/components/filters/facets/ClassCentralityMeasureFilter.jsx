import React from "react";

import { useKGCtx } from "../../../knowledgegraph/KGCtx/useKGCtx";

import GenericSliderFilter from "./GenericSliderFilter";
import { scaleInto01 } from "../../../utilities/math";
import findSliderDomain from "./findSliderDomain";

const MIN = 0;
const MAX = 1;

export default function ClassCentralityMeasureFilter({}) {
    const { knowledgeGraph } = useKGCtx();
    const filterClasses = (resource) => {
        return resource.getType() === "Class";
    };

    const initialRange = findSliderDomain(
        knowledgeGraph.getClasses(),
        "centralityScore"
    );

    return (
        <GenericSliderFilter
            resourceFilter={filterClasses}
            id="centrality"
            resourceProperty="centralityScore"
            resources={knowledgeGraph.getClasses()}
            formatTicks={(d) => {
                return scaleInto01(
                    d,
                    initialRange[MIN],
                    initialRange[MAX]
                ).toFixed(2);
            }}
        />
    );
}

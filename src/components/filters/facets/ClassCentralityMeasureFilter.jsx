import React from "react";

import { useKGCtx } from "../../../knowledgegraph/KGCtx/useKGCtx";

import NonPersistentGenericSliderFilter from "./NonPersistentGenericSliderFilter";

export default function ClassCentralityMeasureFilter({}) {
    const { knowledgeGraph } = useKGCtx();
    const filterClasses = (resource) => {
        return resource.getType() === "Class";
    };
    return (
        <div>
            <NonPersistentGenericSliderFilter
                resourceFilter={filterClasses}
                id="centrality"
                resourceProperty="centralityScore"
                resources={knowledgeGraph.getClasses()}
                isActive={true}
                defaultRange={[3, 7]}
                nonPersistent={true}
            />
            <div style={{ color: "red", textAlign: "center", fontSize: 15 }}>
                Warning: disabling or setting low values for this filter may
                cause rendering of huge amount of nodes and possibly slowing
                down the application
            </div>
        </div>
    );
}

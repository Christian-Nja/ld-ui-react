import React from "react";
import KG from "./KG";
import FilterCtxProvider from "../../filters/FilterCtx/FilterCtxProvider";
import LayoutCtxProvider from "../../layout/LayoutCtx/LayoutCtxProvider";

// every filter computes its info and save them to session storage
// every filter hide himself if data are not available
// every filter is thus responisble for what to do when to hide when to show
// every filter works with its domain entity
// example: MeasurementFilter works with measures
// KG and List are agnostic about this, they work with Resource, Pattern, PatternInstance

export default function ODPReactor({ knowledgeGraph }) {
    return (
        <FilterCtxProvider>
            <LayoutCtxProvider>
                <KG knowledgeGraph={knowledgeGraph} />
            </LayoutCtxProvider>
        </FilterCtxProvider>
    );
}

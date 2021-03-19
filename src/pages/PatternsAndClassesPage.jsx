import React from "react";
import FilterCtxProvider from "../filters/FilterCtx/FilterCtxProvider";
import LayoutCtxProvider from "../layout/LayoutCtx/LayoutCtxProvider";
import KGCtxProvider from "../knowledgegraph/KGCtx/KGCtxProvider";
import WithFilterPatternAndClassesScreen from "./WithFilterPatternAndClassesScreen";
import AlertCtxProvider from "../filters/AlertCtx/AlertCtxProvider";
import HelpCtxProvider from "../filters/HelpCtx/HelpCtxProvider";

export default function PatternsAndClassesPage({
    knowledgeGraph,
    knowledgeGraphUri,
    resetFilters,
}) {
    return (
        <KGCtxProvider
            knowledgeGraph={knowledgeGraph}
            classUri={knowledgeGraphUri}
        >
            <HelpCtxProvider>
                <AlertCtxProvider>
                    <FilterCtxProvider
                        resourceUri={knowledgeGraphUri}
                        resetFilters={resetFilters}
                    >
                        <LayoutCtxProvider>
                            <WithFilterPatternAndClassesScreen
                                knowledgeGraph={knowledgeGraph}
                            />
                        </LayoutCtxProvider>
                    </FilterCtxProvider>
                </AlertCtxProvider>
            </HelpCtxProvider>
        </KGCtxProvider>
    );
}

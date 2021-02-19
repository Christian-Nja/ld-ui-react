import React from "react";
import FilterCtxProvider from "../filters/FilterCtx/FilterCtxProvider";
import LayoutCtxProvider from "../layout/LayoutCtx/LayoutCtxProvider";
import AlertCtxProvider from "../filters/AlertCtx/AlertCtxProvider";
import KGCtxProvider from "../knowledgegraph/KGCtx/KGCtxProvider";
import WithFilterPatternInstancesScreen from "./WithFilterPatternInstancesScreen";
import HelpCtxProvider from "../filters/HelpCtx/HelpCtxProvider";

/**
 * classUri/type  Class || Pattern   measurement_collection etc.
 * they type pattern instance is of
 */

export default function PatternInstancesPage({
    knowledgeGraph,
    patternTypeUri,
}) {
    return (
        <KGCtxProvider
            knowledgeGraph={knowledgeGraph}
            classUri={patternTypeUri}
        >
            <HelpCtxProvider>
                <AlertCtxProvider>
                    <FilterCtxProvider resourceUri={patternTypeUri}>
                        <LayoutCtxProvider defaultLayout={{ layout: "list" }}>
                            <WithFilterPatternInstancesScreen
                                knowledgeGraph={knowledgeGraph}
                            />
                        </LayoutCtxProvider>
                    </FilterCtxProvider>
                </AlertCtxProvider>
            </HelpCtxProvider>
        </KGCtxProvider>
    );
}

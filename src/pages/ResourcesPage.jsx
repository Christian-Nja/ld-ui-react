import React from "react";
import FilterCtxProvider from "../filters/FilterCtx/FilterCtxProvider";
import LayoutCtxProvider from "../layout/LayoutCtx/LayoutCtxProvider";
import AlertCtxProvider from "../filters/AlertCtx/AlertCtxProvider";
import KGCtxProvider from "../knowledgegraph/KGCtx/KGCtxProvider";
import WithFilterResourcesScreen from "./WithFilterResourcesScreen";
import HelpCtxProvider from "../filters/HelpCtx/HelpCtxProvider";

export default function ResourcesPage({ knowledgeGraph, classUri }) {
    return (
        <KGCtxProvider knowledgeGraph={knowledgeGraph} classUri={classUri}>
            <HelpCtxProvider>
                <AlertCtxProvider>
                    <FilterCtxProvider>
                        <LayoutCtxProvider defaultLayout={{ layout: "list" }}>
                            <WithFilterResourcesScreen
                                knowledgeGraph={knowledgeGraph}
                            />
                        </LayoutCtxProvider>
                    </FilterCtxProvider>
                </AlertCtxProvider>
            </HelpCtxProvider>
        </KGCtxProvider>
    );
}

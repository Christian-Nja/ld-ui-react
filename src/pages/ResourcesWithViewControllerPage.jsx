import React from "react";
import FilterCtxProvider from "../filters/FilterCtx/FilterCtxProvider";
import LayoutCtxProvider from "../layout/LayoutCtx/LayoutCtxProvider";
import AlertCtxProvider from "../filters/AlertCtx/AlertCtxProvider";
import KGCtxProvider from "../knowledgegraph/KGCtx/KGCtxProvider";
import WithFilterResourcesWithViewControllerScreen from "./WithFilterResourcesWithViewControllerScreen";
import HelpCtxProvider from "../filters/HelpCtx/HelpCtxProvider";

export default function PatternInstancesPage({ knowledgeGraph }) {
    return (
        <KGCtxProvider knowledgeGraph={knowledgeGraph}>
            <HelpCtxProvider>
                <AlertCtxProvider>
                    <FilterCtxProvider>
                        <LayoutCtxProvider defaultLayout={{ layout: "list" }}>
                            <WithFilterResourcesWithViewControllerScreen
                                knowledgeGraph={knowledgeGraph}
                            />
                        </LayoutCtxProvider>
                    </FilterCtxProvider>
                </AlertCtxProvider>
            </HelpCtxProvider>
        </KGCtxProvider>
    );
}

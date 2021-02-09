import React from "react";
import PatternMenu from "../components/layout/PatternMenu";
import List from "../components/KnowledgeGraph/List";
import ODPReactorContainer from "../components/layout/ODPReactorContainer";
import { useLayoutCtx } from "../layout/LayoutCtx/useLayoutCtx";
import VisualGraph from "../components/KnowledgeGraph/VisualGraph";
import AlertBox from "../components/KnowledgeGraph/AlertBox";

import PatternFilter from "../components/filters/facets/PatternFilter";
import OccurencesSliderFilter from "../components/filters/facets/OccurencesSliderFilter";

import HelpBox from "../components/KnowledgeGraph/HelpBox";

export default function PatternsAndClassesScreen({ filteredKnowledgeGraph }) {
    const { layoutOptions } = useLayoutCtx();

    return (
        <ODPReactorContainer>
            <AlertBox />
            <HelpBox />
            <PatternMenu>
                <PatternFilter title="Filter by pattern" id="patternPie" />
                <OccurencesSliderFilter
                    title="Filter by occurences"
                    id="occurences"
                />
            </PatternMenu>
            {layoutOptions.layout === "list" && (
                <List
                    list={filteredKnowledgeGraph.toList()}
                    title="Categories"
                />
            )}
            <VisualGraph visualGraph={filteredKnowledgeGraph.toVisualGraph()} />
        </ODPReactorContainer>
    );
}

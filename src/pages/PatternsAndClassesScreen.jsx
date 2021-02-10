import React from "react";
import PatternMenu from "../components/layout/PatternMenu";
import List from "../components/KnowledgeGraph/List";
import ODPReactorContainer from "../components/layout/ODPReactorContainer";
import { useLayoutCtx } from "../layout/LayoutCtx/useLayoutCtx";
import VisualGraph from "../components/KnowledgeGraph/VisualGraph";
import AlertBox from "../components/KnowledgeGraph/AlertBox";

import PatternFilter from "../components/filters/facets/PatternFilter";
import OccurencesSliderFilter from "../components/filters/facets/OccurencesSliderFilter";
import ClassCentralityMeasureFilter from "../components/filters/facets/ClassCentralityMeasureFilter";
import FiltersMountedFlag from "../components/filters/FiltersMountedFlag";

import HelpBox from "../components/KnowledgeGraph/HelpBox";

export default function PatternsAndClassesScreen({ filteredKnowledgeGraph }) {
    const { layoutOptions } = useLayoutCtx();

    const kg = filteredKnowledgeGraph !== null;

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
                <ClassCentralityMeasureFilter
                    title="Filter by centrality measure"
                    id="centrality"
                />
                <FiltersMountedFlag id="filter-flag" />
            </PatternMenu>

            {layoutOptions.layout === "list" && kg && (
                <List
                    list={filteredKnowledgeGraph.toList()}
                    title="Categories"
                />
            )}
            {kg && (
                <VisualGraph
                    visualGraph={filteredKnowledgeGraph.toVisualGraph()}
                />
            )}
        </ODPReactorContainer>
    );
}

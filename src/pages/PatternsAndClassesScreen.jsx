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
import FiltersMountedController from "../components/filters/FiltersMountedController";

import HelpBox from "../components/KnowledgeGraph/HelpBox";

export default function PatternsAndClassesScreen({ filteredKnowledgeGraph }) {
    const { layoutOptions } = useLayoutCtx();

    const kg = filteredKnowledgeGraph !== null;

    return (
        <ODPReactorContainer>
            <AlertBox />
            <HelpBox />
            <PatternMenu>
                <PatternFilter
                    title="View"
                    id="patternPie"
                    description="Click on a slice to remove nodes of that type by the graph/list. A grey color slice means nodes of that kind are not displayed"
                />
                <OccurencesSliderFilter
                    title="View occurences"
                    id="occurences"
                    description="Tune this filter to show only views with number of occurences in the selected range"
                />
                <ClassCentralityMeasureFilter
                    title="Concept relevance"
                    id="centrality"
                    description="The centrality of a concept is given by the highest interconnection with other concept. Tune this filter to show only views with importance score in the selected range"
                />
                <FiltersMountedController
                    id="filter-flag"
                    mountedFilters={[
                        "centrality",
                        "occurences",
                        "patternPie",
                        "search",
                    ]}
                />
            </PatternMenu>
            {layoutOptions.layout === "list" && kg && (
                <List list={filteredKnowledgeGraph.toList()} title="Views" /> // queste pagine dovrebbero andare fuori dalla lib
            )}
            {kg && (
                <VisualGraph
                    visualGraph={filteredKnowledgeGraph.toVisualGraph()}
                />
            )}
        </ODPReactorContainer>
    );
}

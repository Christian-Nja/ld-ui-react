import React from "react";
import PatternMenu from "../components/layout/PatternMenu";
import Navbar from "../components/layout/Navbar";
import List from "../components/KnowledgeGraph/List";
import ODPReactorContainer from "../components/layout/ODPReactorContainer";
import { useLayoutCtx } from "../layout/LayoutCtx/useLayoutCtx";
import VisualGraph from "../components/KnowledgeGraph/VisualGraph";
import AlertBox from "../components/KnowledgeGraph/AlertBox";

import PatternFilter from "../components/filters/facets/PatternFilter";
import OccurencesSliderFilter from "../components/filters/facets/OccurencesSliderFilter";
import ClassCentralityMeasureFilter from "../components/filters/facets/ClassCentralityMeasureFilter";
import FiltersMountedController from "../components/filters/FiltersMountedController";
import { Grid } from "semantic-ui-react";

import GraphHelpBox from "../components/KnowledgeGraph/GraphHelpBox";

export default function PatternsAndClassesScreen({ filteredKnowledgeGraph }) {
    const { layoutOptions } = useLayoutCtx();

    const kg = filteredKnowledgeGraph !== null;

    return (
        <ODPReactorContainer>
            {/* <Navbar /> */}
            <AlertBox />
            <GraphHelpBox />
            <Grid container stackable columns={2}>
                <Grid.Column width={12}>
                    {layoutOptions.layout === "list" && kg && (
                        <List
                            list={filteredKnowledgeGraph.toList()}
                            title="Views"
                        /> // queste pagine dovrebbero andare fuori dalla lib
                    )}
                    {kg && (
                        <VisualGraph
                            visualGraph={filteredKnowledgeGraph.toVisualGraph()}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={4}>
                    <PatternMenu>
                        <PatternFilter
                            title="View"
                            id="patternPie"
                            description="Click on a slice to remove views (diamonds) of the specified type. A grey color slice means the views of that type and all related concepts are not shown."
                        />
                        <OccurencesSliderFilter
                            title="View occurences"
                            id="occurences"
                            description="Tune this filter to show only views with the number of occurences in the selected range"
                        />
                        <ClassCentralityMeasureFilter
                            title="Concept relevance"
                            id="centrality"
                            description="Tune this filter to show concepts with an importance score in the selected range. The importance score is computed as the number of associated entities in the knowledge graph, normalized into 0-1. By default one key concept per view is shown."
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
                </Grid.Column>
            </Grid>
        </ODPReactorContainer>
    );
}

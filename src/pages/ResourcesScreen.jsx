import React, { useState } from "react";
import PatternMenu from "../components/layout/PatternMenu";
import List from "../components/KnowledgeGraph/List";
import ODPReactorContainer from "../components/layout/ODPReactorContainer";
import AlertBox from "../components/KnowledgeGraph/AlertBox";
import GoToButton from "../components/layout/GoToButton";
import FiltersMountedController from "../components/filters/FiltersMountedController";
import ViewFilter from "../components/filters/facets/ViewFilter";

export default function ResourcesScreen({ filteredKnowledgeGraph }) {
    // we need here the available views for a URI
    // check the mechanism for change checked value in the checkbox

    return (
        <ODPReactorContainer>
            <GoToButton />
            <AlertBox />
            <PatternMenu showLayoutButton={false}>
                <ViewFilter
                    id="viewFilter"
                    title="Filter resources with specific view"
                    description="Setting this filter you will see with resources has a specific view"
                />
                <FiltersMountedController
                    id="filter-flag"
                    mountedFilters={["viewFilter"]}
                />
            </PatternMenu>
            <List list={filteredKnowledgeGraph.toList()} />
        </ODPReactorContainer>
    );
}

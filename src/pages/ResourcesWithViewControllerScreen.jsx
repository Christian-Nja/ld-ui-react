import React from "react";
import PatternMenu from "../components/layout/PatternMenu";
import List from "../components/KnowledgeGraph/List";
import ODPReactorContainer from "../components/layout/ODPReactorContainer";
import AlertBox from "../components/KnowledgeGraph/AlertBox";
import GoToButton from "../components/layout/GoToButton";
import FiltersMountedController from "../components/filters/FiltersMountedController";

export default function PatternInstancesScreen({ filteredKnowledgeGraph }) {
    return (
        <ODPReactorContainer>
            <GoToButton />
            <AlertBox />
            <PatternMenu showLayoutButton={false}>
                <FiltersMountedController id="filter-flag" />
            </PatternMenu>
            <List list={filteredKnowledgeGraph.toList()} />)
        </ODPReactorContainer>
    );
}

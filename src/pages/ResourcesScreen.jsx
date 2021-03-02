import React, { useState } from "react";
import PatternMenu from "../components/layout/PatternMenu";
import List from "../components/KnowledgeGraph/List";
import ODPReactorContainer from "../components/layout/ODPReactorContainer";
import AlertBox from "../components/KnowledgeGraph/AlertBox";
import FiltersMountedController from "../components/filters/FiltersMountedController";
import ViewFilter from "../components/filters/facets/ViewFilter";
import Navbar from "../components/layout/Navbar";
import GoToButton from "../components/layout/GoToButton";
import { Grid } from "semantic-ui-react";
import ClassInstancesHelpBox from "../components/KnowledgeGraph/ClassInstancesHelpBox";

export default function ResourcesScreen({ filteredKnowledgeGraph }) {
    // we need here the available views for a URI
    // check the mechanism for change checked value in the checkbox

    return (
        <ODPReactorContainer>
            <GoToButton
                style={{
                    background: "#6c7ae0",
                    width: "fit-content",
                    position: "absolute",
                    padding: 15,
                    marginTop: 14,
                }}
            />
            {/* <Navbar /> */}
            <AlertBox />
            <ClassInstancesHelpBox />
            <Grid container stackable columns={2}>
                <Grid.Column width={12}>
                    <List list={filteredKnowledgeGraph.toList()} />
                </Grid.Column>
                <Grid.Column width={4}>
                    <PatternMenu
                        showLayoutButton={false}
                        style={{ position: "absolute" }}
                    >
                        <ViewFilter
                            id="viewFilter"
                            title="Resource View"
                            description="Show only resources that are associated with the selected view."
                        />
                        <FiltersMountedController
                            id="filter-flag"
                            mountedFilters={["viewFilter"]}
                        />
                    </PatternMenu>
                </Grid.Column>
            </Grid>
        </ODPReactorContainer>
    );
}

import React from "react";
import PatternMenu from "../components/layout/PatternMenu";
import List from "../components/KnowledgeGraph/List";
import ODPReactorContainer from "../components/layout/ODPReactorContainer";
import GeoFilter from "../components/filters/facets/GeoFilter";
import MinMeasurementSliderFilter from "../components/filters/facets/MinMeasurementSliderFilter";
import MaxMeasurementSliderFilter from "../components/filters/facets/MaxMeasurementSliderFilter";
import MaxMeasurementCountSliderFilter from "../components/filters/facets/MaxMeasurementCountSliderFilter";
import MinMeasurementCountSliderFilter from "../components/filters/facets/MinMeasurementCountSliderFilter";
import MinPartCountSliderFilter from "../components/filters/facets/MinPartCountSliderFilter";
import MaxPartCountSliderFilter from "../components/filters/facets/MaxPartCountSliderFilter";
import hasResourceToFilter from "../components/filters/facets/hasResourceToFilter";
import { useKGCtx } from "../knowledgegraph/KGCtx/useKGCtx";
import { forEach, map } from "lodash";
import AlertBox from "../components/KnowledgeGraph/AlertBox";
import { Grid } from "semantic-ui-react";
import Navbar from "../components/layout/Navbar";
import GoToButton from "../components/layout/GoToButton";
import PatternInstancesHelpBox from "../components/KnowledgeGraph/PatternInstancesHelpBox";
import LocationTypeFilter from "../components/filters/facets/LocationTypeFilter";
import StartTimeIntervalFilter from "../components/filters/facets/StartTimeIntervalFilter";
import EndTimeIntervalFilter from "../components/filters/facets/EndTimeIntervalFilter";
import SinglePropertySearchBarFilter from "../components/filters/facets/SinglePropertySearchBarFilter";

export default function PatternInstancesScreen({ filteredKnowledgeGraph }) {
    const { knowledgeGraph } = useKGCtx();

    console.log("RESOURCES KG", knowledgeGraph.getResources().length);

    // determine dynamically measurement filters
    const resources = knowledgeGraph.getResources();
    const thereIsGeoLocationToFilter = hasResourceToFilter(
        resources,
        (resource) => {
            if (resource.lat && resource.long) {
                return true;
            } else {
                return false;
            }
        }
    );
    const thereIsTimeToFilter = hasResourceToFilter(resources, (resource) => {
        if (resource.startTime && resource.endTime) {
            return true;
        } else {
            return false;
        }
    });

    const thereAreTypeLocationsToFilter = hasResourceToFilter(
        resources,
        (resource) => {
            if (resource.locationType) {
                return true;
            } else {
                return false;
            }
        }
    );

    const thereArePartsToFilter = hasResourceToFilter(resources, (resource) => {
        if (resource.parts) {
            return true;
        } else {
            return false;
        }
    });

    const thereIsCulturalPropertyToFilter = hasResourceToFilter(
        resources,
        (resource) => {
            if (resource.culturalProperty) {
                return true;
            } else {
                return false;
            }
        }
    );

    const measurementSet = [
        "height",
        "weight",
        "length",
        "width",
        "depth",
        "diameter",
        "thickness",
    ];

    const measurementFilters = [];
    forEach(measurementSet, (m) => {
        const iterator = ["minValue", "maxValue"];
        const thereIsMeasureToFilter = hasResourceToFilter(
            resources,
            (resource) => {
                if (resource[m]) {
                    return true;
                } else {
                    return false;
                }
            }
        );
        if (thereIsMeasureToFilter) {
            forEach(iterator, (i) => {
                switch (i) {
                    case "minValue":
                        measurementFilters.push(
                            <MinMeasurementSliderFilter
                                topBorder={true}
                                id={`min-${m}`}
                                title={`Min ${m}`}
                                measurementType={m}
                                description={`Tune this filter to show only cultural properties with a value for ${m} greater than the selected value.`}
                            />
                        );
                        break;
                    case "maxValue":
                        measurementFilters.push(
                            <MaxMeasurementSliderFilter
                                id={`max-${m}`}
                                title={`Max ${m}`}
                                measurementType={m}
                                description={`Tune this filter to show only cultural properties with a value for ${m} less than the selected value.`}
                            />
                        );
                        break;
                }
            });
        }
    });

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
            <PatternInstancesHelpBox />
            <Grid container stackable columns={2}>
                <Grid.Column width={12}>
                    <List list={filteredKnowledgeGraph.toList()} />
                </Grid.Column>
                <Grid.Column width={4}>
                    <PatternMenu
                        showLayoutButton={false}
                        style={{ position: "absolute" }}
                    >
                        {thereIsGeoLocationToFilter && (
                            <GeoFilter
                                topBorder={true}
                                title="On a map"
                                id="geo"
                                description="Draw an area on the map to show only cultural properties located in that area."
                            />
                        )}
                        {thereAreTypeLocationsToFilter && (
                            <LocationTypeFilter
                                topBorder={true}
                                id="locationType"
                                property="locationType"
                                title="Location Type"
                                description="Check items to show show objects with the specified location type. If no view is selected all the objects with any location type are shown."
                            />
                        )}
                        {/* {thereIsCulturalPropertyToFilter && (
                            <SinglePropertySearchBarFilter
                                title="Cultural Property"
                                propertyToSearch="culturalProperty"
                                searchBarPlaceholder="Search"
                                description="Search a specific cultural property."
                            />
                        )} */}
                        {thereIsTimeToFilter && (
                            <StartTimeIntervalFilter
                                topBorder={true}
                                title="Start Time"
                                id="startTime"
                                description="Select the minimum start time of the time interval of a location. You will see all the views with the beginning year of location in a place greater than the selected value. You can choose to include or exclude values with no specified start time value. There may be two cases: (A) the object has always been located in a place; (B) data is missing"
                            />
                        )}
                        {thereIsTimeToFilter && (
                            <EndTimeIntervalFilter
                                title="End Time"
                                id="endTime"
                                description="Select the maximum start time of the time interval of a location. You will see all the views with the ending year of location in a place less than the selected value. You can choose to include or exclude values with no specified end time value. There may be two cases: (A) the object is currently been located in the place; (B) data is missing"
                            />
                        )}
                        {thereArePartsToFilter && (
                            <MinPartCountSliderFilter
                                id="minParts"
                                title="Min Parts"
                                resourceProperty="parts"
                                description="Tune this filter to show only cultural properties with a number of components less than the selected value."
                            />
                        )}
                        {thereArePartsToFilter && (
                            <MaxPartCountSliderFilter
                                id="maxParts"
                                title="Max Parts"
                                resourceProperty="parts"
                                description="Tune this filter to show only cultural properties with a number of components less greater the selected value."
                            />
                        )}
                        {measurementFilters.length !== 0 &&
                            map(measurementFilters, (m) => {
                                return m;
                            })}
                        {measurementFilters.length !== 0 && (
                            <MinMeasurementCountSliderFilter
                                topBorder={true}
                                id="minMeasurements"
                                title="Min measurements"
                                description="Tune this filter to show only cultural properties with their number of collected measurements greater than the selected value."
                            />
                        )}
                        {measurementFilters.length !== 0 && (
                            <MaxMeasurementCountSliderFilter
                                id="maxMeasurements"
                                title="Max measurements"
                                description="Tune this filter to show only cultural properties with their number of collected measurements less than the selected value."
                            />
                        )}
                    </PatternMenu>
                </Grid.Column>
            </Grid>
        </ODPReactorContainer>
    );
}

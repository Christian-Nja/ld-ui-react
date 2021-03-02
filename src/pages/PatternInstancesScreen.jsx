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
import FiltersMountedController from "../components/filters/FiltersMountedController";
import { Grid } from "semantic-ui-react";
import Navbar from "../components/layout/Navbar";
import GoToButton from "../components/layout/GoToButton";
import PatternInstancesHelpBox from "../components/KnowledgeGraph/PatternInstancesHelpBox";
import LocationTypeFilter from "../components/filters/facets/LocationTypeFilter";
import StartTimeIntervalFilter from "../components/filters/facets/StartTimeIntervalFilter";
import EndTimeIntervalFilter from "../components/filters/facets/EndTimeIntervalFilter";
import { SwitcherTwoTone } from "@ant-design/icons";

export default function PatternInstancesScreen({ filteredKnowledgeGraph }) {
    const { knowledgeGraph } = useKGCtx();

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
                                id={`min-${m}`}
                                title={`Min ${m}`}
                                measurementType={m}
                                description={`Tune this filter to show only cultural properties with min ${m}.`}
                            />
                        );
                        break;
                    case "maxValue":
                        measurementFilters.push(
                            <MaxMeasurementSliderFilter
                                id={`max-${m}`}
                                title={`Max ${m}`}
                                measurementType={m}
                                description={`Tune this filter to show only cultural properties with max ${m}.`}
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
                                title="On a map"
                                id="geo"
                                description="Draw an area on the map to show only cultural properties located in that area."
                            />
                        )}
                        {thereIsTimeToFilter && (
                            <StartTimeIntervalFilter
                                title="Start Time"
                                id="startTime"
                                description="This filter performs well with location type or geographic filter. Select an year or interval of time and a location. You will see only cultural properties located in a specific area at a certain period of time"
                            />
                        )}
                        {thereIsTimeToFilter && (
                            <EndTimeIntervalFilter
                                title="End Time"
                                id="endTime"
                                description="This filter performs well with location type or geographic filter. Select an year or interval of time and a location. You will see only cultural properties located in a specific area at a certain period of time"
                            />
                        )}
                        {thereAreTypeLocationsToFilter && (
                            <LocationTypeFilter
                                id="locationType"
                                property="locationType"
                                title="Location Type"
                                description="Click on a slice to remove/show cultural properties with the specified location type. A grey color slice means cultural properties with that location type are not shown."
                            />
                        )}
                        {thereArePartsToFilter && (
                            <MinPartCountSliderFilter
                                id="minParts"
                                title="Min Parts"
                                resourceProperty="parts"
                                description="Tune this filter to show only cultural properties with their number of components in the selected range."
                            />
                        )}
                        {thereArePartsToFilter && (
                            <MaxPartCountSliderFilter
                                id="maxParts"
                                title="Max Parts"
                                resourceProperty="parts"
                                description="Tune this filter to show only cultural properties with their number of components in the selected range."
                            />
                        )}
                        {measurementFilters.length !== 0 &&
                            map(measurementFilters, (m) => {
                                return m;
                            })}
                        {measurementFilters.length !== 0 && (
                            <MinMeasurementCountSliderFilter
                                id="minMeasurements"
                                title="Min measurements"
                                description="Tune this filter to show only cultural properties with their number of collected measurements in the selected range."
                            />
                        )}
                        {measurementFilters.length !== 0 && (
                            <MaxMeasurementCountSliderFilter
                                id="maxMeasurements"
                                title="Max measurements"
                                description="Tune this filter to show only cultural properties with their number of collected measurements in the selected range."
                            />
                        )}
                    </PatternMenu>
                </Grid.Column>
            </Grid>
        </ODPReactorContainer>
    );
}

import React from "react";
import PatternMenu from "../components/layout/PatternMenu";
import List from "../components/KnowledgeGraph/List";
import ODPReactorContainer from "../components/layout/ODPReactorContainer";
import GeoFilter from "../components/filters/facets/GeoFilter";
import MeasurementSliderFilter from "../components/filters/facets/MeasurementSliderFilter";
import PropertyFilter from "../components/filters/facets/PropertyFilter";
import TimeIntervalFilter from "../components/filters/facets/TimeIntervalFilter";
import MeasurementCountSliderFilter from "../components/filters/facets/MeasurementCountSliderFilter";
import PartCountSliderFilter from "../components/filters/facets/PartCountSliderFilter";

import hasResourceToFilter from "../components/filters/facets/hasResourceToFilter";
import { useKGCtx } from "../knowledgegraph/KGCtx/useKGCtx";
import { forEach, map } from "lodash";
import AlertBox from "../components/KnowledgeGraph/AlertBox";
import GoToButton from "../components/layout/GoToButton";
import FiltersMountedController from "../components/filters/FiltersMountedController";

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
    const thereAreMeasurementToFilter = [];
    forEach(measurementSet, (m) => {
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
            thereAreMeasurementToFilter.push(m);
        }
    });

    const mountedFilters = ["search"];

    if (thereIsGeoLocationToFilter) mountedFilters.push("geo");
    thereAreMeasurementToFilter.forEach((m) => mountedFilters.push(m));
    if (thereAreMeasurementToFilter.length > 0)
        mountedFilters.push("measurements");
    if (thereArePartsToFilter) mountedFilters.push("parts");
    if (thereAreTypeLocationsToFilter) mountedFilters.push("locationType");
    if (thereIsTimeToFilter) mountedFilters.push("time");
    return (
        <ODPReactorContainer>
            <GoToButton />
            <AlertBox />
            <PatternMenu showLayoutButton={false}>
                {thereIsGeoLocationToFilter && (
                    <GeoFilter
                        title="Filter drawing location on a map"
                        id="geo"
                        description="Draw an area on the map and show only cultural properties inside it"
                    />
                )}
                {thereIsTimeToFilter && (
                    <TimeIntervalFilter
                        title="Filter by time interval"
                        id="time"
                        description="This filter performs well with location type or geographic filter. Select an year or interval of time and a location. You will see only cultural properties located in a specific area at a certain period of time"
                    />
                )}
                {thereAreTypeLocationsToFilter && (
                    <PropertyFilter
                        id="locationType"
                        property="locationType"
                        title="Filter by location type"
                        description="Click on a slice to remove/show cultural properties with specified location type in the list. A grey color slice means cultural properties with given location type are not shown."
                    />
                )}
                {thereArePartsToFilter && (
                    <PartCountSliderFilter
                        id="parts"
                        title="Filter by number of parts"
                        resourceProperty="parts"
                        description="Tune this filter to show only cultural properties with number of components in the selected range"
                    />
                )}
                {map(thereAreMeasurementToFilter, (m) => {
                    console.log("Measure filter");
                    console.log(m);
                    return (
                        <MeasurementSliderFilter
                            id={m}
                            title={`Filter by ${m}`}
                            measurementType={m}
                            description={`Tune this filter to show only cultural properties with ${m} in the selected range`}
                        />
                    );
                })}
                {thereAreMeasurementToFilter.length !== 0 && (
                    <MeasurementCountSliderFilter
                        id="measurements"
                        title="Filter by number of measurements"
                        description="Tune this filter to show only cultural properties with number of collected measurements in the selected range"
                    />
                )}
                <FiltersMountedController
                    id="filter-flag"
                    mountedFilters={mountedFilters}
                />
            </PatternMenu>
            <List list={filteredKnowledgeGraph.toList()} />)
        </ODPReactorContainer>
    );
}

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
import HelpBox from "../components/KnowledgeGraph/HelpBox";
import GoToButton from "../components/layout/GoToButton";

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

    return (
        <ODPReactorContainer>
            <GoToButton />
            <AlertBox />
            <HelpBox />
            <PatternMenu showLayoutButton={false}>
                {thereIsGeoLocationToFilter && (
                    <GeoFilter
                        title="Filter drawing location on a map"
                        id="geo"
                    />
                )}
                {thereIsTimeToFilter && (
                    <TimeIntervalFilter
                        title="Filter by time interval"
                        id="time"
                    />
                )}
                {thereAreTypeLocationsToFilter && (
                    <PropertyFilter
                        id="locationType"
                        property="locationType"
                        title="Filter by location type"
                    />
                )}
                {thereArePartsToFilter && (
                    <PartCountSliderFilter
                        id="parts"
                        title="Filter by number of parts"
                        resourceProperty="parts"
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
                        />
                    );
                })}
                {thereAreMeasurementToFilter && (
                    <MeasurementCountSliderFilter
                        id="measurements"
                        title="Filter by number of measurements"
                    />
                )}
            </PatternMenu>
            <List list={filteredKnowledgeGraph.toList()} />)
        </ODPReactorContainer>
    );
}

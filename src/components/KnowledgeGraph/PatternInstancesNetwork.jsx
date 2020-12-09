// React
import React, { useRef, useEffect, useState } from "react";

// function and classes
import Graph from "../classes/Graph";
import { defineProp } from "../../utilities/generics";
import { scaleData } from "../../utilities/math";
import InstancesList from "../classes/InstancesList";

// Pattern components
import PatternMenu from "./PatternMenu";
import PropertyFilter from "./facets/PropertyFilter";

import TimeIntervalFilter from "./facets/TimeIntervalFilter";

// Graphin components
import Graphin from "@antv/graphin";
import { useLayout, useGraphinDoubleClick } from "../hooks/ld-ui-hooks";
import "@antv/graphin/dist/index.css";
import SliderFilter from "./facets/SliderFilter";
import SearchBarFilter from "./facets/SearchBarFilter";

//import TimeIntervalFilter from "./facets/TimeIntervalFilter";

// TODO: possible todo : instances should be in a central state store (redux) such that when components such as filters
//                      update them you don't need to pass them down to all the filters.
//                      Every filter should be able to trigger an action modifying the component on change/filtering
//                      PatternInstancesNetwork observe those instances in the central state and rerender when modified

// TODO : actually we are receiving not instances but node of instance and reconstructing data here
//         every node of props.instances is a node of the instance not the instance itself

export default function PatternInstancesNetwork(props) {
    // graphRef for mix React virtual DOM and graphin imperative operation on DOM
    const graphRef = useRef(null);

    const [graph, setGraph] = useState(new Graph());

    // parse instances. This is the initial state of this component
    let instances = defineProp(props.patterns.instances, []);

    let initialStartTime = 1400;
    let initialEndTime = 1450;
    // filtering instances !
    instances = instances.filter((instance) => {
        if (
            instance.pattern ===
            "https://w3id.org/arco/ontology/location/time-indexed-typed-location"
        ) {
            console.log("time index instance");
            console.log(instance);
            if (instance.startTime === "") {
                instance.startTime = initialStartTime;
                initialStartTime++;
            }
            if (instance.endTime === "") {
                instance.endTime = initialEndTime;
                initialEndTime++;
            }
            return (
                (instance.lat !== "" && instance.long !== "") ||
                instance.type === "https://w3id.org/italia/onto/TI/TimeInterval"
                // instance.startTime !== ""
            );
        }
        if (
            instance.pattern ===
            "https://w3id.org/arco/ontology/denotative-description/measurement-collection"
        ) {
            return instance;
        }
        if (
            instance.pattern ===
            "https://w3id.org/arco/ontology/location/cultural-property-component-of"
        ) {
            return instance;
        }
    });
    console.log("Cleaned instances:");
    console.log(instances);

    // a list of instances and degree for each instance
    const instancesList = new InstancesList(instances);

    // pass this to Layout component to have a panel to switch layouts
    const layoutHandler = useLayout();

    instances.sort((b, a) =>
        a.locationType > b.locationType
            ? 1
            : b.locationType > a.locationType
            ? -1
            : 0
    );

    // add instances to Graph
    graph.addNodes(
        instances.map((instance) => {
            return {
                id: instance.instance,
                data: instance,
            };
        })
    );

    useEffect(() => {
        // TODO: set a color for each instance, set size based on node degree
        const filter = (node, id) => {
            // node.style.primaryColor = graph.nodeGradient()[id];
            node.style.primaryColor = props.color;
            let degree = instancesList.getPatternInstanceDegree(node.id);

            // compute dynamically max and min degree
            node.style.nodeSize = Math.round(scaleData(degree, 1, 50, 12, 70));
        };
        graph.breadthFirstSearch(filter);
    }, []);

    // on instance doubleclick visualize instance
    useGraphinDoubleClick(graphRef, props.getInstance);

    ////////// TODO : ALL THIS LOGIC SHOULD BE MOVED OUTSIDE !
    //////////        THIS IS RELATED TO DEFINE A GOOD INTERFACE FOR THIS COMPONENT
    //////////        THIS COMPONENT SHOULD RECEIVE ALL THE INSTANCES AND FOR EVERY INSTANCE YOU SHOULD HAVE DATA !
    //////////        DATA OF THE SINGLE INSTANCE MUST GO HERE AND ARE ALREADY AVAILABLE WHEN YOU GO TO VISUALIZE
    //////////        OR AT LEAST MINIMUM REQUIRED DATA TO MAKE FILTERS TO WORK !
    let locationTypes = graph.nodes.map((node) => {
        return node.data.locationType;
    });

    // count location occurrences
    var counts = {};
    for (var j = 0; j < locationTypes.length; j++) {
        var num = locationTypes[j];
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    const hardcodedPatternIf =
        instances && instances[0] ? instances[0].pattern : null;

    let i = 0;
    const properties = Object.keys(counts).map((locationType) => {
        i = i + 1;
        return {
            title: locationType.split("/").slice(-1)[0],
            value: counts[locationType],
            color: graph.nodeGradient()[i],
            uri: locationType,
        };
    });

    const handleLocationTypeFilter = (filterNodes) => {
        graph.addFilter({
            key: "locationType",
            mask: filterNodes,
            class: "cat",
        });
        const newData = new Graph(graph.nodes, graph.edges, graph.filters);
        setGraph(newData);
    };

    // min/max
    let measRange = [0, 1];
    let partRange = [0, 1];
    let measOccurencesFreq = [];
    let partsOccurrencesFreq = [];
    graph.nodes.forEach((node) => {
        const measurements = instancesList.getAggregateCount(
            "https://w3id.org/arco/ontology/denotative-description/Measurement",
            node.id
        );
        const parts = instancesList.getAggregateCount(
            "https://w3id.org/arco/ontology/arco/CulturalPropertyComponent", // HERE
            node.id
        );
        node.data.measurements = measurements;
        node.data.parts = parts;
        measOccurencesFreq.push(measurements);
        partsOccurrencesFreq.push(parts);
    });
    measRange = [
        Math.min(...measOccurencesFreq),
        Math.max(...measOccurencesFreq),
    ];
    partRange = [
        Math.min(...partsOccurrencesFreq),
        Math.max(...partsOccurrencesFreq),
    ];

    const handleSliderFilterMeasurements = (range) => {
        graph.addFilter({
            key: "measurements",
            range: range,
            class: "num",
        });
        const newData = new Graph(graph.nodes, graph.edges, graph.filters);
        setGraph(newData);
    };
    const handleSliderFilterParts = (range) => {
        graph.addFilter({
            key: "parts",
            range: range,
            class: "num",
        });
        const newData = new Graph(graph.nodes, graph.edges, graph.filters);
        setGraph(newData);
    };

    const handleTimeFilter = (filterNodes) => {
        graph.addFilter({ key: "instance", mask: filterNodes, class: "time" });
        const newData = new Graph(graph.nodes, graph.edges, graph.filters);
        setGraph(newData);
    };

    const handleSearchFilter = (search) => {
        graph.addFilter({ key: "siteAddress", mask: search, class: "search" });
        const newData = new Graph(graph.nodes, graph.edges, graph.filters);
        setGraph(newData);
    };

    return (
        <div style={graphContainerStyle}>
            <PatternMenu layoutHandler={layoutHandler}>
                {hardcodedPatternIf ===
                "https://w3id.org/arco/ontology/location/time-indexed-typed-location" ? (
                    <TimeIntervalFilter
                        instances={instances}
                        title={"Filter by time interval"}
                        onFilter={handleTimeFilter}
                    />
                ) : null}
                {hardcodedPatternIf ===
                "https://w3id.org/arco/ontology/location/time-indexed-typed-location" ? (
                    <SearchBarFilter
                        title={"Filter by address"}
                        onFilter={handleSearchFilter}
                    />
                ) : null}
                {hardcodedPatternIf ===
                "https://w3id.org/arco/ontology/location/time-indexed-typed-location" ? (
                    <PropertyFilter
                        title={"Filter by location type"}
                        properties={properties}
                        onFilter={handleLocationTypeFilter}
                    />
                ) : null}
                {hardcodedPatternIf ===
                "https://w3id.org/arco/ontology/denotative-description/measurement-collection" ? (
                    <SliderFilter
                        title={"Filter by number of measurements"}
                        onFilter={handleSliderFilterMeasurements}
                        domain={measRange}
                    />
                ) : null}
                {hardcodedPatternIf ===
                "https://w3id.org/arco/ontology/location/cultural-property-component-of" ? (
                    <SliderFilter
                        title={"Filter by parts"}
                        onFilter={handleSliderFilterParts}
                        domain={partRange}
                    ></SliderFilter>
                ) : null}
            </PatternMenu>
            <Graphin
                data={graph.toVisual()}
                layout={layoutHandler.name}
                ref={graphRef}
            ></Graphin>
        </div>
    );
}

// TODO: pass this to global theme useContext react mechanism
const graphContainerStyle = {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    margin: "auto",
};

import React, { useContext, useState, useEffect, useMemo, useRef } from "react";
import { Context } from "../Context";

import { Tick, Track, Handle, TooltipRail } from "./SliderComponents";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";

import { cloneDeep } from "lodash";

import { useAlert } from "../../hooks/ld-ui-hooks";

/**
 * node {
 *     id: uri
 *     startTime: startTime
 *     endTime: endTime
 * }
 */

TimeIntervalFilter.defaultProps = {
    id: "time",
    options: {},
};

export default function TimeIntervalFilter({ id = "time", options = {} }) {
    // listen to global context
    const [context, setContext] = useContext(Context);
    // read nodes from global context
    const nodes = context.nodes;
    const active = context.filterConfig[id].state;

    const showAlert = useAlert(context, setContext);

    // from the age of time
    const initialTime = -100000;
    const now = new Date();
    const currentTime = now.getFullYear();

    // if domain not in options compute it
    let domain = options.domain
        ? options.domain
        : useMemo(() => findMinMax(nodes), [nodes]);
    // if initial filtering range not in option set domain as state
    const [values, setValues] = useState(
        context.filterConfig[id].options.domain
            ? context.filterConfig[id].options.domain
            : domain
    );

    const onChange = (values) => {
        if (!Number.isNaN(values[0]) && !Number.isNaN(values[1])) {
            setValues(values);
        } else {
            setValues(domain);
        }
    };

    // run this effect only on component update
    const isMounted = useRef(false);
    useEffect(() => {
        if (isMounted) {
            let newRemovedNodes = cloneDeep(context.removedNodes);
            let newFilterConfig = cloneDeep(context.filterConfig);
            // if filter active it works
            if (active) {
                nodes.forEach((node) => {
                    if (!node.startTime && !node.endTime) {
                        // nodes without any information are meant to be
                        // data not collected or reported
                        // set them to false for this filter
                        let nodeState = newRemovedNodes.get(node.id);
                        nodeState.set(id, false);
                    } else if (!node.startTime) {
                        // Handle nodes with missing startTime
                        // we consider as if it is since ever
                        //
                        // get node in map
                        let nodeState = newRemovedNodes.get(node.id);
                        if (
                            values[0] >= initialTime &&
                            values[1] <= node.endTime
                        ) {
                            // node inside time interval set true
                            nodeState.set(id, true);
                        } else {
                            // node not in range set false
                            nodeState.set(id, false);
                        }
                    } else if (!node.endTime) {
                        // Handle nodes with missing endTime
                        // we consider as if it is today
                        //
                        // get node in map
                        let nodeState = newRemovedNodes.get(node.id);
                        if (
                            values[0] >= node.startTime &&
                            values[1] <= currentTime
                        ) {
                            // node inside time interval set true
                            nodeState.set(id, true);
                        } else {
                            // node not in range set false
                            nodeState.set(id, false);
                        }
                    } else {
                        // Handle nodes with startTime and endTime defined
                        //
                        // get node in map
                        let nodeState = newRemovedNodes.get(node.id);
                        if (
                            values[0] >= node.startTime &&
                            values[1] <= node.endTime
                        ) {
                            // node inside time interval set true
                            nodeState.set(id, true);
                        } else {
                            // node not in range set false
                            nodeState.set(id, false);
                        }
                    }
                });
            } else {
                // filter inactive
                // every node is true on this filter key
                // this filter hasn't effect on nodes
                nodes.forEach((node) => {
                    let nodeState = newRemovedNodes.get(node.id);
                    nodeState.set(id, true);
                });
            }
            newFilterConfig[id].options.domain = values;
            setContext({
                ...context,
                removedNodes: newRemovedNodes,
                filterConfig: newFilterConfig,
            });
        } else {
            isMounted.current = true;
        }
    }, [values, active]);

    useEffect(() => {
        // launch message just if filter is active
        if (active) {
            showAlert();
        }
    }, [context.removedNodes]);

    return nodes.length !== 0 ? (
        <div style={{ height: 40, width: "100%", marginTop: 20 }}>
            <Slider
                mode={1}
                step={1}
                domain={domain}
                rootStyle={sliderStyle}
                onChange={onChange}
                values={values}
            >
                <Rail>{(railProps) => <TooltipRail {...railProps} />}</Rail>
                <Handles>
                    {({ handles, getHandleProps }) => (
                        <div className="slider-handles">
                            {handles.map((handle) => (
                                <Handle
                                    key={handle.id}
                                    handle={handle}
                                    domain={domain}
                                    getHandleProps={getHandleProps}
                                />
                            ))}
                        </div>
                    )}
                </Handles>
                <Tracks left={false} right={false}>
                    {({ tracks, getTrackProps }) => (
                        <div className="slider-tracks">
                            {tracks.map(({ id, source, target }) => (
                                <Track
                                    key={id}
                                    source={source}
                                    target={target}
                                    getTrackProps={getTrackProps}
                                />
                            ))}
                        </div>
                    )}
                </Tracks>
                <Ticks values={domain}>
                    {({ ticks }) => (
                        <div className="slider-ticks">
                            {ticks.map((tick) => (
                                <Tick
                                    key={tick.id}
                                    tick={tick}
                                    count={ticks.length}
                                />
                            ))}
                        </div>
                    )}
                </Ticks>
            </Slider>
        </div>
    ) : null;
}

function findMinMax(arr) {
    let min, max;
    for (let i = 1, len = arr.length; i < len; i++) {
        if (arr[i].startTime) {
            let s = Number.parseInt(arr[i].startTime);
            if (min === undefined) min = s;
            else min = s < min ? s : min;
        }
        if (arr[i].endTime) {
            let e = Number.parseInt(arr[i].endTime);
            if (max === undefined) max = e;
            else max = e > max ? e : max;
        }
    }
    return [min, max];
}

const sliderStyle = {
    margin: "5%",
    position: "relative",
    width: "90%",
};

const railStyle = {
    position: "absolute",
    width: "100%",
    height: 14,
    borderRadius: 7,
    cursor: "pointer",
    backgroundColor: "rgb(155,155,155)",
};

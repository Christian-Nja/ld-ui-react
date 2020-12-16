import React, { useState, useEffect, useContext, useMemo } from "react";

import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { Tick, Track, Handle } from "./SliderComponents";

import { Context } from "../Context";

import { cloneDeep } from "lodash";

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

SliderFilter.defaultProps = {
    options: {
        key: "slider",
    },
    valueKey: "occurences",
};

const MIN = 0;
const MAX = 1;

export default function SliderFilter({
    nodes,
    options = {
        key: "slider",
    },
    valueKey,
}) {
    // filter cannot work with one node
    if (nodes.length < 2) {
        return null;
    } else {
        // listen to local central state
        const [context, setContext] = useContext(Context);
        // if domain not in options compute it
        let domain = options.domain
            ? options.domain
            : useMemo(() => findMinMax(nodes, valueKey), [nodes]);
        // if initial filtering range not in option set domain as state
        const [values, setValues] = useState(
            options.initialRange ? options.initialRange : domain
        );

        const onChange = (values) => {
            setValues(values);
        };

        useEffect(() => {
            let newRemovedNodes = cloneDeep(context.removedNodes);
            nodes.forEach((node) => {
                // touch only nodes with time
                if (node[valueKey]) {
                    // get node in map
                    let nodeState = newRemovedNodes.get(node.id);
                    if (
                        node[valueKey] >= values[MIN] &&
                        node[valueKey] <= values[MAX]
                    ) {
                        // node inside time interval set true
                        nodeState.set(options.key, true);
                    } else {
                        // node not in range set false
                        nodeState.set(options.key, false);
                    }
                }
            });
            setContext({ ...context, removedNodes: newRemovedNodes });
        }, [values]);

        return (
            <div style={{ height: 40, width: "100%", marginTop: 20 }}>
                <Slider
                    mode={1}
                    step={1}
                    domain={domain}
                    rootStyle={sliderStyle}
                    onChange={onChange}
                    values={values}
                >
                    <Rail>
                        {({ getRailProps }) => (
                            <div style={railStyle} {...getRailProps()} />
                        )}
                    </Rail>
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
        );
    }
}

function findMinMax(arr, valueKey) {
    let min, max;
    for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i][valueKey]) {
            let n = Number.parseInt(arr[i][valueKey]);
            if (min === undefined) {
                min = n;
                max = n;
            } else {
                if (n < min) {
                    min = n;
                }
                if (n > max) {
                    max = n;
                }
            }
        }
    }
    return [min, max];
}

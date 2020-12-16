import React, { useContext, useState, useEffect, useMemo } from "react";
import { Context } from "../Context";

import { Tick, Track, Handle } from "./SliderComponents";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";

import { cloneDeep } from "lodash";

/**
 * node {
 *     id: uri
 *     startTime: startTime
 *     endTime: endTime
 * }
 */

TimeIntervalFilter.defaultProps = {
    options: {
        key: "time",
    },
};

export default function TimeIntervalFilter({
    nodes,
    options = {
        key: "time",
    },
}) {
    // listen to local central state
    const [context, setContext] = useContext(Context);
    // if domain not in options compute it
    let domain = options.domain
        ? options.domain
        : useMemo(() => findMinMax(nodes), [nodes]);
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
            if (node.startTime && node.endTime) {
                // get node in map
                let nodeState = newRemovedNodes.get(node.id);
                if (node.startTime >= values[0] && node.endTime <= values[1]) {
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

import React, { useState, useEffect, useContext, useMemo, useRef } from "react";

import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { Tick, Track, Handle, TooltipRail } from "./SliderComponents";

import { Context } from "../Context";

import { cloneDeep } from "lodash";

import { useAlert } from "../../hooks/ld-ui-hooks";

import Qty from "js-quantities";

const sliderStyle = {
    margin: "5%",
    position: "relative",
    width: "90%",
};

SliderFilter.defaultProps = {
    id: "slider",
    options: {},
    valueKey: "occurences",
};

const MIN = 0;
const MAX = 1;

export default function SliderFilter({
    id = "slider",
    options = {},
    valueKey,
    measurementUnit,
}) {
    let formatTicks = (d) => {
        return d;
    };
    if (measurementUnit) {
        formatTicks = (d) => {
            return Qty(`${d} ${measurementUnit}`).format("m");
        };
    }

    console.log("SLIDER FILTER MOUNTED");

    // listen to global context
    const [context, setContext] = useContext(Context);
    const showAlert = useAlert(context, setContext);

    // read nodes from global context
    const nodes = context.nodes;

    // filter cannot work with one node
    if (nodes.length < 2) {
        return null;
    } else {
        const active = context.filterConfig[id].state;

        // if domain not in options compute it
        let domain = options.domain
            ? options.domain
            : useMemo(() => findMinMax(nodes, valueKey), [nodes]);
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
            console.log(active);
            if (isMounted) {
                let newRemovedNodes = cloneDeep(context.removedNodes);
                let newFilterConfig = cloneDeep(context.filterConfig);
                // if filter active it works
                if (active) {
                    nodes.forEach((node) => {
                        // disable every node without the value key
                        if (!node[valueKey]) {
                            let nodeState = newRemovedNodes.get(node.id);
                            nodeState.set(id, false);
                        }
                        // touch only nodes with time
                        if (node[valueKey]) {
                            // get node in map
                            let nodeState = newRemovedNodes.get(node.id);
                            if (
                                node[valueKey] >= values[MIN] &&
                                node[valueKey] <= values[MAX]
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

        if (domain[MIN] < domain[MAX]) {
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
                            {(railProps) => (
                                <TooltipRail
                                    {...railProps}
                                    formatTooltip={formatTicks}
                                />
                            )}
                        </Rail>
                        {/* <Rail>
                             {({ getRailProps }) => (
                                <div style={railStyle} {...getRailProps()} />
                            )} 
                        </Rail> */}
                        <Handles>
                            {({ handles, getHandleProps }) => (
                                <div className="slider-handles">
                                    {handles.map((handle) => (
                                        <Handle
                                            key={handle.id}
                                            handle={handle}
                                            domain={domain}
                                            getHandleProps={getHandleProps}
                                            formatTooltip={formatTicks}
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
                                            format={formatTicks}
                                        />
                                    ))}
                                </div>
                            )}
                        </Ticks>
                    </Slider>
                </div>
            );
        } else return null;
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

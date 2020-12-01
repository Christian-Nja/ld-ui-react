import React, { useState, useEffect } from "react";

import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";

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

export default function SliderFilter({ domain, onFilter = (values) => {} }) {
    const [values, setValues] = useState(domain);

    const onChange = (values) => {
        setValues(values);
    };
    useEffect(() => {
        onFilter(values);
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

// *******************************************************
// HANDLE COMPONENT
// *******************************************************
const Handle = ({
    domain: [min, max],
    handle: { id, value, percent },
    getHandleProps,
}) => (
    <div
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{
            left: `${percent}%`,
            position: "absolute",
            marginLeft: "-11px",
            marginTop: "-6px",
            zIndex: 2,
            width: 24,
            height: 24,
            cursor: "pointer",
            borderRadius: "50%",
            boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#34568f",
        }}
        {...getHandleProps(id)}
    />
);

// *******************************************************
// TRACK COMPONENT
// *******************************************************

const Track = ({ source, target, getTrackProps }) => (
    <div
        style={{
            position: "absolute",
            height: 14,
            zIndex: 1,
            backgroundColor: "#7aa0c4",
            borderRadius: 7,
            cursor: "pointer",
            left: `${source.percent}%`,
            width: `${target.percent - source.percent}%`,
        }}
        {...getTrackProps()}
    />
);

// *******************************************************
// TICK COMPONENT
// *******************************************************
const Tick = ({ tick, count }) => (
    <div>
        <div
            style={{
                position: "absolute",
                marginTop: 14,
                width: 1,
                height: 5,
                backgroundColor: "rgb(200,200,200)",
                left: `${tick.percent}%`,
            }}
        />
        <div
            style={{
                position: "absolute",
                marginTop: 22,
                fontSize: 10,
                textAlign: "center",
                marginLeft: `${-(100 / count) / 2}%`,
                width: `${100 / count}%`,
                left: `${tick.percent}%`,
            }}
        >
            {tick.value}
        </div>
    </div>
);

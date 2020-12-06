import React, { useState, useEffect } from "react";

import { useBinaryState } from "../../hooks/ld-ui-hooks";

import InstanceFilter from "../../classes/InstanceFilter";
import { TimeSeries, TimeRange, TimeRangeEvent } from "pondjs";
import {
    Charts,
    ChartContainer,
    ChartRow,
    Brush,
    EventChart,
} from "react-timeseries-charts";

// find min time interval / find max
// ask tick count
//

export default function TimeIntervalFilter({ instances, onFilter }) {
    const instanceFilter = new InstanceFilter(instances);
    const timeIntervalInstances = instanceFilter.timeIntervalInstances();

    const intervals = timeIntervalInstances.map((instance) => {
        return instanceFilter.timeIntervalInstanceEventToDate(instance);
    });
    // sort order chronologically
    intervals.sort((a, b) => {
        return a.startTime - b.startTime;
    });

    //
    // Turn data into TimeSeries
    //
    const events = intervals.map(
        ({ startTime, endTime, ...data }) =>
            new TimeRangeEvent(new TimeRange(startTime, endTime), data)
    );

    const series = new TimeSeries({ name: "timeIntervals", events });

    //
    // Render event chart
    //

    function outageEventStyleFunc(event, state) {
        const width = event.get("duration") === 0 ? 5 : null; // assign a little width even if its punctual event
        switch (state) {
            case "normal":
                return {
                    fill: "#002bff",
                    opacity: 1,
                    // width: width,
                };
            case "hover":
                return {
                    fill: color,
                    opacity: 0.4,
                    // width: width,
                };
            case "selected":
                return {
                    fill: color,
                    minWidth: 5,
                };
            default:
            //pass
        }
    }

    const [timerange, setTimeRange] = useState(series.range());
    const [brushrange, setBrushRange] = useState(series.range());

    // Handles when the brush changes the timerange
    const handleTimeRangeChange = (timerange) => {
        if (timerange) {
            setBrushRange(timerange);
        } else setBrushRange(null);
    };

    const brushStyle = {
        boxShadow: "inset 0px 2px 5px -2px rgba(189, 189, 189, 0.75)",
        background: "green",
        paddingTop: 10,
    };

    useEffect(() => {
        const eventToViz = [];

        for (let event of series.events()) {
            const timerange = event.timerange();
            if (brushrange && brushrange.contains(timerange)) {
                eventToViz.push(event.get("event").instance);
            }
        }

        onFilter(eventToViz);
    }, [brushrange]);

    return (
        <div className="row">
            <div className="col-md-12">
                <ChartContainer
                    width={190}
                    timeRange={timerange}
                    onTimeRangeChanged={handleTimeRangeChange}
                    timeAxisStyle={{
                        axis: {
                            fill: "none",
                            stroke: "#C0C0C0",
                            pointerEvents: "none",
                        },
                        ticks: {
                            fill: "none",
                            stroke: "#C0C0C0",
                            pointerEvents: "none",
                        },
                        values: {
                            fill: "none",
                            stroke: "#C0C0C0",
                            pointerEvents: "none",
                        },
                    }} // format="month"
                    hideTimeAxis={true}
                    paddingLeft={10}
                    paddingRight={10}
                    maxTime={timerange.end()}
                    minTime={timerange.begin()}
                >
                    <ChartRow height="50">
                        <Brush
                            timeRange={brushrange}
                            allowSelectionClear
                            style={brushStyle}
                            onTimeRangeChanged={handleTimeRangeChange}
                        />
                        <Charts>
                            <EventChart
                                series={series}
                                size={45}
                                style={outageEventStyleFunc}
                                label={(e) => e.get("title")}
                            />
                        </Charts>
                    </ChartRow>
                </ChartContainer>
                <div
                    style={{
                        width: 175,
                        backgroundColor: "green",
                        height: 3,
                        marginLeft: 10,
                    }}
                ></div>
                <div
                    style={{
                        width: 175,
                        height: 3,
                        marginLeft: 10,
                    }}
                >
                    <div
                        style={{
                            float: "left",
                            marginTop: 2,
                        }}
                    >
                        {intervals[0].startTime.getFullYear()}
                    </div>
                    <div
                        style={{
                            float: "right",
                            marginTop: 2,
                        }}
                    >
                        {intervals[intervals.length - 1].endTime.getFullYear()}
                    </div>
                </div>
            </div>
        </div>
    );
}

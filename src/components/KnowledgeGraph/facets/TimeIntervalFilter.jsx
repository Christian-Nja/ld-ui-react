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

export default function TimeIntervalFilter({ instances, onFilter }) {
    const [open, handleOpen] = useBinaryState(true);

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
        const color = "#f1a340"; // blue
        const width = event.get("duration") === 0 ? 5 : null; // assign a little width even if its punctual event
        switch (state) {
            case "normal":
                return {
                    fill: "#002bff",
                    opacity: 1,
                    minWidth: 5,
                    height: 45,
                    width: width,
                };
            case "hover":
                return {
                    fill: color,
                    opacity: 0.4,
                    minWidth: 5,
                    width: width,
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
        console.log(timerange);
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

    console.log("timerange");
    console.log(timerange);
    console.log(intervals);

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
            </div>
        </div>
    );
}

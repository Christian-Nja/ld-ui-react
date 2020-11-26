import React, { useState } from "react";

import { Menu } from "semantic-ui-react";

import { useBinaryState } from "../../hooks/ld-ui-hooks";

import InstanceFilter from "../../classes/InstanceFilter";
import { TimeSeries, TimeRange, TimeRangeEvent } from "pondjs";
import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    LineChart,
    Resizable,
    BarChart,
    styler,
    Brush,
    EventChart,
} from "react-timeseries-charts";

export default function TimeIntervalFilter(props) {
    const [open, handleOpen] = useBinaryState(true);

    const instanceFilter = new InstanceFilter(props.instances);
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
                    opacity: 0.1,
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
        setBrushRange(timerange);
    };

    const brushStyle = {
        boxShadow: "inset 0px 2px 5px -2px rgba(189, 189, 189, 0.75)",
        background: "#FEFEFE",
        paddingTop: 10,
    };

    console.log("brushrange:", brushrange);
    for (let event of series.events()) {
        const timerange = event.timerange();
        if (brushrange.contains(timerange)) {
            console.log(
                `In the user selected interval (${brushrange.humanize()}) there is this event: ${timerange.humanize()}`
            );
        }
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <ChartContainer
                    timeRange={timerange}
                    onTimeRangeChanged={handleTimeRangeChange}
                    timeAxisStyle={{
                        axis: {
                            fill: "none",
                            stroke: "#C0C0C0",
                            pointerEvents: "none",
                        },
                        ticks: {},
                        values: {},
                    }}
                    //format="month"
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

// function TimeIntervalFilter(props) {
//     let intervals = [
//         {
//             startTime: new Date("1768"),
//             endTime: new Date("1790"),
//         },
//         {
//             startTime: new Date("1780"),
//             endTime: new Date("1780"),
//         },
//         {
//             startTime: new Date("1800"),
//             endTime: new Date("1830"),
//         },
//         {
//             startTime: new Date("1810"),
//             endTime: new Date("1820"),
//         },
//         {
//             startTime: new Date("1815"),
//             endTime: new Date("1820"),
//         },
//         {
//             startTime: new Date("1817"),
//             endTime: new Date("1821"),
//         },
//         {
//             startTime: new Date("1810"),
//             endTime: new Date("1820"),
//         },
//         {
//             startTime: new Date("1818"),
//             endTime: new Date("1820"),
//         },
//         {
//             startTime: new Date("1819"),
//             endTime: new Date("1820"),
//         },
//         {
//             startTime: new Date("1855"),
//             endTime: new Date("1860"),
//         },
//         {
//             startTime: new Date("1890"),
//             endTime: new Date("1900"),
//         },
//         {
//             startTime: new Date("1910"),
//             endTime: new Date("1930"),
//         },
//     ];

//     intervals = intervals.map((interval) => {
//         return {
//             startTime: interval.startTime,
//             endTime: interval.endTime,
//             duration: interval.endTime - interval.startTime,
//         };
//     });

//     // sort order chronologically
//     intervals.sort((a, b) => {
//         return a.startTime - b.startTime;
//     });

//     const events = intervals.map(
//         ({ startTime, endTime, ...data }) =>
//             new TimeRangeEvent(new TimeRange(startTime, endTime), data)
//     );
//     //{ name: "outages", events }
//     const series = new TimeSeries({ name: "outages", events });

//     //
//     // Render event chart
//     //

//     function outageEventStyleFunc(event, state) {
//         const color = "#f1a340"; // blue
//         const width = event.get("duration") === 0 ? 5 : null; // assign a little width even if its punctual event
//         switch (state) {
//             case "normal":
//                 return {
//                     fill: "#002bff",
//                     opacity: 0.1,
//                     minWidth: 5,
//                     height: 45,
//                     width: width,
//                 };
//             case "hover":
//                 return {
//                     fill: color,
//                     opacity: 0.4,
//                     minWidth: 5,
//                     width: width,
//                 };
//             case "selected":
//                 return {
//                     fill: color,
//                     minWidth: 5,
//                 };
//             default:
//             //pass
//         }
//     }

//     const [timerange, setTimeRange] = useState(series.range());
//     const [brushrange, setBrushRange] = useState(series.range());

//     // Handles when the brush changes the timerange
//     const handleTimeRangeChange = (timerange) => {
//         console.log(timerange);
//         setBrushRange(timerange);
//     };

//     const brushStyle = {
//         boxShadow: "inset 0px 2px 5px -2px rgba(189, 189, 189, 0.75)",
//         background: "#FEFEFE",
//         paddingTop: 10,
//     };

//     console.log("brushrange:", brushrange);
//     for (let event of series.events()) {
//         const timerange = event.timerange();
//         if (brushrange.contains(timerange)) {
//             console.log(
//                 `In the user selected interval (${brushrange.humanize()}) there is this event: ${timerange.humanize()}`
//             );
//         }
//     }

//     return (
//         <div className="row">
//             <div className="col-md-12">
//                 <ChartContainer
//                     timeRange={timerange}
//                     onTimeRangeChanged={handleTimeRangeChange}
//                     timeAxisStyle={{
//                         axis: {
//                             fill: "none",
//                             stroke: "#C0C0C0",
//                             pointerEvents: "none",
//                         },
//                         ticks: {
//                             fill: "none",
//                             stroke: "#C0C0C0",
//                             pointerEvents: "none",
//                         },
//                         values: {
//                             fill: "none",
//                             stroke: "#C0C0C0",
//                             pointerEvents: "none",
//                         },
//                     }}
//                     //format="month"
//                 >
//                     <ChartRow height="50">
//                         <Brush
//                             timeRange={brushrange}
//                             allowSelectionClear
//                             style={brushStyle}
//                             onTimeRangeChanged={handleTimeRangeChange}
//                         />
//                         <Charts>
//                             <EventChart
//                                 series={series}
//                                 size={45}
//                                 style={outageEventStyleFunc}
//                                 label={(e) => e.get("title")}
//                             />
//                         </Charts>
//                     </ChartRow>
//                 </ChartContainer>
//             </div>
//         </div>
//     );
// }

// import { TimeSeries, TimeRange, TimeRangeEvent } from "pondjs";
// import {
//     Charts,
//     ChartContainer,
//     ChartRow,
//     YAxis,
//     LineChart,
//     Resizable,
//     BarChart,
//     styler,
//     Brush,
//     EventChart,
// } from "react-timeseries-charts";

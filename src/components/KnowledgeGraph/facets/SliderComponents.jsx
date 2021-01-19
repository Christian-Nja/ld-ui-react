import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// import "./tooltip.css";

// *******************************************************
// TOOLTIP RAIL
// *******************************************************
const railStyle = {
    position: "absolute",
    width: "100%",
    transform: "translate(0%, -50%)",
    height: 40,
    cursor: "pointer",
    zIndex: 300,
    // border: '1px solid grey',
};

const railCenterStyle = {
    position: "absolute",
    width: "100%",
    transform: "translate(0%, -50%)",
    height: 14,
    borderRadius: 7,
    cursor: "pointer",
    pointerEvents: "none",
    backgroundColor: "rgb(155,155,155)",
};

export class TooltipRail extends Component {
    state = {
        value: null,
        percent: null,
    };

    onMouseEnter = () => {
        document.addEventListener("mousemove", this.onMouseMove);
    };

    onMouseLeave = () => {
        this.setState({ value: null, percent: null });
        document.removeEventListener("mousemove", this.onMouseMove);
    };

    onMouseMove = (e) => {
        const { activeHandleID, getEventData } = this.props;

        if (activeHandleID) {
            this.setState({ value: null, percent: null });
        } else {
            this.setState(getEventData(e));
        }
    };

    render() {
        const { value, percent } = this.state;
        const { activeHandleID, getRailProps } = this.props;

        return (
            <Fragment>
                {!activeHandleID && value ? (
                    <div
                        style={{
                            left: `${percent}%`,
                            position: "absolute",
                            marginLeft: "-11px",
                            marginTop: "-35px",
                        }}
                    >
                        <div className="tooltip">
                            <span className="tooltiptext">Value: {value}</span>
                        </div>
                    </div>
                ) : null}
                <div
                    style={railStyle}
                    {...getRailProps({
                        onMouseEnter: this.onMouseEnter,
                        onMouseLeave: this.onMouseLeave,
                    })}
                />
                <div style={railCenterStyle} />
            </Fragment>
        );
    }
}

TooltipRail.propTypes = {
    getEventData: PropTypes.func,
    activeHandleID: PropTypes.string,
    getRailProps: PropTypes.func.isRequired,
};

TooltipRail.defaultProps = {
    disabled: false,
};

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

export { Tick, Track, Handle };

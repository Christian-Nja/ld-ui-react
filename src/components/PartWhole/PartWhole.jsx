import React, { useEffect, useRef, useState } from "react";

import Depiction from "../Resource/Depiction";
import Resource from "../Resource/Resource";
import Label from "../Resource/Label";

import "./PartWhole.css";

// https://codesandbox.io/s/circles-76sfz?file=/src/App.js
// https://stackoverflow.com/a/62466233/12506641

/**
 * @typedef Resource
 * @property {string} uri the id of a resource
 */

/**
 * @description
 * @author Christian Colonna
 * @date 26-11-2020
 * @export
 * @param {{ parts : Resource[], whole : Resource }} { parts, whole }
 */
export default function PartWhole({
    parts,
    whole,
    onResourceClick = (e) => {},
    styles = {
        containerStyle: {
            width: 700,
        },
        littleItemStyle: {
            width: 100,
        },
        centerItemStyle: {
            width: 500,
        },
    },
}) {
    const circleContainer = useRef(null);

    const [depictionCount, setDepictionCount] = useState(0);

    useEffect(() => {
        let circle = circleContainer.current;
        const circleElements = circle.querySelectorAll(".circle");

        let angle = 360 - 90;
        let dangle = 360 / circleElements.length;

        for (let i = 0; i < circleElements.length; i++) {
            let circleElement = circleElements[i];
            angle += dangle;
            circleElement.style.transform = `rotate(${angle}deg) translate(${
                circle.clientWidth / 2
            }px) rotate(-${angle}deg)`;
        }
    }, [depictionCount]);

    const partWidth = styles.littleItemStyle.width;
    const wholeWidth = styles.containerStyle.width;
    const imgWidth = styles.centerItemStyle.width;

    const partStyle = {
        width: partWidth,
        height: partWidth,
    };

    const wholeContainerStyle = {
        width: wholeWidth,
        height: wholeWidth,
    };

    const centerStyle = {
        width: imgWidth,
        height: imgWidth,
        margin: "auto",
        /* top: 0; */
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

    const labelStyle = {
        // position: "relative",
        left: -partWidth / 2,
        top: partWidth,
    };

    const centerLabelStyle = {
        top: imgWidth - 50,
    };

    //  TODO change this to redux , to many calls! Or find a pattern to optimize callings!
    const onLoadedDepiction = () => {
        setDepictionCount(depictionCount + 1);
    };

    return (
        <div
            className="circular-container"
            ref={circleContainer}
            style={wholeContainerStyle}
            classes={"center"}
        >
            {parts.map((part) => {
                return (
                    <Resource
                        classes={"circle"}
                        style={partStyle}
                        onClick={() => {
                            onResourceClick(part.uri);
                        }}
                        depiction={
                            <Depiction
                                style={partStyle}
                                classes={"part-whole-depiction part-depiction"}
                                uri={part.uri}
                                placeholderImg={part.placeholder}
                                onLoadedDepiction={onLoadedDepiction}
                                label={
                                    <Label
                                        uri={part.uri}
                                        classes={"part-whole-label"}
                                        style={{
                                            ...labelStyle,
                                            ...defaultItemLabelStyle,
                                            ...styles.itemLabel,
                                        }}
                                    />
                                }
                            />
                        }
                    />
                );
            })}
            <div style={centerStyle}>
                <Resource
                    classes="center"
                    style={centerStyle}
                    onClick={() => {
                        onResourceClick(whole.uri);
                    }}
                    depiction={
                        <Depiction
                            style={centerStyle}
                            classes={"part-whole-depiction whole-depiction"}
                            uri={whole.uri}
                            placeholderImg={whole.placeholder}
                            onLoadedDepiction={onLoadedDepiction}
                            label={
                                <Label
                                    uri={whole.uri}
                                    classes="part-whole-whole-label"
                                    style={{
                                        ...centerLabelStyle,
                                        ...defaultCenterLabelStyle,
                                        ...styles.centerLabel,
                                    }}
                                />
                            }
                        />
                    }
                />
            </div>
        </div>
    );
}

const defaultItemLabelStyle = {
    minWidth: 300,
    backgroundColor: "white",
    border: "1px solid black",
    padding: 5,
};
const defaultCenterLabelStyle = {
    minWidth: 300,
    backgroundColor: "white",
    padding: 5,
    border: "1px solid black",
};

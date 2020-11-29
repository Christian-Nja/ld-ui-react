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
    onResourceClick = () => {
        console.log("click");
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

    //  TODO change this to redux , to many calls! Or find a pattern to optimize callings!
    const onLoadedDepiction = () => {
        setDepictionCount(depictionCount + 1);
    };

    return (
        <div
            className="circular-container"
            ref={circleContainer}
            style={wholeStyle}
        >
            {parts.map((part) => {
                return (
                    <Resource
                        classes={"circle"}
                        style={partStyle}
                        depiction={
                            <Depiction
                                onClick={onResourceClick}
                                style={partStyle}
                                classes={"depiction"}
                                uri={part.uri}
                                onLoadedDepiction={onLoadedDepiction}
                            />
                        }
                        label={
                            <Label
                                uri={part.uri}
                                classes={"label"}
                                style={labelStyle}
                            />
                        }
                    />
                );
            })}
            <Resource
                classes="center"
                style={wholeStyle}
                depiction={
                    <Depiction
                        onClick={onResourceClick}
                        style={wholeStyle}
                        classes={"depiction"}
                        uri={whole.uri}
                        onLoadedDepiction={onLoadedDepiction}
                    />
                }
                label={<Label uri={whole.uri} classes="label" />}
            />
        </div>
    );
}

const partWidth = 200;
const wholeWidth = 500;

const partStyle = {
    width: partWidth,
    height: partWidth,
};

const wholeStyle = {
    width: wholeWidth,
    height: wholeWidth,
};

const labelStyle = {
    position: "relative",
    left: -partWidth / 2,
};

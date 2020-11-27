import React, { useEffect, useRef } from "react";

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
export default function PartWhole({ parts, whole }) {
    const circleContainer = useRef(null);

    console.log(parts);

    useEffect(() => {
        let circle = circleContainer.current;
        const circleElements = circle.childNodes;

        let angle = 360 - 90;
        let dangle = 360 / circleElements.length;

        for (let i = 0; i < circleElements.length; i++) {
            let circleElement = circleElements[i];
            angle += dangle;
            circleElement.style.transform = `rotate(${angle}deg) translate(${
                circle.clientWidth / 2
            }px) rotate(-${angle}deg)`;
        }
    }, [parts, whole]);

    return (
        <div className="circular-container" ref={circleContainer}>
            {parts.map((part) => {
                return <div className="circle">{part.uri}</div>;
                // <Resource resource={part} classes={["circular"]} style={circularStyle}>
                //     <Depiction></Depiction>
                // </Resource>;
            })}
            <div className="center">{whole.uri}</div>
        </div>
    );
}

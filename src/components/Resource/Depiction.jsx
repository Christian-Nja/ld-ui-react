import React, { useState, useEffect } from "react";

const { namedNode } = require("@rdfjs/data-model");
import path from "../EndpointConfig";

export default function Depiction({
    uri,
    classes,
    onLoadedDepiction,
    onClick,
    style = {},
}) {
    const [depiction, setDepiction] = useState(null);

    const cProp = path.create({
        subject: namedNode(uri),
    });

    // run this effect if depiction is loaded
    if (onLoadedDepiction) {
        useEffect(() => {
            onLoadedDepiction();
        }, [depiction]);
    }

    if (!depiction) {
        (async function fetchDepiction() {
            const depiction = await cProp.depiction;
            setDepiction(depiction);
        })();
    }
    return depiction ? (
        <img
            onClick={onClick}
            src={depiction}
            className={classes}
            style={style}
        />
    ) : null;
}

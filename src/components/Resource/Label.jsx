import React, { useState } from "react";

const { namedNode } = require("@rdfjs/data-model");

import path from "../EndpointConfig";

export default function Label({ uri, classes, style = {} }) {
    const [label, setLabel] = useState(null);

    const cProp = path.create({
        subject: namedNode(uri),
    });

    if (!label) {
        (async function fetchLabel() {
            const label = await cProp.label.value;
            setLabel(label);
        })();
    }
    return label ? (
        <p className={classes} style={style}>
            {label}
        </p>
    ) : null;
}

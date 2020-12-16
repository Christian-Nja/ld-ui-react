import React, { useState, useEffect } from "react";

const { namedNode } = require("@rdfjs/data-model");

import path from "../EndpointConfig";

export default function Label({ uri, classes, style = {} }) {
    const [label, setLabel] = useState(null);

    const cProp = path.create({
        subject: namedNode(uri),
    });

    useEffect(() => {
        if (!label) {
            (async function fetchLabel() {
                const label = await cProp.label.value;
                setLabel(label);
            })();
        }
    }, []);

    return label ? (
        <div className={classes} style={style}>
            {label}
        </div>
    ) : null;
}

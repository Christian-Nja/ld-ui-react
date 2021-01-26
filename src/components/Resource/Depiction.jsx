import React, { useState, useEffect } from "react";

const { namedNode } = require("@rdfjs/data-model");
import path from "../EndpointConfig";

export default function Depiction({
    uri,
    classes,
    onLoadedDepiction,
    onClick,
    depiction = null,
    style = {},
    placeholderImg = "https://semantic-ui.com/images/wireframe/image.png",
}) {
    const [image, setImage] = useState(depiction);

    const cProp = path.create({
        subject: namedNode(uri),
    });

    // run this effect if depiction is loaded
    if (onLoadedDepiction) {
        useEffect(() => {
            onLoadedDepiction();
        }, [image]);
    }

    useEffect(() => {
        if (!image) {
            (async function fetchDepiction() {
                const image = await cProp.depiction;
                setImage(image);
            })();
        }
    }, []);

    return (
        <img
            onClick={onClick}
            src={image ? image : placeholderImg}
            className={classes}
            style={style}
        />
    );
}

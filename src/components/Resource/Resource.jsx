import React from "react";

export default function Resource({
    resource,
    style = {},
    classes,
    depiction,
    label,
    onClick,
}) {
    return (
        <div style={style} className={classes} onClick={onClick}>
            {depiction && depiction}
            {label && label}
        </div>
    );
}

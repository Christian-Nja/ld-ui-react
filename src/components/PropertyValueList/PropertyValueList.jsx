import React from "react";
import ReactList from "react-list";

import Label from "../Resource/Label";

import "./PropertyValueList.css";

export default function PropertyValueList({ properties = {}, title }) {
    const keys = Object.keys(properties);
    const renderItem = (index, key) => {
        const isLinked = properties[keys[index]].onClick ? true : false;

        return (
            <div
                key={key}
                className={`property-value-item ${
                    isLinked ? "property-value-item-ld" : ""
                }`}
                style={key % 2 == 0 ? { backgroundColor: "#f5f5f5" } : null}
            >
                <div style={{ minWidth: "fit-content", marginRight: 50 }}>
                    {keys[index]}
                </div>
                <div
                    onClick={
                        isLinked ? properties[keys[index]].onClick : () => {}
                    }
                    title={isLinked ? `Click to explore resource` : ""}
                >
                    {properties[keys[index]].uri ? (
                        <Label uri={properties[keys[index]].uri} />
                    ) : (
                        properties[keys[index]].label
                    )}
                </div>
            </div>
        );
    };

    return (
        <div>
            {title && (
                <h1
                    style={{
                        backgroundColor: "#4183c4",
                        fontFamily: "OpenSans-Regular",
                        fontSize: 18,
                        color: "#fff",
                        padding: 10,
                    }}
                >
                    {title}
                </h1>
            )}
            <div style={{ overflow: "auto" }}>
                <ReactList
                    itemRenderer={renderItem}
                    length={keys.length}
                    type="simple"
                />
            </div>
        </div>
    );
}

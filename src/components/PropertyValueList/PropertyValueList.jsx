import React from "react";
import ReactList from "react-list";

import Label from "../Resource/Label";

import "./PropertyValueList.css";

export default function PropertyValueList({ properties = {}, label = false }) {
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
                <div>{keys[index]}</div>
                <div
                    onClick={
                        isLinked ? properties[keys[index]].onClick : () => {}
                    }
                    title={isLinked ? `Click to explore resource` : ""}
                >
                    {label ? (
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
            <h1
                style={{
                    backgroundColor: "#36304a",
                    fontFamily: "OpenSans-Regular",
                    fontSize: 18,
                    color: "#fff",
                    padding: 10,
                    borderRadius: "10px 10px 0px 0px",
                }}
            >
                Information
            </h1>
            <div style={{ overflow: "auto", maxHeight: 400 }}>
                <ReactList
                    itemRenderer={renderItem}
                    length={keys.length}
                    type="uniform"
                />
            </div>
        </div>
    );
}

import React from "react";
import ReactList from "react-list";

import Label from "../Resource/Label";

import "./PropertyValueList.css";

export default function PropertyValueList({ properties = {}, title }) {
    const keys = Object.keys(properties);
    let groupIndex = 1,
        newGroupIndex,
        separatorBorder = "";
    const renderItem = (index, key) => {
        const isLinked = properties[keys[index]].onClick ? true : false;

        if (properties[keys[index]].index) {
            newGroupIndex = properties[keys[index]].index;
            separatorBorder = "";
            if (newGroupIndex && newGroupIndex !== groupIndex) {
                // separatorBorder = "1px solid #d4d4d5";
                separatorBorder = "1px solid grey";
                groupIndex++;
            }
        }

        return (
            <div
                key={key}
                className={`property-value-item ${
                    isLinked ? "property-value-item-ld" : ""
                }`}
                style={
                    key % 2 == 0
                        ? {
                              backgroundColor: "#f5f5f5",
                              borderTop: separatorBorder,
                          }
                        : null
                }
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
            <div
                style={{
                    overflow: "auto",
                    // border: "1px solid #d4d4d5",
                }}
            >
                <ReactList
                    itemRenderer={renderItem}
                    length={keys.length}
                    type="simple"
                />
            </div>
        </div>
    );
}

import React from "react";
import ReactList from "react-list";

import "./PropertyValueList.css";

export default function PropertyValueList({ properties = {} }) {
    const keys = Object.keys(properties);
    console.log(properties);
    console.log(keys);
    const renderItem = (index, key) => {
        return (
            <div
                key={key}
                className="property-value-item"
                style={key % 2 == 0 ? { backgroundColor: "#f5f5f5" } : null}
            >
                <div>{keys[index]}</div>
                <div>{properties[keys[index]]}</div>
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

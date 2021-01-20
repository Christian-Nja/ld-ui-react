import React, { useState, useEffect } from "react";
import ReactList from "react-list";

import "./List.css";
import { Icon } from "semantic-ui-react";

import { orderBy, fromPairs, map, filter } from "lodash";

const stringSimilarity = require("string-similarity");

export default function List({
    list,
    onItemClick = (node) => {},
    searchBarPlaceholder = "Search in the table",
    itemTooltip = null,
    threshold = 0.23,
    title,
}) {
    // keys will be used to render header and access node information
    let keys = list.length > 0 ? Object.keys(list[0]) : [];
    // remove id key from rendered elements
    keys.splice(keys.indexOf("id"), 1);

    const [inputValue, setInputValue] = useState("");

    const [nodes, setNodeList] = useState([]);
    const handleInput = (event) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        setNodeList([...list]);
    }, [list]);

    useEffect(() => {
        if (inputValue === "") {
            // reset if user clears search bar and array is empty
            setNodeList([...list]);
        }
        if (inputValue !== "") {
            // apply effect only after 3 seconds the user stopped typing
            const delayDebounceFn = setTimeout(() => {
                const result = stringSimilarity.findBestMatch(
                    inputValue.toLowerCase(),
                    list.map((node) => {
                        // concatenate list values inside label
                        // node.id will be used to split and create an index
                        let propsChain;
                        keys.forEach((k) => {
                            propsChain += ` ${node[k]}`;
                        });
                        propsChain = propsChain.toLowerCase();
                        return `${node.id} ${propsChain}`;
                    })
                );
                // if string exact match of a substring set ratings to 1
                result.ratings.forEach((r) => {
                    if (
                        r.target
                            .toLowerCase()
                            .includes(inputValue.toLowerCase())
                    ) {
                        r.rating = 1;
                    }
                });
                const index = fromPairs(
                    map(result.ratings, (x, i) => [
                        x.target.split(" ")[0],
                        x.rating,
                    ])
                );
                console.log("index");
                console.log(index);
                console.log("Filtering");
                const filtered = filter(list, (n) => {
                    console.log(n);
                    if (index[n.id] >= threshold) return n;
                });
                console.log("filtered");
                console.log(filtered);
                const sorted = orderBy(filtered, (x) => index[x.id], ["desc"]);
                console.log("ratings & sorted");
                console.log(result.ratings);
                console.log(sorted);
                setNodeList(sorted);
            }, 400);
            return () => clearTimeout(delayDebounceFn);
        }
    }, [inputValue]);

    const renderRow = (index, key) => {
        if (nodes.length > 0) {
            return (
                <div
                    title={itemTooltip}
                    key={key}
                    className="table-item body-row"
                    style={key % 2 == 0 ? { backgroundColor: "#f5f5f5" } : null}
                    onClick={() => {
                        console.log("On list click");
                        console.log(nodes[index]);
                        onItemClick(nodes[index]);
                    }}
                >
                    {keys.map((k) => {
                        if (nodes[index])
                            return (
                                <div className="body-cell">
                                    {nodes[index][k]}
                                </div>
                            );
                    })}
                </div>
            );
        }
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
                {title}
            </h1>
            <div>
                <Icon name="search" className="search-icon"></Icon>
                <input
                    className="search-item"
                    placeholder={searchBarPlaceholder}
                    onChange={handleInput}
                ></input>
            </div>
            <div className="table">
                <div className="header">
                    <div className="header-row">
                        {keys.map((k) => {
                            // get keys from first node
                            return <div className="header-cell">{k}</div>;
                        })}
                    </div>
                </div>
                <div className={"body"}>
                    <ReactList
                        // itemsRenderer={(items, ref) => renderTable(items, ref)}
                        itemRenderer={renderRow}
                        length={nodes.length}
                        type="variable"
                    />
                </div>
            </div>
        </div>
    );
}

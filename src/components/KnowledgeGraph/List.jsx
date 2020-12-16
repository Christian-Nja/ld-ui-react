import React, { useState, useEffect } from "react";
import ReactList from "react-list";

import "./List.css";
import { Icon } from "semantic-ui-react";

import { orderBy, fromPairs, map, filter } from "lodash";

const stringSimilarity = require("string-similarity");

// individual row render for ReactList items
// function renderRow(index, key) {
//     let entry = this.state.scores[index];
//     let userName = entry.userName;
//     let score = entry.score;
//     return (
//         <tr key={key}>
//             <td className="name">{userName}</td>
//             <td className="score">{score}</td>
//         </tr>
//     );
// }

export default function List({
    graph,
    onItemClick = (node) => {},
    searchBarPlaceholder = "Search an item",
    itemTooltip = null,
    threshold = 0.23,
    tableFormatter,
}) {
    // keys will be used to render header and access node information
    const keys =
        graph.nodes.length > 0
            ? Object.keys(graph.nodes[0].toCustomNode(tableFormatter))
            : [];

    const [inputValue, setInputValue] = useState("");

    const [nodes, setNodeList] = useState([]);
    const handleInput = (event) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        setNodeList([...graph.nodes]);
    }, [graph.nodes]);

    useEffect(() => {
        if (inputValue === "") {
            // reset if user clears search bar and array is empty
            setNodeList([...graph.nodes]);
        }
        if (inputValue !== "") {
            // apply effect only after 3 seconds the user stopped typing
            const delayDebounceFn = setTimeout(() => {
                const result = stringSimilarity.findBestMatch(
                    inputValue,
                    graph.nodes.map((node) => {
                        return node.label;
                    })
                );
                const index = fromPairs(
                    map(result.ratings, (x, i) => [x.target, x.rating])
                );
                const filtered = filter(graph.nodes, (n) => {
                    if (index[n.label] >= threshold) return n;
                });
                const sorted = orderBy(filtered, (x) => index[x.label], [
                    "desc",
                ]);
                console.log(result.ratings);
                setNodeList(sorted);
            }, 400);
            return () => clearTimeout(delayDebounceFn);
        }
    }, [inputValue]);

    const renderRow = (index, key) => {
        return (
            <div
                title={itemTooltip}
                key={key}
                className="table-item body-row"
                style={key % 2 == 0 ? { backgroundColor: "#f5f5f5" } : null}
                onClick={() => {
                    onItemClick(nodes[index]);
                }}
            >
                {keys.map((k) => {
                    return (
                        <div className="body-cell">
                            {nodes[index].toCustomNode(tableFormatter)[k]}
                        </div>
                    );
                })}
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
                Instances
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
                        type="uniform"
                    />
                </div>
            </div>
        </div>
    );
}

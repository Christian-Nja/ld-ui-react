import React, { useState, useEffect } from "react";
import ReactList from "react-list";

import "./List.css";
import { Icon } from "semantic-ui-react";

import { orderBy, fromPairs, map, filter } from "lodash";

const stringSimilarity = require("string-similarity");

/**
 * You can modify max-height to change table height and eventually remove max-height in
 * .body css class. This will make an infinite table you can handle with pagination.
 *
 * This a nice example:
 *  https://datatables.net/extensions/searchpanes/examples/initialisation/viewTotal.html
 */

const highlightRow = (e) => {
    let columnClass = e.target.classList[1];
    let columnCells = document.getElementsByClassName(columnClass);
    for (let c of columnCells) {
        let isHeader = c.classList[0] === "header-cell";
        if (isHeader) {
            c.classList.add("header-column-hover");
        } else {
            c.classList.add("column-hover");
        }
    }
};

const clearRowLight = (e) => {
    let columnClass = e.target.classList[1];
    let columnCells = document.getElementsByClassName(columnClass);
    for (let c of columnCells) {
        let isHeader = c.classList[0] === "header-cell";
        if (isHeader) {
            c.classList.remove("header-column-hover");
        } else {
            c.classList.remove("column-hover");
        }
    }
};

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

    const [stickyWidth, setStickyWidth] = useState(null);

    useEffect(() => {
        window.onscroll = function () {
            myFunction();
        };

        // Get the header
        var header = document.getElementById("list-header");
        var table = document.getElementById("list-table");

        // Get the offset position of the navbar
        var sticky = header.offsetTop;

        // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
        function myFunction() {
            const width = table.clientWidth;
            if (window.pageYOffset > sticky) {
                header.classList.add("sticky-listbar");
                header.style.width = `${width}px`;
            } else {
                header.classList.remove("sticky-listbar");
                header.style.width = `100%`;
            }
        }
    }, []);

    const [inputValue, setInputValue] = useState("");

    const [nodes, setNodeList] = useState([]);
    const handleInput = (event) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        setNodeList([...list]);
    }, [list]);

    const [scrolledToElement, setScrolledToElement] = useState(false);

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
                const filtered = filter(list, (n) => {
                    if (index[n.id] >= threshold) return n;
                });
                const sorted = orderBy(filtered, (x) => index[x.id], ["desc"]);
                setNodeList(sorted);
            }, 400);
            return () => clearTimeout(delayDebounceFn);
        }
    }, [inputValue]);

    const renderRow = (index, key) => {
        let columnId = -1;
        if (nodes.length > 0) {
            return (
                <div
                    title={itemTooltip}
                    key={key}
                    className="table-item body-row "
                    // style={key % 2 == 0 ? { backgroundColor: "#f5f5f5" } : null}
                    onClick={() => {
                        window.sessionStorage.setItem(
                            "clickedListElement",
                            nodes[index].id
                        );
                        onItemClick(nodes[index]);
                    }}
                    id={nodes[index].id}
                >
                    {keys.map((k) => {
                        columnId++;
                        if (nodes[index])
                            return (
                                <div
                                    className={`body-cell column-cell-${columnId}`}
                                    onMouseEnter={highlightRow}
                                    onMouseOut={clearRowLight}
                                >
                                    {nodes[index][k] ? nodes[index][k] : "--"}
                                </div>
                            );
                    })}
                </div>
            );
        }
    };

    let headerColumnId = -1;

    useEffect(() => {
        const clickedListElement = window.sessionStorage.getItem(
            "clickedListElement"
        );
        const scrollToThis = document.getElementById(clickedListElement);
        let activateScrollInterval;
        if (scrollToThis) {
            if (!scrolledToElement) {
                activateScrollInterval = setInterval(() => {
                    console.log("Scrolled:", scrollToThis);
                    scrollToThis.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });
                    scrollToThis.classList.add("highlight-scroll");
                    setScrolledToElement(true);
                }, 500);
            }
        }
        if (activateScrollInterval) {
            return () => {
                clearInterval(activateScrollInterval);
            };
        }
    });

    return (
        <div style={{ fontFamily: "Montserrat-Medium" }}>
            <div
                id="scroll-to-top-button"
                onClick={scrollToTop}
                style={{
                    position: "absolute",
                    left: -80,
                    top: 350,
                    cursor: "pointer",
                }}
            >
                <div style={{ position: "fixed" }}>
                    <Icon name="arrow alternate circle up" size="big" />
                </div>
            </div>
            <div>
                <h1
                    style={{
                        backgroundColor: "#002933",
                        fontSize: 18,
                        color: "#fff",
                        padding: 10,
                        borderRadius: "10px 10px 0px 0px",
                        textTransform: "uppercase",
                    }}
                    id="scroll-to-top"
                >
                    {title}
                </h1>
                <div id="table-header-container">
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "baseline",
                        }}
                        id="search-container"
                    >
                        <div>
                            <Icon name="search" className="search-icon"></Icon>
                            <input
                                className="search-item"
                                placeholder={searchBarPlaceholder}
                                onChange={handleInput}
                            ></input>
                        </div>
                        <div
                            className="result-display"
                            style={{ marginRight: 50 }}
                        >
                            Showing 1 to {nodes.length} of {nodes.length}{" "}
                            resources
                        </div>
                    </div>
                    <div className="header" id="list-header">
                        <div className="header-row">
                            {keys.map((k) => {
                                headerColumnId++;
                                // get keys from first node
                                return (
                                    <div
                                        className={`header-cell column-cell-${headerColumnId}`}
                                    >
                                        {k}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="table" id="list-table">
                <div className={"body"}>
                    <ReactList
                        // itemsRenderer={(items, ref) => renderTable(items, ref)}
                        itemRenderer={renderRow}
                        length={nodes.length}
                        type="variable"
                        // scrollTo={
                        //     context.clickedListElement
                        //         ? context.clickedListElement
                        //         : null
                        // }
                    />
                </div>
            </div>
        </div>
    );
}

const scrollToTop = () => {
    console.log("Scroll to top");
    const top = document.getElementById("scroll-to-top");
    console.log(top);
    const elementPosition = top.offsetTop;
    window.scrollTo({ behavior: "smooth", top: elementPosition - 200 });
};

// var elementPosition = document.getElementById('id').offsetTop;

// window.scrollTo({
//   top: elementPosition - 10, //add your necessary value
//   behavior: "smooth"  //Smooth transition to roll
// });

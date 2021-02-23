import React, { useState, useEffect } from "react";
import ReactList from "react-list";

import "./List.css";
import { Icon } from "semantic-ui-react";

import SearchBarFilter from "../filters/facets/SearchBarFilter";
import { find, forEach } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";

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

const SAMPLE_RESOURCE = 0;

export default function List({
    list,
    title,
    itemTooltip = "click to explore resources",
    listContainerStyle = {},
}) {
    const resources = list;

    console.log("Where is resource with more than one mesure ????");

    const renderMoreData = () => {
        setResourcesToRenderCount(resourcesToRenderCount + 20);
    };
    const [resourcesToRenderCount, setResourcesToRenderCount] = useState(20);
    const resourcesToRender = resources.slice(0, resourcesToRenderCount);

    // keys will be used to render header and access node information
    const allPossiblekeys = resources[SAMPLE_RESOURCE]
        ? resources[SAMPLE_RESOURCE].getListKeys()
        : [];

    title = resources[SAMPLE_RESOURCE]
        ? resources[SAMPLE_RESOURCE].getListTitle()
        : "Instances";

    const keys = [];

    // WARNING THIS APPROACH MAY BE PERFORMANCE CRITIC
    // we parse list keys, only if there is at least one object with the key we show the row
    forEach(allPossiblekeys, (k) => {
        const thereIsOneDataWithKey = find(resources, (r) => {
            // if (typeof r[k] !== "undefined") console.log("Value:", r[k]);
            return typeof r[k] !== "undefined";
        });
        // console.log("Found data with key", k);
        // console.log(thereIsOneDataWithKey);
        if (thereIsOneDataWithKey) {
            keys.push(k);
        }
    });

    const headerLabels = resources[SAMPLE_RESOURCE]
        ? resources[SAMPLE_RESOURCE].getHeaderLabels(keys)
        : [];
    // remove id key from rendered elements

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

    //============================================== to remove

    const [scrolledToElement, setScrolledToElement] = useState(false);

    const renderRow = (index, key) => {
        let columnId = -1;
        if (resources.length > 0) {
            return (
                <div
                    title={itemTooltip}
                    key={key}
                    className="table-item body-row "
                    // style={key % 2 == 0 ? { backgroundColor: "#f5f5f5" } : null}
                    onClick={() => {
                        // window.sessionStorage.setItem(
                        //     resources[index].getUri()
                        // );
                        console.log("CLICKED LIST ITEM", resources[index]);
                        resources[index].listProperties.listItemClick();
                    }}
                    id={resources[index].getUri()}
                >
                    {keys.map((k) => {
                        columnId++;
                        if (resources[index])
                            return (
                                <div
                                    className={`body-cell column-cell-${columnId}`}
                                    onMouseEnter={highlightRow}
                                    onMouseOut={clearRowLight}
                                >
                                    {resources[index][k]
                                        ? resources[index][k]
                                        : "--"}
                                    {resources[index][`${k}MeasurementUnit`]
                                        ? " " +
                                          resources[index][
                                              `${k}MeasurementUnit`
                                          ]
                                        : null}
                                </div>
                            );
                    })}
                </div>
            );
        }
    };

    let headerColumnId = -1;

    // useEffect(() => {
    //     const clickedListElement = window.sessionStorage.getItem(
    //         "clickedListElement"
    //     );
    //     const scrollToThis = document.getElementById(clickedListElement);
    //     let activateScrollInterval;
    //     if (scrollToThis) {
    //         if (!scrolledToElement) {
    //             activateScrollInterval = setInterval(() => {
    //                 console.log("Scrolled:", scrollToThis);
    //                 scrollToThis.scrollIntoView({
    //                     behavior: "smooth",
    //                     block: "center",
    //                 });
    //                 scrollToThis.classList.add("highlight-scroll");
    //                 setScrolledToElement(true);
    //             }, 500);
    //         }
    //     }
    //     if (activateScrollInterval) {
    //         return () => {
    //             clearInterval(activateScrollInterval);
    //         };
    //     }
    // });

    return (
        <div
            style={{ ...defaultListContainerStyle, ...listContainerStyle }}
            id="list-container"
        >
            <div style={{ fontFamily: "Montserrat-Medium" }}>
                <div
                    id="scroll-to-top-button"
                    onClick={scrollToTop}
                    style={{
                        position: "absolute",
                        left: -80,
                        top: 400,
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
                            <SearchBarFilter />
                            <div
                                className="result-display"
                                style={{ marginRight: 50 }}
                            >
                                Showing 1 to {resources.length} of{" "}
                                {resources.length} resources
                            </div>
                        </div>
                        <div className="header" id="list-header">
                            <div className="header-row">
                                {headerLabels.map((h) => {
                                    headerColumnId++;
                                    // get keys from first node
                                    return (
                                        <div
                                            className={`header-cell column-cell-${headerColumnId}`}
                                        >
                                            {h}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table" id="list-table">
                    <div className={"body"}>
                        <InfiniteScroll
                            dataLength={resourcesToRender.length}
                            next={renderMoreData}
                            hasMore={
                                resourcesToRender.length < resources.length
                                    ? true
                                    : false
                            }
                            loader={<h4>Loading...</h4>}
                        >
                            <ReactList
                                // itemsRenderer={(items, ref) => renderTable(items, ref)}
                                itemRenderer={renderRow}
                                length={resourcesToRender.length}
                                type="variable"
                                // scrollTo={
                                //     context.clickedListElement
                                //         ? context.clickedListElement
                                //         : null
                                // }
                            />
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        </div>
    );
}

const defaultListContainerStyle = {
    marginLeft: "5%",
    marginRight: "2%",
    position: "absolute",
    top: 70,
    width: "90%",
};

const scrollToTop = () => {
    const top = document.getElementById("scroll-to-top");
    const elementPosition = top.offsetTop;
    window.scrollTo({ behavior: "smooth", top: elementPosition - 200 });
};

// var elementPosition = document.getElementById('id').offsetTop;

// window.scrollTo({
//   top: elementPosition - 10, //add your necessary value
//   behavior: "smooth"  //Smooth transition to roll
// });

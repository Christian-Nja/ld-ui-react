import React, { useState, useEffect } from "react";
import { Menu, Icon, Popup } from "semantic-ui-react";

import LayoutSelector from "../KnowledgeGraph/LayoutSelector";
import LayoutToggle from "../KnowledgeGraph/LayoutToggle";

import { useLayoutCtx } from "../../layout/LayoutCtx/useLayoutCtx";

import { useBinaryArrayState, useBinaryState } from "../hooks/ld-ui-hooks";
import Toggle from "react-toggle";

import "react-toggle/style.css"; // for ES6 modules

import "./PatternMenu.css";

import { some } from "lodash";
import { useFilterCtx } from "../../filters/FilterCtx/useFilterCtx";

const greenText = "#14d014";

export default function PatternMenu({
    showLayoutButton = true,
    children,
    style,
}) {
    const { layoutOptions, graphinLayoutHandler } = useLayoutCtx();

    const exampleMenuOpen = layoutOptions.exampleMenuOpen;

    const {
        setInvertedFilterStateById,
        filters,
        getFilterById,
    } = useFilterCtx();

    const menuStyle = {
        // position: "fixed",
        zIndex: 10,
        marginTop: 30,
    };

    return (
        <div
            style={{ ...menuStyle, ...style }}
            className={`menu-main ${"menu-main-over"}`}
        >
            <Menu vertical inverted>
                <Menu.Item className="menu-item filters-menu-button">
                    <div
                        style={{
                            color: "white",
                            fontSize: 18,
                        }}
                    >
                        <Icon name="filter" className="filters-icon" />
                        <div
                            className={`menu-main-title ${"menu-main-open"} filters-title`}
                        >
                            Filters
                        </div>
                    </div>
                    <Menu.Menu className={""}>
                        {children &&
                            React.Children.toArray(children).map((c, index) => {
                                let child = c;
                                // return filters
                                return (
                                    <Menu.Item
                                        key={index}
                                        className={`menu-item filter-item filter-${child.props.id}`}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                marginBottom: 5,
                                                paddingLeft: 30,
                                                marginTop: 10,
                                                marginBottom: 10,
                                            }}
                                        >
                                            <Popup
                                                trigger={
                                                    <div
                                                        className={
                                                            getFilterById(
                                                                child.props.id
                                                            ) &&
                                                            getFilterById(
                                                                child.props.id
                                                            ).isActive()
                                                                ? "active-filter filter-title"
                                                                : "filter-title"
                                                        }
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => {
                                                            setInvertedFilterStateById(
                                                                child.props.id
                                                            );
                                                        }}
                                                    >
                                                        {child.props.title}
                                                    </div>
                                                }
                                                mouseEnterDelay={500}
                                                on="hover"
                                                content="Enable/disable filter"
                                                position="top center"
                                            />
                                            <div
                                                className={
                                                    "toggle-help-container"
                                                }
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Popup
                                                    trigger={
                                                        <div>
                                                            <Toggle
                                                                id={
                                                                    child.props
                                                                        .id
                                                                }
                                                                checked={
                                                                    getFilterById(
                                                                        child
                                                                            .props
                                                                            .id
                                                                    ) &&
                                                                    getFilterById(
                                                                        child
                                                                            .props
                                                                            .id
                                                                    ).isActive()
                                                                }
                                                                onChange={() => {
                                                                    setInvertedFilterStateById(
                                                                        child
                                                                            .props
                                                                            .id
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                    }
                                                    mouseEnterDelay={500}
                                                    on="hover"
                                                    content="Enable/disable filter"
                                                    position="top center"
                                                />
                                                <div>
                                                    <Popup
                                                        trigger={
                                                            <Icon
                                                                name="help"
                                                                size="large"
                                                                circular
                                                            />
                                                        }
                                                        mouseEnterDelay={500}
                                                        on="hover"
                                                        content={
                                                            child.props
                                                                .description ||
                                                            "Filter Data"
                                                        }
                                                        position="right center"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <Menu.Menu
                                            className={`${child.props.id}-filter-button`}
                                        >
                                            {child}
                                        </Menu.Menu>
                                    </Menu.Item>
                                );
                            })}
                    </Menu.Menu>
                </Menu.Item>
                {showLayoutButton && (
                    <Menu.Item className="menu-item layouts-menu-button">
                        <div
                            style={{
                                fontSize: 18,
                            }}
                            // onClick={setLayoutButton}
                        >
                            <Icon name="picture" />
                            <div
                                className={`menu-main-title ${"menu-main-open"}`}
                            >
                                Layout
                            </div>
                        </div>
                        <Menu.Menu>
                            <LayoutToggle></LayoutToggle>
                        </Menu.Menu>
                    </Menu.Item>
                )}
                {showLayoutButton && layoutOptions.layout === "graph" && (
                    <LayoutSelector
                        value={graphinLayoutHandler.name}
                        onClick={(newLayout) => {
                            graphinLayoutHandler.setLayout(newLayout);
                        }}
                        menuOpen={exampleMenuOpen}
                    ></LayoutSelector>
                )}
            </Menu>
        </div>
    );
}

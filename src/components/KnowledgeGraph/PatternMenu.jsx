import React, { useContext } from "react";
import { Menu } from "semantic-ui-react";

import LayoutSelector from "./LayoutSelector";
import LayoutToggle from "./LayoutToggle";

import { useBinaryArrayState, useBinaryState } from "../hooks/ld-ui-hooks";
import Toggle from "react-toggle";
import "react-toggle/style.css"; // for ES6 modules

import "./PatternMenu.css";
import { Context } from "./Context";

import { cloneDeep } from "lodash";

const menuStyle = { position: "absolute", top: 70, left: 20, zIndex: 10 };

export default function PatternMenu(props) {
    const [context, setContext] = useContext(Context);

    const [open, setOpen] = useBinaryArrayState([]);
    const [layoutButton, setLayoutButton] = useBinaryState();
    const [filterButton, setFilterButton] = useBinaryState();

    return (
        <div style={menuStyle}>
            <Menu vertical inverted>
                {
                    <Menu.Item>
                        <div
                            style={{ cursor: "pointer" }}
                            onClick={setLayoutButton}
                        >
                            Layout
                        </div>
                        {layoutButton ? (
                            <Menu.Menu>
                                <LayoutToggle
                                    setLayoutOptions={props.setLayoutOptions}
                                    layoutOptions={props.layoutOptions}
                                ></LayoutToggle>
                            </Menu.Menu>
                        ) : null}
                    </Menu.Item>
                }
                {props.layoutOptions.graphLayout && (
                    <LayoutSelector
                        value={props.layoutHandler.name}
                        onClick={(newLayout) => {
                            props.layoutHandler.setLayout(newLayout);
                        }}
                    ></LayoutSelector>
                )}
                <Menu.Item>
                    <div
                        style={{ cursor: "pointer" }}
                        onClick={setFilterButton}
                    >
                        Filters
                    </div>
                    <Menu.Menu className={filterButton ? "" : "close-filter"}>
                        {props.children &&
                            React.Children.toArray(props.children).map(
                                (child, index) => {
                                    // return filters
                                    return (
                                        <Menu.Item key={index}>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    className={
                                                        context.filterConfig[
                                                            child.props.id
                                                        ].state
                                                            ? "active-filter"
                                                            : ""
                                                    }
                                                    onClick={() => {
                                                        setOpen(index);
                                                    }}
                                                >
                                                    {child.props.title}
                                                </div>
                                                <Toggle
                                                    id={child.props.id}
                                                    checked={
                                                        context.filterConfig[
                                                            child.props.id
                                                        ].state
                                                    }
                                                    onChange={(e) => {
                                                        const filterKey =
                                                            e.target.id;
                                                        let newFilterConfig = cloneDeep(
                                                            context.filterConfig
                                                        );
                                                        newFilterConfig[
                                                            filterKey
                                                        ].state = !newFilterConfig[
                                                            filterKey
                                                        ].state;
                                                        console.log(
                                                            newFilterConfig
                                                        );
                                                        setContext({
                                                            ...context,
                                                            filterConfig: newFilterConfig,
                                                        });
                                                    }}
                                                />
                                            </div>
                                            <Menu.Menu
                                                className={
                                                    open.includes(index)
                                                        ? `${child.props.id}-filter-button`
                                                        : `${child.props.id}-filter-button close-filter`
                                                }
                                            >
                                                {child}
                                            </Menu.Menu>
                                        </Menu.Item>
                                    );
                                }
                            )}
                    </Menu.Menu>
                </Menu.Item>
                {/* <TimeIntervalFilter
                    instances={props.instances}
                    setInstancesToVisualize={props.setInstancesToVisualize}
                ></TimeIntervalFilter> */}
                {/* {props.selectedNodes ? (
                    <Menu.Item>
                        Selected
                        <Menu.Menu>
                            {props.selectedNodes.map((selected, key) => {
                                return (
                                    <Menu.Item key={key}>
                                        {getURILabel(selected)}
                                    </Menu.Item>
                                );
                            })}
                        </Menu.Menu>
                    </Menu.Item>
                ) : null} */}
            </Menu>
            {/* {props.selectedNodes ? (
                <InstancesButton
                    getInstances={props.getInstances}
                    selectedNodes={props.selectedNodes}
                ></InstancesButton>
            ) : null} */}
        </div>
    );
}

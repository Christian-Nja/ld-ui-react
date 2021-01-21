import React, { useContext, useState, useEffect } from "react";
import { Menu, Message, Icon } from "semantic-ui-react";

import HelpIcon from "./HelpIcon";
import DropdownIcon from "./DropdownIcon";

import LayoutSelector from "./LayoutSelector";
import LayoutToggle from "./LayoutToggle";

import {
    useBinaryArrayState,
    useBinaryState,
    useHelp,
} from "../hooks/ld-ui-hooks";
import Toggle from "react-toggle";

import "react-toggle/style.css"; // for ES6 modules

import "./PatternMenu.css";
import { Context } from "./Context";

import { cloneDeep } from "lodash";

const greenText = "#14d014";

export default function PatternMenu(props) {
    const [context, setContext] = useContext(Context);
    const filterHelp =
        "Click here to open filter panel. Every filter can be active or inactive. When active it will filter out all KG nodes outside of the filter range. Nodes without  ";
    const setHelp = useHelp(context, setContext, filterHelp);

    const [open, setOpen] = useBinaryArrayState([]);
    const [layoutButton, setLayoutButton] = useBinaryState();
    const [filterButton, setFilterButton] = useBinaryState();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (layoutButton) {
            setLayoutButton();
        }
    }, [menuOpen]);

    useEffect(() => {
        if (filterButton) {
            setFilterButton();
        }
    }, [menuOpen]);

    // we use this state variable to launch a callback opening the filter item menu
    // resulting behaviour: when activating a filter it's menu item regulator is also open
    const [lastActivatedFilter, setLastActivatedFilter] = useState(false);

    const menuStyle = {
        position: "absolute",
        top: 70,
        left: 0,
        zIndex: 10,
    };

    useEffect(() => {
        if (lastActivatedFilter) {
            // filtering
            let newFilterConfig = cloneDeep(context.filterConfig);
            newFilterConfig[
                lastActivatedFilter.filterKey
            ].state = !newFilterConfig[lastActivatedFilter.filterKey].state;
            setContext({
                ...context,
                filterConfig: newFilterConfig,
            });
        }
    }, [lastActivatedFilter]);
    useEffect(() => {
        if (lastActivatedFilter) {
            // filter active
            if (!lastActivatedFilter.state) {
                if (open.includes(lastActivatedFilter.filterId)) {
                    // regulator open
                    // do nothing
                } else {
                    setOpen(lastActivatedFilter.filterId);
                }
            }
            // filter not active
            if (lastActivatedFilter.state) {
                if (open.includes(lastActivatedFilter.filterId)) {
                    // regulator open
                    // close it
                    setOpen(lastActivatedFilter.filterId);
                } else {
                }
            }
        }
    }, [lastActivatedFilter]);

    // check if some filter is active and modify menu UI
    // signalling user by green color or message
    const isSomeFilterActive = Object.keys(context.filterConfig).some((k) => {
        console.log(k);
        return context.filterConfig[k].state === true;
    });

    return (
        <div
            style={menuStyle}
            className={`menu-main ${menuOpen ? "menu-main-over" : ""}`}
            onMouseOver={() => {
                setMenuOpen(true);
            }}
            onMouseLeave={() => {
                setMenuOpen(false);
            }}
        >
            <Menu vertical inverted>
                {
                    <Menu.Item className="menu-item">
                        <div
                            style={{
                                cursor: "pointer",
                                fontSize: 18,
                            }}
                            onClick={setLayoutButton}
                        >
                            <Icon name="picture" />
                            <div
                                className={`menu-main-title ${
                                    menuOpen ? "menu-main-open" : ""
                                }`}
                            >
                                Layout
                            </div>
                            <DropdownIcon
                                style={{
                                    transform: layoutButton
                                        ? null
                                        : "rotate(270deg)",
                                    position: "relative",
                                    cursor: "pointer",
                                    width: "fit-content",
                                    display: menuOpen ? "inline-block" : "none",
                                    float: "right",
                                }}
                                className={
                                    menuOpen
                                        ? "menu-dropdown menu-open-dropdown"
                                        : "menu-dropdown"
                                }
                            />
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
                        menuOpen={menuOpen}
                    ></LayoutSelector>
                )}
                <Menu.Item className="menu-item">
                    <div
                        style={{
                            cursor: "pointer",
                            color: isSomeFilterActive ? greenText : "white",
                            fontSize: 18,
                        }}
                        onClick={setFilterButton}
                    >
                        <Icon name="search" />
                        <div
                            className={`menu-main-title ${
                                menuOpen ? "menu-main-open" : ""
                            }`}
                        >
                            Filters
                        </div>
                        <DropdownIcon
                            style={{
                                transform: filterButton
                                    ? null
                                    : "rotate(270deg)",
                                position: "relative",
                                cursor: "pointer",
                                width: "fit-content",
                                display: menuOpen ? "inline-block" : "none",
                                float: "right",
                            }}
                            className={
                                menuOpen
                                    ? "menu-dropdown menu-open-dropdown"
                                    : "menu-dropdown"
                            }
                        />
                        <HelpIcon
                            style={{ position: "absolute", left: 130, top: 15 }}
                            onMouseEnter={() => {
                                console.log("Enter");
                                setHelp();
                            }}
                        />
                        {isSomeFilterActive && !filterButton ? (
                            <Message
                                className="menu-item-message"
                                success
                                size="small"
                            >
                                <Icon name="alarm" />
                                <Message.Content>
                                    There are active filters
                                </Message.Content>
                            </Message>
                        ) : null}
                    </div>
                    <Menu.Menu className={filterButton ? "" : "close-filter"}>
                        {props.children &&
                            React.Children.toArray(props.children).map(
                                (c, index) => {
                                    let child;
                                    if (React.isValidElement(c)) {
                                        child = React.cloneElement(c, {
                                            closeFilterMenuItem: () => {
                                                setOpen(index);
                                            },
                                        });
                                    }
                                    // return filters
                                    return (
                                        <Menu.Item
                                            key={index}
                                            className="menu-item filter-item"
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    alignItems: "center",
                                                    marginBottom: 5,
                                                    paddingLeft: 30,
                                                    marginTop: 10,
                                                    marginBottom: 10,
                                                }}
                                            >
                                                <DropdownIcon
                                                    style={{
                                                        transform: open.includes(
                                                            index
                                                        )
                                                            ? null
                                                            : "rotate(270deg)",
                                                        position: "relative",
                                                        width: "fit-content",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => {
                                                        setOpen(index);
                                                    }}
                                                />
                                                <div
                                                    className={
                                                        context.filterConfig[
                                                            child.props.id
                                                        ].state
                                                            ? "active-filter filter-title"
                                                            : "filter-title"
                                                    }
                                                    onClick={() => {
                                                        setOpen(index);
                                                    }}
                                                    style={{
                                                        cursor: "pointer",
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
                                                        // setLastToggledFilter
                                                        setLastActivatedFilter({
                                                            filterKey:
                                                                e.target.id,
                                                            filterId: index,
                                                            state: context
                                                                .filterConfig[
                                                                child.props.id
                                                            ].state
                                                                ? true
                                                                : false,
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

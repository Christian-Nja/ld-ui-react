import React from "react";
import { Menu } from "semantic-ui-react";

import LayoutSelector from "./LayoutSelector";
import LayoutToggle from "./LayoutToggle";

import { useBinaryArrayState, useBinaryState } from "../hooks/ld-ui-hooks";

const menuStyle = { position: "absolute", top: 70, left: 20, zIndex: 10 };

export default function PatternMenu(props) {
    const [open, setOpen] = useBinaryArrayState([]);
    const [layoutButton, setLayoutButton] = useBinaryState();

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
                {props.children &&
                    React.Children.toArray(props.children).map(
                        (child, index) => {
                            // return filters
                            return (
                                <Menu.Item>
                                    <div
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            setOpen(index);
                                        }}
                                    >
                                        {child.props.title}
                                    </div>
                                    {open.includes(index) ? (
                                        <Menu.Menu>{child}</Menu.Menu>
                                    ) : null}
                                </Menu.Item>
                            );
                        }
                    )}
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

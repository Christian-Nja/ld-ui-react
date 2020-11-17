import React from "react";
import { Menu } from "semantic-ui-react";

import LayoutSelector from "./LayoutSelector";

const menuStyle = { position: "absolute", top: 70, left: 20, zIndex: 10 };

export default function PatternMenu(props) {
    return (
        <div style={menuStyle}>
            <Menu vertical inverted>
                <LayoutSelector
                    value={props.layoutHandler.name}
                    onClick={(newLayout) => {
                        props.layoutHandler.setLayout(newLayout);
                    }}
                ></LayoutSelector>
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

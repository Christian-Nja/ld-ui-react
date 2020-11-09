/* eslint-disable no-undef */
import React, { useState } from "react";

import { Menu } from "semantic-ui-react";

import {
    TrademarkCircleOutlined,
    ChromeOutlined,
    BranchesOutlined,
    ApartmentOutlined,
    AppstoreOutlined,
    CopyrightCircleOutlined,
    CustomerServiceOutlined,
    ShareAltOutlined,
} from "@ant-design/icons";

const itemMap = [
    { name: "random ", icon: <TrademarkCircleOutlined /> },
    { name: "concentric", icon: <ChromeOutlined /> },
    { name: "circle", icon: <CopyrightCircleOutlined /> },
    { name: "force", icon: <BranchesOutlined /> },
    { name: "dagre", icon: <ApartmentOutlined /> },
    { name: "grid", icon: <AppstoreOutlined /> },
    { name: "radial", icon: <ShareAltOutlined /> },
];

export default function LayoutSelector(props) {
    const [opened, setOpened] = useState(false);

    const handleOpen = () => {
        let newOpened = !opened;
        setOpened(newOpened);
    };

    return (
        <div style={{ position: "absolute", top: 70, left: 20, zIndex: 10 }}>
            <Menu vertical inverted>
                <Menu.Item>
                    <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            handleOpen();
                        }}
                    >
                        Layouts
                    </div>
                    {opened ? (
                        <Menu.Menu>
                            {itemMap.map((item, key) => {
                                return (
                                    <Menu.Item
                                        key={key}
                                        onClick={() => {
                                            props.onClick(item.name);
                                        }}
                                    >
                                        {item.icon} {item.name}
                                    </Menu.Item>
                                );
                            })}
                        </Menu.Menu>
                    ) : null}
                </Menu.Item>
            </Menu>
        </div>
    );
}

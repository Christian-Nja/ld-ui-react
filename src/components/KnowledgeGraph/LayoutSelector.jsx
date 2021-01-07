/* eslint-disable no-undef */
import React, { useState } from "react";

import { useBinaryState } from "../hooks/ld-ui-hooks";

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
    const [open, handleOpen] = useBinaryState(false);

    return (
        <Menu.Item>
            <div
                style={{ cursor: "pointer" }}
                onClick={handleOpen}
                title={"Change graph disposition"}
            >
                Graph Layouts
            </div>
            {open ? (
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
    );
}

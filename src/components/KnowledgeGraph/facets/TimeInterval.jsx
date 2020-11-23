import React from "react";

import { Menu } from "semantic-ui-react";

import { useBinaryState } from "../../hooks/ld-ui-hooks";

export default function TimeInterval(props) {
    const [open, handleOpen] = useBinaryState(false);

    return (
        <Menu.Item>
            <div style={{ cursor: "pointer" }} onClick={handleOpen}>
                Time Interval
            </div>
            {open ? (
                <div>
                    <div>From: </div>
                    <div>To:</div>
                </div>
            ) : null}
        </Menu.Item>
    );
}

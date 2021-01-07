import React, { useState, useEffect } from "react";

import { Button } from "semantic-ui-react";

export default function LayoutToggle(props) {
    const [value, setValue] = useState(props.layoutOptions.currentLayout);
    useEffect(() => {
        props.setLayoutOptions({
            ...props.layoutOptions,
            currentLayout: value,
            graphLayout: value === "graph" ? true : false,
        });
    }, [value]);
    return (
        <div
            style={{
                color: "white",
                display: "flex",
                justifyContent: "space-evenly",
            }}
            title={"Switch layout"}
        >
            <Button.Group>
                <Button
                    active={value === "graph" ? true : false}
                    toggle={value === "graph" ? true : false}
                    onClick={() => {
                        setValue("graph");
                    }}
                >
                    Graph
                </Button>
                <Button.Or />
                <Button
                    active={value === "list" ? true : false}
                    toggle={value === "list" ? true : false}
                    onClick={() => {
                        setValue("list");
                    }}
                >
                    List
                </Button>
            </Button.Group>
        </div>
    );
}

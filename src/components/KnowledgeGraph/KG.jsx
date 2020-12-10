import React from "react";

import PatternMenu from "./PatternMenu";

import { useLayout } from "../hooks/ld-ui-hooks";

export default function KG({ menu = true }) {
    // pass this to PatternMenu component to have a panel to switch layouts
    const layoutHandler = useLayout();

    return (
        <div>
            Hello World
            {menu ? (
                <PatternMenu layoutHandler={layoutHandler}></PatternMenu>
            ) : null}
            {/* <Graphin
                data={graph.toVisual()}
                ref={graphRef}
                layout={layoutHandler.name}
                options={{
                    modes: {
                        default: [
                            {
                                type: "tooltip",
                                formatText(model) {
                                    const { label, id } = model;
                                    const text = `occurrences:<br/> ${model.data.occurences}`;
                                    return text;
                                },
                            },
                        ],
                    },
                }}
            >
                <ContextMenu></ContextMenu>
            </Graphin> */}
        </div>
    );
}

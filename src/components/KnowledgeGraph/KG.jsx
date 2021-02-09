import React, { useState, useEffect } from "react";

import { useLayoutCtx } from "../../layout/LayoutCtx/useLayoutCtx";
import PatternMenu from "../layout/PatternMenu";
import KnowledgeGraph from "../../classes/KnowledgeGraph";
import Resource from "../../";
import List from "./List";
import HelpBox from "./HelpBox";
import AlertBox from "./AlertBox";
import "./KG.css";

// a defined hook for graphin layout
import { useLayout } from "../hooks/ld-ui-hooks";

export default function KG({
    data = {
        graph: { nodes: [], edges: [] },
        list: [],
        nodes: [],
    },
    children,
    defaultLayoutOptions = {
        menu: true,
        help: true,
        tableLayout: false,
        graphLayout: true,
        currentLayout: "graph",
    },
}) {
    // pass this to PatternMenu component to have a panel to switch layouts
    const layoutHandler = useLayout();
    const { layoutOptions } = useLayoutCtx();

    return (
        <div style={appContainerStyle}>
            <AlertBox />
            {layoutOptions.help ? <HelpBox /> : null}
            <PatternMenu layoutHandler={layoutHandler}>
                {/* <PatternFilter /> */}
            </PatternMenu>
            {/* {layoutOptions.layout === "list" && (
                <List
                    itemTooltip={itemTooltip}
                    onItemClick={onItemClick}
                    list={filteredList}
                    title={listTitle ? listTitle : "Data"}
                ></List>
            )} */}
        </div>
    );
}

import React, { useRef } from "react";

// Graphin Components
import Graphin from "@antv/graphin";
import "@antv/graphin/dist/index.css"; // Don't forget to import css

import { useGraphinDoubleClick } from "../hooks/ld-ui-hooks";
import { useLayoutCtx } from "../../layout/LayoutCtx/useLayoutCtx";

export default function VisualGraph({ visualGraph }) {
    // graphRef for mix React virtual DOM and graphin imperative operation on DOM
    const graphRef = useRef(null);
    const { graphinLayoutHandler } = useLayoutCtx();

    useGraphinDoubleClick(graphRef, (node) => {
        node.graphinProperties.graphinPatternNodeDoubleClick();
    });

    return (
        <Graphin
            data={visualGraph}
            ref={graphRef}
            layout={graphinLayoutHandler.name}
            extend={{
                nodeShape: () => {
                    return [
                        {
                            name: "CustomNode",
                            render: renderCustomNodeShape,
                        },
                    ];
                },
            }}
            options={{
                //keyShapeZoom: 0.001,
                zoom: 0.7,
                fitView: true,
                fitViewPadding: [300, 300, 300, 200],
                modes: {
                    default: [
                        {
                            type: "tooltip",
                            formatText(model) {
                                const text = model.data.graphinProperties.onNodeOverTooltip(
                                    model
                                );
                                return text;
                            },
                        },
                    ],
                },
            }}
        ></Graphin>
    );
}

const renderCustomNodeShape = (node) => {
    const style = {
        ...node.style,
    };
    const badgeNumber = 0;

    return {
        shape: "CustomNode",
        shapeComponents: [
            {
                shape: "rect",
                attrs: {
                    id: "rect-container",
                    x: 0,
                    y: 0,
                    width: style.containerWidth,
                    height: style.containerWidth,
                    fill: style.containerFill,
                    stroke: style.containerStroke,
                    cursor: "pointer",
                    lineWidth: 2,
                    radius: style.containerWidth / 2,
                },
            },
            // {
            //     shape: "circle",
            //     attrs: {
            //         id: "badge",
            //         x: style.containerWidth,
            //         y: 0,
            //         r: style.badgeSize,
            //         fill: style.badgeFill,
            //         cursor: "pointer",
            //         lineWidth: 1,
            //     },
            // },
            // {
            //     shape: "text",
            //     attrs: {
            //         id: "badge-text",
            //         x: style.containerWidth,
            //         y: -4,
            //         text: badgeNumber,
            //         fontSize: 10,
            //         cursor: "pointer",
            //         fill: "#fff",
            //         textAlign: "center",
            //         textBaseline: "top",
            //     },
            // },
            {
                shape: "text",
                attrs: {
                    id: "text-desc",
                    text: node.data.label,
                    x: style.containerWidth / 2,
                    y: style.containerWidth * 1.1,
                    cursor: "pointer",
                    fontSize: style.fontSize,
                    fill: style.fontColor,
                    fontWeight: "lighter",
                    fontFamily: "Courier New",
                    textAlign: "center",
                    textBaseline: "top",
                },
            },
        ],
        state: {
            selected: {
                "rect-container": {
                    stroke: style.containerStroke,
                    fill: style.containerStroke,
                    animate: {
                        attrs: {
                            lineWidth: 6,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowBlur: 2,
                            shadowColor: "#fff",
                            repeat: false, // 循环
                        },
                        duration: 200,
                        easing: "easeCubic",
                        callback: null,
                        delay: 0,
                    },
                },
                "node-icon": {
                    fill: "#fff",
                },
                badge: {
                    lineWidth: 6,
                },
            },
        },
        // HIGHLITE CHANGE COLOR
        "highlight.dark": {
            "rect-container": {
                fill: style.dark,
                stroke: style.dark,
                lineWidth: 0,
            },
            "node-icon": {
                fill: style.dark,
            },
            "text-desc": {
                fill: "#eee",
            },
            badge: {
                fill: style.dark,
            },
            "badge-text": {
                fill: style.dark,
            },
        },
    };
};

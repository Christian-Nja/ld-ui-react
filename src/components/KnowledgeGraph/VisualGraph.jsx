import React, { useRef, useState } from "react";

// Graphin Components
import Graphin, { Behaviors, GraphinContext } from "@antv/graphin";
import "@antv/graphin/dist/index.css"; // Don't forget to import css

import { useGraphinDoubleClick } from "../hooks/ld-ui-hooks";
import { useLayoutCtx } from "../../layout/LayoutCtx/useLayoutCtx";
import { Tooltip } from "@antv/graphin-components";
import { Checkbox } from "semantic-ui-react";

export default function VisualGraph({ visualGraph = [] }) {
    // graphRef for mix React virtual DOM and graphin imperative operation on DOM
    const graphRef = useRef(null);
    const { graphinLayoutHandler } = useLayoutCtx();
    const [showTooltip, setShowTooltip] = useState(true);

    useGraphinDoubleClick(graphRef, (node) => {
        node.graphinProperties.graphinPatternNodeDoubleClick();
    });

    const { ActivateRelations } = Behaviors;

    const defaultLayout = {
        type: "graphin-force",
        preset: {
            type: "concentric",
        },
        animation: false,
        preventOverlap: true,
        defSpringLen: (_edge, source, target) => {
            // ** La lunghezza della molla di 200 viene restituita per impostazione predefinita * /
            // ** Se vuoi produrre un effetto di raggruppamento, puoi considerare di impostare dinamicamente la lunghezza iniziale del bordo in base al grado dei nodi su entrambi i lati del bordo: minore è il grado, più corto è il bordo * /
            // const nodeSize = 30;
            // const Sdegree = sorgente.dati.layout.laurea;
            // const Tdegree = target.dati.layout.laurea;
            // const minDegree = Math.min(Sdegree, Tdegree);
            // console.log(minDegree < 3 ? nodeSize * 5 : minDegree * nodeSize);
            return 280;
            // return minDegree < 3 ? nodeSize * 5 : minDegree * nodeSize ;
        },
    };

    return (
        <Graphin
            data={visualGraph}
            ref={graphRef}
            layout={{
                ...(graphinLayoutHandler && graphinLayoutHandler.type
                    ? graphinLayoutHandler.type
                    : defaultLayout),
            }}
        >
            {showTooltip && (
                <Tooltip
                    bindType="node"
                    style={{
                        width: 300,
                    }}
                >
                    <Tooltip.Node>
                        {(model) => {
                            if (model.data.type === "Class") {
                                return (
                                    <div>
                                        <span>
                                            <strong>Entity: </strong>
                                            {model.data.label}
                                        </span>
                                        <br />
                                        <br />
                                        <span>
                                            <strong>Description:</strong>{" "}
                                            {model.data.description}
                                        </span>
                                        <br />
                                        <br />
                                        <span>
                                            <strong>Relevance:</strong>{" "}
                                            {model.data.scaledCentralityScore.toFixed(
                                                2
                                            )}
                                        </span>
                                        <br />
                                        <br />
                                        <span>
                                            <i>
                                                Double click to view entities...
                                            </i>
                                        </span>
                                    </div>
                                );
                            }
                            if (model.data.type === "Pattern") {
                                return (
                                    <div>
                                        <span>
                                            <strong>View: </strong>
                                            {model.data.label}
                                        </span>
                                        <br />
                                        <br />
                                        <span>
                                            <strong>Description:</strong>{" "}
                                            {model.data.tooltipInfo}
                                        </span>
                                        <br />
                                        <br />
                                        <span>
                                            <strong>Occurences:</strong>{" "}
                                            {model.data.occurences}
                                        </span>
                                        <br />
                                        <br />
                                        <span>
                                            <i>
                                                Double click to view entities...
                                            </i>
                                        </span>
                                    </div>
                                );
                            }
                        }}
                    </Tooltip.Node>
                </Tooltip>
            )}
            <ActivateRelations trigger="click" />
            <div
                style={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    /* top: 0; */
                    margin: 20,
                    marginRight: 40,
                    marginBottom: 30,
                }}
            >
                <Checkbox
                    checked={showTooltip}
                    onChange={(e, data) => {
                        setShowTooltip(data.checked);
                    }}
                    label={<label>Show tooltip</label>}
                />
            </div>
        </Graphin>
    );
}

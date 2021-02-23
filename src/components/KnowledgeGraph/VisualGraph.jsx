import React, { useRef, useState } from "react";

// Graphin Components
import Graphin, { Behaviors, GraphinContext } from "@antv/graphin";
import "@antv/graphin/dist/index.css"; // Don't forget to import css

import { useGraphinDoubleClick } from "../hooks/ld-ui-hooks";
import { useLayoutCtx } from "../../layout/LayoutCtx/useLayoutCtx";
import { Tooltip } from "@antv/graphin-components";
import { Checkbox } from "semantic-ui-react";
import {
    safelyLoadShowTooltipFromSessionStorage,
    saveShowTooltipToSessionStorage,
} from "./sessionStorageTooltipHandlers";

export default function VisualGraph({ visualGraph = [] }) {
    // graphRef for mix React virtual DOM and graphin imperative operation on DOM
    const graphRef = useRef(null);
    const { graphinLayoutHandler } = useLayoutCtx();
    const [showTooltip, setShowTooltip] = useState(
        safelyLoadShowTooltipFromSessionStorage()
    );

    // command si mangia il node
    // qui il node prende l'azione da fare
    // DoubleClickOpenCommand.exec(node... altre dipendenze)

    // Route.goTo lo si ficca nel context dell'app (IRouter)
    // cioè l'app ha una dipendenza router : IRouter
    // è qui che si ficca la dipendenza con fluxible
    // l'implementazione del suo metodo goTo chiama navigateAction

    useGraphinDoubleClick(graphRef, (node) => {
        // routeDoubleClickCommand = new RouteDoubleClickCommand(new Route(node.url))
        // routeDoubleClickCommand.execute()   (execute(): this.route.goTo(node.url))
        node.graphinProperties.graphinPatternNodeDoubleClick();
    });

    // TOOOOP!
    //   routeDoubleClickCommand = new RouteDoubleClickCommand(new Route(node.url))
    //   onListDoubleClick(ICommand : doubleClickCommand) {
    //       doubleClickCommand().execute()

    // circleNode is the invoker (onClick)
    // the passed command is RouteDoubleClickCommand , it can be also, consoleLog command ...
    // receiver is Router
    // we can have a differen receiver for example Logger
    // receiver has a generic +action  that do ICommand.execute()
    //
    // VisualGraph (client)
    // Router (receiver)
    // can decide to enque commands, that is have a CommandQueue has dependency
    // this command queue for example can wait for ten command before call execute()

    // in this example:
    // useNodeDoubleClick(node) {
    //    queue.enque(ICommand)
    // }

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

    const nodeStateStyles = {
        status: {
            hover: {
                label: {
                    visible: false,
                },
            },
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
            nodeStateStyles={nodeStateStyles}
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
                    position: "fixed",
                    right: 0,
                    bottom: 0,
                    /* top: 0; */
                    margin: 20,
                    marginRight: 40,
                    marginBottom: 30,
                }}
                className="graph-tooltip-checkbox"
            >
                <Checkbox
                    checked={showTooltip}
                    onChange={(e, data) => {
                        setShowTooltip(data.checked);
                        saveShowTooltipToSessionStorage(data.checked);
                    }}
                    label={<label>Enable node explanations</label>}
                />
            </div>
        </Graphin>
    );
}

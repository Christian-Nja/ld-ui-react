import React, { useContext } from "react";

import { useBinaryState, useHelp } from "../hooks/ld-ui-hooks";

import { Context } from "./Context";
import TemporaryMessage from "./TemporaryMessage";

import { Icon } from "semantic-ui-react";
import { useEffect } from "react";

const msgStyle = {
    color: "black",
    size: 12,
    fontSize: "medium",
};

const SHAKING_INTERVAL = 1500;
let interval;
const shakeit = function (element) {
    // element.style.display = "block";
    var x = -1;
    interval = setInterval(function () {
        if (x == -1) {
            element.style.marginLeft = "3px";
        } else {
            switch (x) {
                case 0:
                    element.style.marginLeft = "-3px";
                    break;
                case 1:
                    element.style.marginLeft = "0px";
                    element.style.marginTop = "3px";
                    break;
                case 2:
                    element.style.marginTop = "-3px";
                    break;
                default:
                    element.style.marginTop = "0px";
                    clearInterval(interval);
            }
        }
        x++;
    }, 50);
};

export default function HelpBox() {
    // listen to local central state
    const [context, setContext] = useContext(Context);
    const [open, handleOpen] = useBinaryState(false);

    const outMessage =
        "This diagram shows the patterns contained in the knowledge graph and their relations. Each node corresponds to a pattern, the radius of the node indicates the size of pattern (number of instances of the pattern within the graph). Double click on a node to explore the instances of the patterns";
    const enterMessage =
        "Move over the blue question marks with the mouse. An help about the element they are closed too will be shown in this box. ";
    const setEnterHelp = useHelp(context, setContext, enterMessage);
    const setOutHelp = useHelp(context, setContext, outMessage);

    useEffect(() => {
        const helps = document.getElementsByClassName("with-help");
        if (open) {
            for (let h of helps) {
                h.classList.add("show-help");
            }
        } else {
            for (let h of helps) {
                h.classList.remove("show-help");
            }
        }
    }, [open]);

    useEffect(() => {
        // clean up if component unmount
        return () => {
            const helps = document.getElementsByClassName("with-help");
            for (let h of helps) {
                h.classList.remove("show-help");
            }
        };
    }, []);

    useEffect(() => {
        const toShake = document.getElementsByClassName("shakeit");
        if (toShake) {
            for (let s of toShake) {
                shakeit(s);
            }

            setInterval(function () {
                for (let s of toShake) {
                    shakeit(s);
                }
            }, SHAKING_INTERVAL);
        }
    }, []);

    const boxStyle = open
        ? {
              position: "absolute",
              top: 480,
              left: 40,
              zIndex: 10,
              cursor: "pointer",
              background: "white",
              opacity: 1,
              width: 400,
              height: 140,
              textAlign: "center",
              transition: 0.3,
              border: "2px solid #7f45e7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0px 20px",
              fontStyle: "italic",
          }
        : {
              position: "absolute",
              top: 580,
              left: 40,
              zIndex: 10,
              cursor: "pointer",
              background: "grey",
              opacity: 0.9,
              width: 100,
              height: 40,
              textAlign: "center",
              transition: 0.3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
          };

    return (
        <div
            onClick={handleOpen}
            style={boxStyle}
            onMouseEnter={() => {
                setEnterHelp();
            }}
            onMouseLeave={() => {
                setOutHelp();
            }}
        >
            {!open ? (
                <TemporaryMessage
                    message="Open this box to get help about the application"
                    style={{
                        color: "rgb(13, 60, 97)",
                        backgroundColor: "rgb(232, 244, 253)",
                        borderRadius: 4,
                        color: "rgb(13, 60, 97)",
                        position: "absolute",
                        top: -90,
                        left: 0,
                        width: 210,
                        fontWeight: "bolder",
                        padding: 20,
                    }}
                />
            ) : null}
            <div style={msgStyle}>
                {open ? (
                    context.help ? (
                        <div>
                            <i aria-hidden="true" class="info icon"></i>
                            {context.help}
                        </div>
                    ) : (
                        <div>
                            <i aria-hidden="true" class="info icon"></i>
                            Move the mouse over an element and, if there's a
                            usage hint it will be shown in this box
                        </div>
                    )
                ) : (
                    <Icon name="question circle"></Icon>
                )}
            </div>
        </div>
    );
}

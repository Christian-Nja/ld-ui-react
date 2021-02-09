import React from "react";

import { useBinaryState } from "../hooks/ld-ui-hooks";
import { useHelpCtx } from "../../filters/HelpCtx/useHelpCtx";

import TemporaryMessage from "./TemporaryMessage";

import { Icon } from "semantic-ui-react";
import { useEffect } from "react";

const msgStyle = {
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
    const { help, setHelp } = useHelpCtx();
    const [open, handleOpen] = useBinaryState(false);

    const outMessage =
        "What you see in this diagram is a knowledge graph containing X triples, Y entities, ... Each node contains information about them from a specific view. For example, in XX you can easily locate entities in space and time, in YY you can immediately know what are their dimensions and other structural information, etc. The dimension of a node tells you the amount of data of that kind that the KG contains. If you hover on a node, you will get an infobox telling what type of data and how many of them are there. Double click on a node to see its inside.";
    const enterMessage =
        "Move over the blue question marks with the mouse. An help about the element they are closed too will be shown in this box. ";
    const setEnterHelp = () => {
        setHelp({ message: enterMessage });
    };
    const setOutHelp = () => {
        setHelp({ message: outMessage });
    };

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
              position: "fixed",
              top: 480,
              left: 0,
              zIndex: 11,
              cursor: "pointer",
              background: "white",
              opacity: 1,
              width: 400,
              height: 140,
              textAlign: "center",
              transition: 0.3,
              //   border: "2px solid rgb(13, 60, 97)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0px 20px",
              fontStyle: "italic",
              backgroundColor: "rgb(232, 244, 253)",
              color: "rgb(13, 60, 97)",
              fontWeight: "bolder",
              borderRadius: 4,
          }
        : {
              position: "fixed",
              top: 650,
              left: 0,
              zIndex: 10,
              cursor: "pointer",
              background: "grey",
              opacity: 0.9,
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
            <div style={msgStyle}>
                {open ? (
                    help.message ? (
                        <div>
                            <i aria-hidden="true" class="info icon"></i>
                            {help.message}
                        </div>
                    ) : (
                        <div>
                            <i aria-hidden="true" class="info icon"></i>
                            Move the mouse over an element and, if there's a
                            usage hint it will be shown in this box
                        </div>
                    )
                ) : (
                    <TemporaryMessage
                        message={""}
                        style={{
                            color: "rgb(13, 60, 97)",
                            backgroundColor: "rgb(232, 244, 253)",
                            borderRadius: 4,
                            color: "rgb(13, 60, 97)",
                            position: "absolute",
                            top: -90,
                            left: 0,
                            width: "fit-content",
                            fontWeight: "bolder",
                            padding: 20,
                        }}
                    />
                )}
            </div>
        </div>
    );
}

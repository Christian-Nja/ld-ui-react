import React, { useState } from "react";
import Joyride, { STATUS, ACTIONS } from "react-joyride";

import { useLayoutCtx } from "../../layout/LayoutCtx/useLayoutCtx";

import TemporaryMessage from "./TemporaryMessage";

export default function HelpBox() {
    const { layoutOptions, setLayoutOptions } = useLayoutCtx();
    const [runTour, setRunTour] = useState(false);

    const startTourOnClick = (e) => {
        e.preventDefault();
        setRunTour(true);
    };

    const steps = [
        {
            content: (
                <div>
                    In this screen circles and rectangles represents categories.{" "}
                    <br />
                    Edges represents relations holding between categories.{" "}
                    <br /> Move the mouse over an element to get details about
                    the category. <br />
                    Double click on it to explore data of that kind. <br /> For
                    example in <strong>Cultural Property Measurements</strong>
                    you can find measurements about specific cultural
                    properties.
                </div>
            ),
            locale: { skip: <strong aria-label="skip">End tutorial</strong> },
            placement: "center",
            target: "body",
            hideCloseButton: true,
        },
        {
            target: ".menu-main",
            locale: { skip: <strong aria-label="skip">End tutorial</strong> },
            content: "Filter or interact with data through main panel!",
            spotlightClicks: true,
            styles: {
                options: {
                    zIndex: 10000,
                },
            },
            placement: "bottom",
            hideCloseButton: true,
        },
        {
            target: ".filters-menu-button",
            content: "Click here to see filters available",
            locale: { skip: <strong aria-label="skip">End tutorial</strong> },
            spotlightClicks: true,
            styles: {
                options: {
                    zIndex: 10000,
                },
            },
            placement: "right",
            hideCloseButton: true,
        },
        {
            target: ".layouts-menu-button",
            content: "Here you can change layout: network or table",
            locale: { skip: <strong aria-label="skip">End tutorial</strong> },
            spotlightClicks: true,
            styles: {
                options: {
                    zIndex: 10000,
                },
            },
            placement: "right",
            hideCloseButton: true,
        },
        {
            target: ".graph-layouts-menu-button",
            content: "Choose among different network layouts",
            locale: { skip: <strong aria-label="skip">End tutorial</strong> },
            spotlightClicks: true,
            styles: {
                options: {
                    zIndex: 10000,
                },
            },
            placement: "right",
            hideCloseButton: true,
        },
        {
            target: ".react-toggle",
            content: "Here you can enable or disable filters",
            locale: { skip: <strong aria-label="skip">End tutorial</strong> },
            spotlightClicks: true,
            styles: {
                options: {
                    zIndex: 10000,
                },
            },
            placement: "right",
            hideCloseButton: true,
        },
        {
            target: ".filter-occurences",
            content:
                "Regulate filters and active them to search inside knowledge graph",
            locale: { skip: <strong aria-label="skip">End tutorial</strong> },
            hideCloseButton: true,
        },
    ];

    const handleJoyrideCallback = (data) => {
        const { status, type, step, action, index } = data;

        console.log("JoyRide callback");
        console.log(data);

        const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

        if (finishedStatuses.includes(status)) {
            setRunTour(false);
        }
        // main menu

        if (step.target === ".filters-menu-button") {
            setLayoutOptions({
                ...layoutOptions,
                exampleFiltersOpen: true,
            });
        }

        if (step.target === ".layouts-menu-button") {
            setLayoutOptions({
                ...layoutOptions,
                exampleLayoutOpen: true,
            });
        }

        if (step.target === ".filter-occurences") {
            setLayoutOptions({
                ...layoutOptions,
                exampleFilterOccurencesOpen: true,
            });
        }

        if (step.target === ".menu-main") {
            setLayoutOptions({
                ...layoutOptions,
                exampleMenuOpen: true,
            });
        }

        if (action === "stop") {
            setLayoutOptions({
                ...layoutOptions,
                exampleMenuOpen: false,
                exampleLayoutOpen: false,
                exampleFiltersOpen: false,
                exampleFilterOccurencesOpen: false,
            });
        }

        console.groupCollapsed(type);
        console.groupEnd();
    };

    return (
        <div style={boxStyle}>
            <div style={msgStyle} onClick={startTourOnClick}>
                <Joyride
                    callback={handleJoyrideCallback}
                    steps={steps}
                    continuous={true}
                    run={runTour}
                    scrollToFirstStep={true}
                    showProgress={true}
                    showSkipButton={true}
                    styles={{
                        options: {
                            zIndex: 10000,
                        },
                    }}
                />
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
            </div>
        </div>
    );
}

const msgStyle = {
    size: 12,
    fontSize: "medium",
};
const boxStyle = {
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

// const outMessage =
// "What you see in this diagram is a knowledge graph containing X triples, Y entities, ... Each node contains information about them from a specific view. For example, in XX you can easily locate entities in space and time, in YY you can immediately know what are their dimensions and other structural information, etc. The dimension of a node tells you the amount of data of that kind that the KG contains. If you hover on a node, you will get an infobox telling what type of data and how many of them are there. Double click on a node to see its inside.";
// const enterMessage =
// "Move over the blue question marks with the mouse. An help about the element they are closed too will be shown in this box. ";
// const setEnterHelp = () => {
// setHelp({ message: enterMessage });
// };
// const setOutHelp = () => {
// setHelp({ message: outMessage });
// };

{
    /* {open ? (
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
                ) : ( */
}

// useEffect(() => {
// const toShake = document.getElementsByClassName("shakeit");
// if (toShake) {
// for (let s of toShake) {
// shakeit(s);
// }
//
// setInterval(function () {
// for (let s of toShake) {
// shakeit(s);
// }
// }, SHAKING_INTERVAL);
// }
// }, []);

// useEffect(() => {
//     const helps = document.getElementsByClassName("with-help");
//     if (open) {
//         for (let h of helps) {
//             h.classList.add("show-help");
//         }
//     } else {
//         for (let h of helps) {
//             h.classList.remove("show-help");
//         }
//     }
// }, [open]);

// useEffect(() => {
//     // clean up if component unmount
//     return () => {
//         const helps = document.getElementsByClassName("with-help");
//         for (let h of helps) {
//             h.classList.remove("show-help");
//         }
//     };
// }, []);

// const SHAKING_INTERVAL = 1500;
// let interval;
// const shakeit = function (element) {
//     // element.style.display = "block";
//     var x = -1;
//     interval = setInterval(function () {
//         if (x == -1) {
//             element.style.marginLeft = "3px";
//         } else {
//             switch (x) {
//                 case 0:
//                     element.style.marginLeft = "-3px";
//                     break;
//                 case 1:
//                     element.style.marginLeft = "0px";
//                     element.style.marginTop = "3px";
//                     break;
//                 case 2:
//                     element.style.marginTop = "-3px";
//                     break;
//                 default:
//                     element.style.marginTop = "0px";
//                     clearInterval(interval);
//             }
//         }
//         x++;
//     }, 50);
// };

// const boxStyle = open
// ? {
//       position: "fixed",
//       top: 480,
//       left: 0,
//       zIndex: 11,
//       cursor: "pointer",
//       background: "white",
//       opacity: 1,
//       width: 400,
//       height: 140,
//       textAlign: "center",
//       transition: 0.3,
//       //   border: "2px solid rgb(13, 60, 97)",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       padding: "0px 20px",
//       fontStyle: "italic",
//       backgroundColor: "rgb(232, 244, 253)",
//       color: "rgb(13, 60, 97)",
//       fontWeight: "bolder",
//       borderRadius: 4,
//   }
// :

import React, { useState } from "react";
import Joyride, { STATUS, ACTIONS } from "react-joyride";

import { useLayoutCtx } from "../../layout/LayoutCtx/useLayoutCtx";
import { useHelpCtx } from "../../filters/HelpCtx/useHelpCtx";

import TemporaryMessage from "./TemporaryMessage";

export default function HelpBox() {
    const { isFirstAccess } = useHelpCtx();
    const { layoutOptions, setLayoutOptions } = useLayoutCtx();
    const [runTour, setRunTour] = useState(isFirstAccess);

    const startTourOnClick = (e) => {
        e.preventDefault();
        setRunTour(true);
    };

    const steps = [
        {
            content: (
                <div>
                    This screen represents a knowledge graphs. <br />
                    Rectangles stands for Entities and circles represents vies
                    on this entities.
                    <br />
                    Edges represents relations holding between entities and
                    views
                    <br /> Move the mouse over circles and rectangles to get
                    more details about what kind of data are in the knowledge
                    graph. <br />
                    Double click on them to explore data of that kind. <br />{" "}
                    For example in{" "}
                    <strong>Cultural Property Measurements</strong>
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
            content: "Click here to open available filters",
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
            content: "Here you can change layout: graph or list",
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
            content: "Choose among different graph layouts",
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
            content: "Switch the toggle to enable or disable filters",
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
                "Regulate filters and activate them to search inside knowledge graph",
            locale: { skip: <strong aria-label="skip">End tutorial</strong> },
            hideCloseButton: true,
        },
        {
            target: ".help-button",
            content: "Click this button to run again the application tutorial",
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

import React, { useContext } from "react";

import { useBinaryState } from "../hooks/ld-ui-hooks";

import { Context } from "./Context";
import TemporaryMessage from "./TemporaryMessage";

import { Icon } from "semantic-ui-react";

const msgStyle = {
    color: "black",
    size: 12,
    fontSize: "medium",
};

export default function HelpBox() {
    // listen to local central state
    const [context, setContext] = useContext(Context);
    const [open, handleOpen] = useBinaryState(false);

    const boxStyle = open
        ? {
              position: "absolute",
              top: 480,
              left: 40,
              zIndex: 10,
              cursor: "pointer",
              background: "grey",
              opacity: 1,
              width: 400,
              height: 140,
              textAlign: "center",
              transition: 0.3,
              border: "1px solid #7f45e7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0px 20px",
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
        <div onClick={handleOpen} style={boxStyle}>
            {!open ? (
                <TemporaryMessage
                    message="Open the box to get help about application"
                    style={{
                        color: "rgb(13, 60, 97)",
                        backgroundColor: "rgb(232, 244, 253)",
                        borderRadius: 4,
                        color: "rgb(13, 60, 97)",
                        position: "absolute",
                        top: -90,
                        left: 0,
                        width: 200,
                        fontWeight: "bolder",
                        padding: 20,
                    }}
                />
            ) : null}
            <div style={msgStyle}>
                {open ? (
                    "Move the mouse over an element and, if there's a usage hint it will be shown in this box"
                ) : (
                    <Icon name="question circle"></Icon>
                )}
            </div>
        </div>
    );
}

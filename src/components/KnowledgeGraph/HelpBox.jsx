import React, { useContext } from "react";

import { useBinaryState } from "../hooks/ld-ui-hooks";

import { Context } from "./Context";

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
              opacity: 0.8,
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
              opacity: 0.5,
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
            <div style={msgStyle}>
                {open ? (
                    "Move hover an element and, if there's a usage hint it will be shown in this box"
                ) : (
                    <Icon name="question circle"></Icon>
                )}
            </div>
        </div>
    );
}

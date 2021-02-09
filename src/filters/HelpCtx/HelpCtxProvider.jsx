import React, { useState } from "react";
import { HelpCtx } from "./HelpCtx";

const defaulHelpMessage =
    "What you see in this diagram is a knowledge graph containing X triples, Y entities, ... Each node contains information about them from a specific view. For example, in XX you can easily locate entities in space and time, in YY you can immediately know what are their dimensions and other structural information, etc. The dimension of a node tells you the amount of data of that kind that the KG contains. If you hover on a node, you will get an infobox telling what type of data and how many of them are there. Double click on a node to see its inside.";

export default function HelpCtxProvider({ children }) {
    const [help, setHelp] = useState({
        message: defaulHelpMessage,
    });

    // set default filters
    return (
        <HelpCtx.Provider
            value={{
                help,
                setHelp,
            }}
        >
            {children || null}
        </HelpCtx.Provider>
    );
}

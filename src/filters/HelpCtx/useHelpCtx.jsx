import React, { useContext } from "react";
import { HelpCtx } from "./HelpCtx";

export function useHelpCtx() {
    const { help, setHelp } = useContext(HelpCtx);
    return {
        help,
        setHelp,
    };
}

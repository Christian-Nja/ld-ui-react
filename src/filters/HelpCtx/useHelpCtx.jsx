import React, { useContext, useEffect } from "react";
import { HelpCtx } from "./HelpCtx";

export function useHelpCtx() {
    const { isFirstAccess, saveFirstAccessToLocalStorage } = useContext(
        HelpCtx
    );
    useEffect(() => {
        saveFirstAccessToLocalStorage();
    }, []);
    return {
        isFirstAccess,
    };
}

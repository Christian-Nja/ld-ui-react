import React, { useContext, useEffect } from "react";
import { HelpCtx } from "./HelpCtx";

export function useHelpCtx(key) {
    const {
        safelyLoadTutorialCookieFromLocalStorage,
        saveFirstAccessToLocalStorage,
    } = useContext(HelpCtx);
    const isFirstAccess = safelyLoadTutorialCookieFromLocalStorage(key);
    useEffect(() => {
        saveFirstAccessToLocalStorage(key);
    }, []);
    return {
        isFirstAccess,
    };
}

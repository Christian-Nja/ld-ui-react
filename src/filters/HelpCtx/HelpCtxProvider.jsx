import React, { useState } from "react";
import { HelpCtx } from "./HelpCtx";

import {
    safelyLoadTutorialCookieFromLocalStorage,
    saveFirstAccessToLocalStorage,
} from "./tutorialCookieLocalStorageHandlers";

export default function HelpCtxProvider({ children }) {
    // set default filters
    return (
        <HelpCtx.Provider
            value={{
                saveFirstAccessToLocalStorage,
                safelyLoadTutorialCookieFromLocalStorage,
            }}
        >
            {children || null}
        </HelpCtx.Provider>
    );
}

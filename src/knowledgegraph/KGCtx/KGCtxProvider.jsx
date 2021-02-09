import React from "react";
import { KGCtx } from "./KGCtx";

export default function KGCtxProvider({ knowledgeGraph, children }) {
    return (
        <KGCtx.Provider value={{ knowledgeGraph }}>
            {children || null}
        </KGCtx.Provider>
    );
}

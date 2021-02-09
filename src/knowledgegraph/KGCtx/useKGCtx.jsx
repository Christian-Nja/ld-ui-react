import { useContext, useEffect } from "react";
import { KGCtx } from "./KGCtx";

export function useKGCtx() {
    const { knowledgeGraph } = useContext(KGCtx);

    return {
        knowledgeGraph,
    };
}

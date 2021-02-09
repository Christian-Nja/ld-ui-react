import React, { useState } from "react";
import { defineProp } from "../../utilities/generics";

/**
 * @description A hook for Graphin visualization library. Returns layout and a function to set layout.
 * @author Christian Colonna
 * @date 10-11-2020
 * @export
 * @param {Object} baseLayout
 * @param {string} [baseLayout.name=force]
 * @param {Object} [baseLayout.options={}]
 * @returns {Object} layoutHandler
 */
export default function useLayout(baseLayout) {
    const defaultLayout = defineProp(baseLayout, {
        name: "force",
        options: {
            animation: false,
            enableWorker: false,
            defSpringLen: (_edge, source, target) => {
                const nodeSize = 100;
                const Sdegree = source.data.layout?.degree;
                const Tdegree = target.data.layout?.degree;
                const minDegree = Math.min(Sdegree, Tdegree);
                return minDegree < 3 ? nodeSize * 5 : minDegree * nodeSize * 2;
            },
        },
    });
    const [layout, setLayout] = useState(defaultLayout);
    return {
        name: layout,
        setLayout: (newLayout) => {
            setLayout({
                ...layout,
                name: newLayout,
            });
        },
    };
}

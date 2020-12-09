import React, { useEffect, useState } from "react";

import { PieChart } from "react-minimal-pie-chart";
import { useBinaryArrayState } from "../../hooks/ld-ui-hooks";

/**
 * @description Filter data
 * @author Christian Colonna
 * @date 29-11-2020
 * @export
 * @param {[{ label : string, count : number, color : string, uri : string
 * }]} {Object[]} { properties } label: Property label, count: number of instances, color: color
 * @param {function} onFilter callback is called every time change filtered array,
 *                            it receives as argument the array of element filtered out.
 *                            Array contains index of the element as it passed as input to the filter.
 * @returns {JSX.Element}
 */
export default function SearchBarFilter({ onFilter = (filtered) => {} }) {
    const [search, setSearch] = useState("");

    useEffect(() => {
        onFilter(search);
    }, [search]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search address"
                value={search}
                style={{
                    margin: "auto",
                    display: "block",
                }}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    );
}

import React, { useState, useEffect } from "react";

import useFiltersMountedFlag from "../../filters/FilterCtx/useFiltersMountedFlag";

export default function FiltersMountedFlag({}) {
    const { setFiltersMountedFlag } = useFiltersMountedFlag();
    useEffect(() => {
        setFiltersMountedFlag(true);
    }, []);
    return null;
}

import React, { useState, useEffect } from "react";

import useFiltersMountedFlag from "../../filters/FilterCtx/useFiltersMountedFlag";

export default function FiltersMountedController({ mountedFilters }) {
    const { setFiltersMountedFlag } = useFiltersMountedFlag();
    useEffect(() => {
        setFiltersMountedFlag(mountedFilters || false);
    }, []);
    return null;
}

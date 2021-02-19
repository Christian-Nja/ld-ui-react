import React, { useEffect, useLayoutEffect } from "react";
import { useFilterCtx } from "./useFilterCtx";
import { useAlertCtx } from "../AlertCtx/useAlertCtx";

export default function useFilter(id, options) {
    const {
        filters,
        getFilterById,
        setNewFilter,
        setFilterOptionsById,
        setInvertedFilterStateById,
    } = useFilterCtx();
    const filter = getFilterById(id);

    // show alert green message on filter change
    const { showAlert } = useAlertCtx();
    useEffect(() => {
        if (filter && filter.isActive()) {
            showAlert();
        }
    }, [filters]);

    // if no filter we mount it
    useEffect(() => {
        if (!filter) {
            setNewFilter(id, options);
        }
    }, []);
    const setFilterOptions = (options) => {
        setFilterOptionsById(id, options);
    };
    const setInvertedFilterState = () => {
        setInvertedFilterStateById(id);
    };
    return { filter, setFilterOptions, setInvertedFilterState };
}

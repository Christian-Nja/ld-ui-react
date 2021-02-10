import { useContext } from "react";
import { FilterCtx } from "./FilterCtx";

export function useFilterCtx() {
    const {
        filters,
        filtersMountedFlag,
        setFiltersMountedFlag,
        setNewFilter,
        setInvertedFilterStateById,
        setFilterOptionsById,
        getFilterById,
        setNewNonPersistentFilter,
        deleteNonPersistentFilter,
    } = useContext(FilterCtx);
    return {
        filters,
        setNewFilter,
        filtersMountedFlag,
        setFiltersMountedFlag,
        setInvertedFilterStateById,
        getFilterById,
        setFilterOptionsById,
        setNewNonPersistentFilter,
        deleteNonPersistentFilter,
    };
}

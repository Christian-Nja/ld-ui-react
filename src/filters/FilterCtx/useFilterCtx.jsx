import { useContext } from "react";
import { FilterCtx } from "./FilterCtx";

export function useFilterCtx() {
    const {
        filters,
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
        setInvertedFilterStateById,
        getFilterById,
        setFilterOptionsById,
        setNewNonPersistentFilter,
        deleteNonPersistentFilter,
    };
}

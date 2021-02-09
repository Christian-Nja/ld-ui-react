import React from "react";
import { useState } from "react/cjs/react.development";
import { FilterCtx } from "./FilterCtx";
import { clone, remove } from "lodash";
import Filter from "../Filter";
import {
    safelyLoadFiltersFromSessionStorage,
    saveFiltersToSessionStorage,
} from "./filterSessionStorageHandlers";

import { find } from "lodash";

export default function FilterCtxProvider({ children }) {
    const [filters, setFilters] = useState(
        safelyLoadFiltersFromSessionStorage() || []
    );

    const setNewFilter = (id, options) => {
        if (!getFilterById(id)) {
            const filter = Filter.create({ id, options });
            filters.push(filter);
            const newFilters = clone(filters);
            setFilters(newFilters);
            saveFiltersToSessionStorage(newFilters);
        }
    };

    const setNewNonPersistentFilter = (id, options) => {
        options = { ...options, nonPersistent: true };
        if (!getFilterById(id)) {
            const filter = Filter.create({ id, options });
            filters.push(filter);
            const newFilters = clone(filters);
            setFilters(newFilters);
        }
    };
    const deleteNonPersistentFilter = (id) => {
        const newFilters = clone(filters);
        remove(newFilters, (f) => {
            return f.id === id;
        });
        setFilters(newFilters);
    };

    const getFilterById = (id) => {
        return find(filters, (f) => {
            return f.getId() === id;
        });
    };

    const setFilterOptionsById = (id, options) => {
        let filterToUpdate = getFilterById(id);
        filterToUpdate.setOptions(options);
        const newFilters = clone(filters);
        setFilters(newFilters);
        saveFiltersToSessionStorage(newFilters);
    };
    const setInvertedFilterStateById = (id) => {
        let filterToUpdate = getFilterById(id);
        filterToUpdate.invertState();
        const newFilters = clone(filters);
        setFilters(newFilters);
        saveFiltersToSessionStorage(newFilters);
    };

    // set default filters
    return (
        <FilterCtx.Provider
            value={{
                filters,
                getFilterById,
                setNewFilter,
                setFilterOptionsById,
                setInvertedFilterStateById,
                setNewNonPersistentFilter,
                deleteNonPersistentFilter,
            }}
        >
            {children || null}
        </FilterCtx.Provider>
    );
}

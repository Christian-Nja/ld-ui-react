const filtersSessionStorageKey = "filters-key";
import Filter from "../Filter";
import { map, remove } from "lodash";

export function safelyLoadFiltersFromSessionStorage() {
    try {
        const filters = JSON.parse(
            window.sessionStorage.getItem(filtersSessionStorageKey)
        );

        const deserializedFilters = map(filters, (f) => {
            return Filter.create({
                id: f.id,
                options: {
                    ...f.options,
                    filterCallback: Function(f.options.filterCallback),
                },
            });
        });
        return deserializedFilters;
    } catch (e) {
        return undefined;
    }
}

export function saveFiltersToSessionStorage(filters) {
    const stringFilters = map(filters, (f) => {
        const { hasResourcesToFilter, ...filterOptions } = f.options;

        return {
            id: f.getId(),
            options: {
                ...filterOptions,
                filterCallback: String(f.options.filterCallback),
            },
        };
    });
    remove(stringFilters, (f) => {
        return f.options.nonPersistent === true;
    });
    window.sessionStorage.setItem(
        filtersSessionStorageKey,
        JSON.stringify(stringFilters)
    );
}

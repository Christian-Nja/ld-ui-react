import Filter from "../Filter";
import { map, remove } from "lodash";

export function safelyLoadFiltersFromSessionStorage(resourceUri) {
    const filtersSessionStorageKey = `filters-${resourceUri}`;
    console.log("Loading filters from session sotrage");
    try {
        const filters = JSON.parse(
            window.sessionStorage.getItem(filtersSessionStorageKey)
        );

        const deserializedFilters = map(filters, (f) => {
            console.log(f);
            var filterCallback = new Function(f.options.filterCallback);
            return Filter.create({
                id: f.id,
                options: {
                    ...f.options,
                    filterCallback: filterCallback,
                },
            });
        });
        console.log("Loaded from session storage:", deserializedFilters);
        return deserializedFilters;
    } catch (e) {
        console.log("Failed to load from session storage");
        console.log(e);
        return undefined;
    }
}

export function saveFiltersToSessionStorage(filters, resourceUri) {
    const filtersSessionStorageKey = `filters-${resourceUri}`;

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

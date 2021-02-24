import Filter from "../Filter";
import { FilterStrategyFactory } from "../filter-algorithms/FilterStrategyFactory";
import { map, remove } from "lodash";

export function safelyLoadFiltersFromSessionStorage(resourceUri) {
    const filtersSessionStorageKey = `filters-${resourceUri}`;
    try {
        const filters = JSON.parse(
            window.sessionStorage.getItem(filtersSessionStorageKey)
        );

        const deserializedFilters = map(filters, (f) => {
            return Filter.create({
                id: f.id,
                options: {
                    ...f.options,
                    filterCallback: FilterStrategyFactory.make(
                        f.options.filterCallback
                    ),
                },
            });
        });
        return deserializedFilters;
    } catch (e) {
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
                filterCallback: JSON.stringify(f.options.filterCallback),
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

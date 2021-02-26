import { FilterPatternByViewStrategy } from "../filter-algorithms/FilterPatternByViewStrategy";
import { FilterIntervalStrategy } from "../filter-algorithms/FilterIntervalStrategy";
import { FilterSearchBarStrategy } from "./FilterSearchBarStrategy";
import { FilterOnMapStrategy } from "./FilterOnMapStrategy";
import { FilterResourceByViewStrategy } from "./FilterResourceByViewStrategy";
import { FilterTimeIntervalStrategy } from "./FilterTimeIntervalStrategy";
import { FilterResourceByPropertyStrategy } from "./FilterResourceByPropertyStrategy";

// we use this class
// when unserializing strategy by session storage
// using reflection
export class FilterStrategyFactory {
    static make(strategyDTO) {
        switch (strategyDTO.class) {
            case "FilterPatternByViewStrategy":
                return FilterPatternByViewStrategy.create({
                    ...strategyDTO,
                });
            case "FilterIntervalStrategy":
                return FilterIntervalStrategy.create({
                    ...strategyDTO,
                });
            case "FilterOnMapStrategy":
                return FilterOnMapStrategy.create({
                    ...strategyDTO,
                });
            case "FilterSearchBarStrategy":
                return FilterSearchBarStrategy.create({
                    ...strategyDTO,
                });
            case "FilterTimeIntervalStrategy":
                return FilterTimeIntervalStrategy.create({
                    ...strategyDTO,
                });
            case "FilterResourceByViewStrategy":
                return FilterResourceByViewStrategy.create({
                    ...strategyDTO,
                });
            case "FilterResourceByPropertyStrategy":
                return FilterResourceByPropertyStrategy.create({
                    ...strategyDTO,
                });
        }
        return undefined;
    }
}

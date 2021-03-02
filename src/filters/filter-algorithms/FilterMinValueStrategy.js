import { byResourceTypeFilterFunction } from "./byResourceTipeFilterFunction";

export class FilterMinValueStrategy {
    // resource type is optional
    constructor(resourceProperty, minValue, resourceType) {
        this.resourceProperty = resourceProperty;
        this.minValue = minValue;
        this.resourceType = resourceType;
        this.class = this.constructor.name;
    }
    static create({ resourceProperty, minValue, resourceType }) {
        if (!resourceProperty || !minValue) return undefined;
        return new FilterMinValueStrategy(
            resourceProperty,
            minValue,
            resourceType
        );
    }
    filter(node) {
        // touch only resource with type resourceType
        if (typeof this.resourceType !== "undefined") {
            if (!byResourceTypeFilterFunction(node, this.resourceType)) {
                return true;
            }
        }
        // if resource has no property return true
        if (!node[this.resourceProperty]) {
            return true;
        }
        if (node[this.resourceProperty] >= this.minValue) {
            return true;
        }
        return false;
    }
}

import { byResourceTypeFilterFunction } from "./byResourceTipeFilterFunction";

export class FilterMaxValueStrategy {
    // resource type is optional
    constructor(resourceProperty, maxValue, resourceType) {
        this.resourceProperty = resourceProperty;
        this.maxValue = maxValue;
        this.resourceType = resourceType;
        this.class = this.constructor.name;
    }
    static create({ resourceProperty, maxValue, resourceType }) {
        if (!resourceProperty || !maxValue) return undefined;
        return new FilterMaxValueStrategy(
            resourceProperty,
            maxValue,
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
        if (node[this.resourceProperty] <= this.maxValue) {
            return true;
        }
        return false;
    }
}

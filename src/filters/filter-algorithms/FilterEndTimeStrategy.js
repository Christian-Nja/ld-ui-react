export class FilterEndTimeStrategy {
    constructor(endTime) {
        this.endTime = endTime;
        this.class = this.constructor.name;
    }
    static create({ endTime }) {
        if (!endTime) return undefined;
        return new FilterEndTimeStrategy(endTime);
    }
    filter(resource) {
        if (!resource.endTime) {
            return true;
        } else {
            if (resource.endTime <= this.endTime) {
                // stratTime greater than selected startTime
                return true;
            } else {
                // lower
                return false;
            }
        }
    }
}

export class FilterStartTimeStrategy {
    constructor(startTime) {
        this.startTime = startTime;
        this.class = this.constructor.name;
    }
    static create({ startTime }) {
        if (!startTime) return undefined;
        return new FilterStartTimeStrategy(startTime);
    }
    filter(resource) {
        if (!resource.startTime) {
            return true;
        } else {
            if (resource.startTime >= this.startTime) {
                // stratTime greater than selected startTime
                return true;
            } else {
                // lower
                return false;
            }
        }
    }
}

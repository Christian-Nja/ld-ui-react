import Resource from "../classes/Resource";

export default class TimeInterval extends Resource {
    constructor(uri, label, description, startTime, endTime) {
        super(uri, label, description);
        this.startTime = startTime;
        this.endTime = endTime;
    }
    static create({ uri, label, description, startTime, endTime }) {
        return new TimeInterval(uri, label, description, startTime, endTime);
    }
    getStartTime() {
        return this.startTime;
    }
    getEndTime() {
        return this.endTime;
    }
}

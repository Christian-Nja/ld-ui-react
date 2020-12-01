/**
 * @description A class to analyze a list of pattern instances and single instance of different types
 * @author Christian Colonna
 * @date 25-11-2020
 * @export
 * @class InstanceFilter
 */
export default class InstanceFilter {
    constructor(instances) {
        this.instances = instances || [];
    }
    /**
     * @description Returns all instances having a node of type TimeInterval
     *              Usually this instances have TimeInterval pattern explicitely declared
     *              between component patterns in the key prop (context is provide by opla vocabulary).
     * @author Christian Colonna
     * @date 25-11-2020
     * @memberof InstanceFilter
     */
    timeIntervalInstances() {
        return this.instances.filter((instance) => {
            return (
                instance.type === "https://w3id.org/italia/onto/TI/TimeInterval"
            ); // TODO: move to json-ld to clear this
        });
    }

    /**
     * @description Returns the event captured in an instance of time interval pattern
     *              String intervals are converted to Date
     *              This format can be feed to library such as pond.js
     * @author Christian Colonna
     * @date 25-11-2020
     * @param {Object} timeIntervalInstance
     * @param {boolean} [duration=true] add duration to the instance
     * @returns {Object}
     * @memberof InstanceFilter
     */
    timeIntervalInstanceEventToDate(timeIntervalInstance, duration = true) {
        return {
            startTime: new Date(timeIntervalInstance.startTime),
            endTime: new Date(timeIntervalInstance.endTime),
            duration:
                new Date(timeIntervalInstance.endTime) -
                new Date(timeIntervalInstance.startTime),
            event: timeIntervalInstance,
            // title : timeIntervalInstance.label
            // description : timeIntervalInstance.label
        };
    }
}

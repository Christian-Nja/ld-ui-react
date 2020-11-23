/**
 * @description A class to handle a list of pattern instances
 * @author Christian Colonna
 * @date 23-11-2020
 * @export
 * @class InstancesList
 */
export default class InstancesList {
    /**
     * Creates an instance of InstancesList.
     * @author Christian Colonna
     * @date 23-11-2020
     * @param {Object} instancesList every array entry is a row of type { pattern: <patternURI>, instance: <instanceURI>, node: <instanceResourceURI>, type: <instanceResourceType>}
     * @memberof InstancesList
     */
    constructor(instancesList) {
        this.list = instancesList;
    }
    /**
     * @description Returns degree of given pattern instance
     * @author Christian Colonna
     * @date 16-11-2020
     * @param {string} patternURI pattern instance uri
     * @returns {number} count nodes belonging to given pattern instance
     * @memberof PatternList
     */
    getPatternInstanceDegree(instanceURI) {
        let degree = 0;
        this.list.forEach((instance) => {
            if (instance.instance === instanceURI) degree++;
        });
        return degree;
    }
}

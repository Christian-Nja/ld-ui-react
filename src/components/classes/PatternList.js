import RequiredParamChecker from './RequiredParamChecker';

/**
 * @description A class to handle pattern list as a list of object representing pattern
 * @author Christian Colonna
 * @date 11-11-2020
 * @export
 * @class PatternList
 */
export default class PatternList {
    /**
     * Creates an instance of PatternList.
     * @author Christian Colonna
     * @date 11-11-2020
     * @param {Object[]} patternList a list of pattern object
     * @param {string} patternList.pattern pattern label
     * @param {string} patternList.occurences pattern occurences
     * @memberof PatternList
     */
    constructor(patternList) {
        this.list = patternList;
    }
    /**
     * @description Returns occurences for given pattern
     * @author Christian Colonna
     * @date 11-11-2020
     * @param {string} pattern pattern label
     * @returns {number} pattern occurences
     * @memberof PatternList
     */
    getOccurencesByPattern(pattern) {
        const occurences = this.list.find((patternMap) => {
            patternMap.pattern === pattern;
        })['occurences'];
        return occurences ? parseInt(occurences) : 0;
    }
}

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
     * @param {string} pattern pattern uri
     * @returns {number} pattern occurences
     * @memberof PatternList
     */
    getOccurencesByPattern(pattern) {
        const occurences = this.list.find((patternMap) => {
            return patternMap.pattern === pattern;
        });
        return occurences ? parseInt(occurences['occurences']) : 1;
    }

    /**
     * @description Returns of given pattern instance
     * @author Christian Colonna
     * @date 16-11-2020
     * @param {*} pattern pattern instance uri
     * @returns {number} count nodes belonging to given pattern instance
     * @memberof PatternList
     */
    getDegreeByPattern(pattern) {
        const degree = this.list.find((instanceMap) => {
            return instanceMap.instance === pattern;
        });
        return degree ? parseInt(degree['count']) : 1;
    }
}

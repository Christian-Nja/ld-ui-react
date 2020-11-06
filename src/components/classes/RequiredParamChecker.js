import RequiredParamError from './errors/RequiredParamError';

/**
 * @description Checks if params are not undefined else throws RequiredParamError
 * @author Christian Colonna
 * @date 06-11-2020
 * @export
 * @class RequiredParamChecker
 */
export default class RequiredParamChecker {
    /**
     * Creates an instance of RequiredParamChecker.
     * @author Christian Colonna
     * @date 06-11-2020
     * @param {any[]} params
     * @param {String} errMsg optional
     * @memberof RequiredParamChecker
     */
    constructor(params, errMsg) {
        params.map((param) => {
            if (!param)
                throw new RequiredParamError(
                    errMsg ? errMsg : `[!] ${param} is required`
                );
        });
    }
}

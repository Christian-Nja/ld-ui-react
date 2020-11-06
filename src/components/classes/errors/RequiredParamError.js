/**
 * @description Error throws when a required argument is missing
 * @author Christian Colonna
 * @date 06-11-2020
 * @export
 * @class RequiredParamError
 * @extends {Error}
 */
export default class RequiredParamError extends Error {
    constructor(message) {
        super(message);
        this.name = 'RequiredParamError';
    }
}

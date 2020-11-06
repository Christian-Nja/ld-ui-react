'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = void 0;

var _RequiredParamError = _interopRequireDefault(require('./errors/RequiredParamError'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/**
 * @description Checks if params are not undefined else throws RequiredParamError
 * @author Christian Colonna
 * @date 06-11-2020
 * @export
 * @class RequiredParamChecker
 */
var RequiredParamChecker =
/**
 * Creates an instance of RequiredParamChecker.
 * @author Christian Colonna
 * @date 06-11-2020
 * @param {any[]} params
 * @param {String} errMsg optional
 * @memberof RequiredParamChecker
 */
function RequiredParamChecker(params, errMsg) {
    _classCallCheck(this, RequiredParamChecker);

    params.map(function (param) {
        if (!param) throw new _RequiredParamError['default'](errMsg ? errMsg : '[!] '.concat(param, ' is required'));
    });
};

exports['default'] = RequiredParamChecker;
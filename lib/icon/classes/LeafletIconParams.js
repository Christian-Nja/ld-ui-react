'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = void 0;

var _leaflet = _interopRequireDefault(require('leaflet'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/**
 * Params used to build a leaflet icon.
 * Constructor will override default params
 */
var LeafletIconParams =
/**
 * @param {Object} params a JSON object with params as attributes.
 * Params keys:
 * @param {string} iconUrl the path to iconUrl
 * @param {string} iconRetinaUrl
 * @param {*} iconAnchor
 * @param {*} popupAnchor
 * @param {*} shadowUrl
 * @param {*} shadowSize
 * @param {*} shadowAnchor
 * @param {number} iconWidth the width of the icon
 * @param {number} iconHeight the heigth of the icon
 * @param {string} className css class
 */
function LeafletIconParams(params) {
    _classCallCheck(this, LeafletIconParams);

    this.iconUrl = params.iconUrl;
    this.iconRetinaUrl = params.iconRetinaUrl;
    this.iconAnchor = params.iconAnchor;
    this.popupAnchor = params.popupAnchor;
    this.shadowUrl = params.shadowUrl;
    this.shadowSize = params.shadowSize;
    this.shadowAnchor = params.shadowAnchor;
    this.iconSize = new _leaflet['default'].Point(params.iconWidth, params.iconHeight);
    this.className = params.className;
};

exports['default'] = LeafletIconParams;
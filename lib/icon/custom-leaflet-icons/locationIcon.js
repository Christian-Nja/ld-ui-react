'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = void 0;

var _leafletIcon = _interopRequireDefault(require('../functions/leafletIcon'));

var _LeafletIconParams = _interopRequireDefault(require('../classes/LeafletIconParams'));

var _redMarkerSvgUri = _interopRequireDefault(require('../uri-encoded-icons/red-marker.svg.uri.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

console.log(_redMarkerSvgUri['default']);
var locationIconParams = new _LeafletIconParams['default']({
    iconUrl: _redMarkerSvgUri['default'],
    iconRetinaUrl: _redMarkerSvgUri['default'],
    iconWidth: 60,
    iconHeight: 75,
    className: 'ld-ui-div-icon'
});
/**
 * Marker icon
 */

var locationIcon = (0, _leafletIcon['default'])(locationIconParams);
var _default = locationIcon;
exports['default'] = _default;
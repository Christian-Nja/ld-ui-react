'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = void 0;

var _leafletIcon = _interopRequireDefault(require('../functions/leafletIcon'));

var _LeafletIconParams = _interopRequireDefault(require('../classes/LeafletIconParams'));

var _redMarkerSvgUri = _interopRequireDefault(require('../uri-encoded-icons/red-marker.svg.uri.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var locationIconParams = new _LeafletIconParams['default']({
    iconUrl: _redMarkerSvgUri['default'],
    className: 'ld-ui-div-icon',
    iconAnchor: [15, 50]
});
/**
 * Marker icon
 */

var locationIcon = (0, _leafletIcon['default'])(locationIconParams);
var _default = locationIcon;
exports['default'] = _default;
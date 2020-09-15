'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = blueClusterMarkerIcon;

var _htmlIcon = _interopRequireDefault(require('../functions/htmlIcon'));

var _bluMarkerSvg = _interopRequireDefault(require('../uri-encoded-icons/blu-marker.svg.uri'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function blueClusterMarkerIcon(message) {
    return (0, _htmlIcon['default'])(_bluMarkerSvg['default'], message);
}
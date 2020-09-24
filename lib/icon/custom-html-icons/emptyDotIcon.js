'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = emptyDotIcon;

var _htmlIcon = _interopRequireDefault(require('../functions/htmlIcon'));

var _emptyDotSvg = _interopRequireDefault(require('../uri-encoded-icons/empty-dot.svg.uri'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function emptyDotIcon(message) {
    return (0, _htmlIcon['default'])(_emptyDotSvg['default'], message);
}
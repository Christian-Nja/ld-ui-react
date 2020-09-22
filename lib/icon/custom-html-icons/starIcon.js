'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = starIcon;

var _htmlIcon = _interopRequireDefault(require('../functions/htmlIcon'));

var _starSvg = _interopRequireDefault(require('../uri-encoded-icons/star.svg.uri'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function starIcon(message) {
    return (0, _htmlIcon['default'])(_starSvg['default'], message);
}
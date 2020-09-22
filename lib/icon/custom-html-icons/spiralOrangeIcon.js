'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = spiralOrangeIcon;

var _htmlIcon = _interopRequireDefault(require('../functions/htmlIcon'));

var _hypnosisSvg = _interopRequireDefault(require('../uri-encoded-icons/hypnosis.svg.uri'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function spiralOrangeIcon(message) {
    return (0, _htmlIcon['default'])(_hypnosisSvg['default'], message);
}
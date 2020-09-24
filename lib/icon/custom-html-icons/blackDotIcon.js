'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = blackDotIcon;

var _htmlIcon = _interopRequireDefault(require('../functions/htmlIcon'));

var _blackCircleSvg = _interopRequireDefault(require('../uri-encoded-icons/black-circle.svg.uri'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function blackDotIcon(message) {
    return (0, _htmlIcon['default'])(_blackCircleSvg['default'], message);
}
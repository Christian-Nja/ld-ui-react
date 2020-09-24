'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = museumIcon;

var _htmlIcon = _interopRequireDefault(require('../functions/htmlIcon'));

var _clockCalendarSvg = _interopRequireDefault(require('../uri-encoded-icons/clock-calendar.svg.uri'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function museumIcon(message) {
    return (0, _htmlIcon['default'])(_clockCalendarSvg['default'], message);
}
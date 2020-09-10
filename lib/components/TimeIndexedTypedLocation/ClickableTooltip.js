'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = ClickableTooltip;

var _react = _interopRequireDefault(require('react'));

var _reactLeaflet = require('react-leaflet');

var _TimeIcon = _interopRequireDefault(require('../../icon/simple-icons/TimeIcon'));

var _MuseumIcon = _interopRequireDefault(require('../../icon/simple-icons/MuseumIcon'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function ClickableTooltip(props) {
    return /*#__PURE__*/_react['default'].createElement(_reactLeaflet.Tooltip, {
        opacity: 1,
        interactive: true
    }, /*#__PURE__*/_react['default'].createElement(_MuseumIcon['default'], {
        message: props.siteLabel
    }), /*#__PURE__*/_react['default'].createElement(_TimeIcon['default'], {
        message: props.timeInterval
    }));
}
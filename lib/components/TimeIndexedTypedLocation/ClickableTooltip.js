'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = ClickableTooltip;

var _react = _interopRequireDefault(require('react'));

var _reactLeaflet = require('react-leaflet');

var _ldUiIcon = require('../../icon/ld-ui-icon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function ClickableTooltip(props) {
    return /*#__PURE__*/_react['default'].createElement(_reactLeaflet.Tooltip, {
        opacity: 1,
        interactive: true,
        className: 'clickable-tooltip'
    }, /*#__PURE__*/_react['default'].createElement(_ldUiIcon.MuseumIcon, {
        message: ''.concat(props.siteLabel, ' (').concat(props.city, ')')
    }), /*#__PURE__*/_react['default'].createElement(_ldUiIcon.TimeIcon, {
        message: props.timeInterval
    }));
}
/*
 * NOTE: you may change this with a Popup to make it appear with a click
 *______________________________________________________________________ */
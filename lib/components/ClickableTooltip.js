'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = ClickableTooltip;

var _react = _interopRequireDefault(require('react'));

var _reactLeaflet = require('react-leaflet');

var _generalComponents = require('@christian-nja/general-components');

var _TimeIcon = _interopRequireDefault(require('../icon/simple-icons/TimeIcon'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function ClickableTooltip(props) {
    return /*#__PURE__*/_react['default'].createElement(_reactLeaflet.Tooltip, {
        className: 'clickable-tooltip',
        permanent: true
    }, /*#__PURE__*/_react['default'].createElement(_TimeIcon['default'], null), /*#__PURE__*/_react['default'].createElement(_generalComponents.CustomButton, {
        onClick: function onClick() {
            console.log('ciao');
        },
        text: 'Ciao'
    }), /*#__PURE__*/_react['default'].createElement('img', {
        src: 'https://i.stack.imgur.com/hnsDU.jpg?s=32&g=1'
    }), /*#__PURE__*/_react['default'].createElement('span', null, 'A tooltip'));
}
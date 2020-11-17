'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = PatternMenu;

var _react = _interopRequireDefault(require('react'));

var _semanticUiReact = require('semantic-ui-react');

var _LayoutSelector = _interopRequireDefault(require('./LayoutSelector'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var menuStyle = {
    position: 'absolute',
    top: 70,
    left: 20,
    zIndex: 10
};

function PatternMenu(props) {
    return /*#__PURE__*/_react['default'].createElement('div', {
        style: menuStyle
    }, /*#__PURE__*/_react['default'].createElement(_semanticUiReact.Menu, {
        vertical: true,
        inverted: true
    }, /*#__PURE__*/_react['default'].createElement(_LayoutSelector['default'], {
        value: props.layoutHandler.name,
        onClick: function onClick(newLayout) {
            props.layoutHandler.setLayout(newLayout);
        }
    })));
}
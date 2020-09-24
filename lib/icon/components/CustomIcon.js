'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = CustomIcon;

var _react = _interopRequireDefault(require('react'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function CustomIcon(props) {
    return /*#__PURE__*/_react['default'].createElement('i', null, /*#__PURE__*/_react['default'].createElement('img', {
        src: props.src,
        className: 'ld-ui-div-icon simple-icon '.concat(props.iconClassName ? props.iconClassName : '')
    }), /*#__PURE__*/_react['default'].createElement('p', {
        className: 'icon-description '.concat(props.descriptionClassName ? props.descriptionClassName : '')
    }, props.message), /*#__PURE__*/_react['default'].createElement('br', null));
}
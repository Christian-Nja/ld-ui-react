"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Resource;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Resource(_ref) {
  var resource = _ref.resource,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      classes = _ref.classes,
      depiction = _ref.depiction,
      label = _ref.label,
      onClick = _ref.onClick;
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: style,
    className: classes,
    onClick: onClick
  }, depiction && depiction, label && label);
}
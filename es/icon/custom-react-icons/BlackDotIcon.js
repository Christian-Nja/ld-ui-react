"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = BlackDotIcon;

var _react = _interopRequireDefault(require("react"));

var _CustomIcon = _interopRequireDefault(require("../components/CustomIcon"));

var _blackCircleSvg = _interopRequireDefault(require("../uri-encoded-icons/black-circle.svg.uri"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function BlackDotIcon(props) {
  return /*#__PURE__*/_react["default"].createElement(_CustomIcon["default"], {
    src: _blackCircleSvg["default"],
    message: props.message,
    iconClassName: props.iconClassName,
    descriptionClassName: props.descriptionClassName
  });
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SpiralOrangeIcon;

var _react = _interopRequireDefault(require("react"));

var _CustomIcon = _interopRequireDefault(require("../components/CustomIcon"));

var _hypnosisSvg = _interopRequireDefault(require("../uri-encoded-icons/hypnosis.svg.uri"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function SpiralOrangeIcon(props) {
  return /*#__PURE__*/_react["default"].createElement(_CustomIcon["default"], {
    src: _hypnosisSvg["default"],
    message: props.message,
    iconClassName: props.iconClassName,
    descriptionClassName: props.descriptionClassName
  });
}
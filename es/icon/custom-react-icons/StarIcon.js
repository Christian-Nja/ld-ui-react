"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = StarIcon;

var _react = _interopRequireDefault(require("react"));

var _CustomIcon = _interopRequireDefault(require("../components/CustomIcon"));

var _starSvg = _interopRequireDefault(require("../uri-encoded-icons/star.svg.uri"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function StarIcon(props) {
  return /*#__PURE__*/_react["default"].createElement(_CustomIcon["default"], {
    src: _starSvg["default"],
    message: props.message,
    iconClassName: props.iconClassName,
    descriptionClassName: props.descriptionClassName
  });
}
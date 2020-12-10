"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EmptyDotIcon;

var _react = _interopRequireDefault(require("react"));

var _CustomIcon = _interopRequireDefault(require("../components/CustomIcon"));

var _emptyDotSvg = _interopRequireDefault(require("../uri-encoded-icons/empty-dot.svg.uri"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function EmptyDotIcon(props) {
  return /*#__PURE__*/_react["default"].createElement(_CustomIcon["default"], {
    src: _emptyDotSvg["default"],
    message: props.message,
    iconClassName: props.iconClassName,
    descriptionClassName: props.descriptionClassName
  });
}
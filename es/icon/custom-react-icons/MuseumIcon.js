"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = TimeIcon;

var _react = _interopRequireDefault(require("react"));

var _CustomIcon = _interopRequireDefault(require("../components/CustomIcon"));

var _museumIconSvg = _interopRequireDefault(require("../uri-encoded-icons/museum-icon.svg.uri"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function TimeIcon(props) {
  return /*#__PURE__*/_react["default"].createElement(_CustomIcon["default"], {
    src: _museumIconSvg["default"],
    message: props.message
  });
}
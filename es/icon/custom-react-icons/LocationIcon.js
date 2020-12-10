"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = LocationIcon;

var _react = _interopRequireDefault(require("react"));

var _CustomIcon = _interopRequireDefault(require("../components/CustomIcon"));

var _locationSvg = _interopRequireDefault(require("../uri-encoded-icons/location.svg.uri"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function LocationIcon(props) {
  return /*#__PURE__*/_react["default"].createElement(_CustomIcon["default"], {
    src: _locationSvg["default"],
    message: props.message
  });
}
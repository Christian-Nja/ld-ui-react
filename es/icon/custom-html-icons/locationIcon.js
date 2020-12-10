"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = locationIcon;

var _htmlIcon = _interopRequireDefault(require("../functions/htmlIcon"));

var _locationSvg = _interopRequireDefault(require("../uri-encoded-icons/location.svg.uri"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function locationIcon(message) {
  return (0, _htmlIcon["default"])(_locationSvg["default"], message);
}
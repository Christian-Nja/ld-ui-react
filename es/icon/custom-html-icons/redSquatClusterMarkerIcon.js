"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = redSquatClusterMarkerIcon;

var _htmlIcon = _interopRequireDefault(require("../functions/htmlIcon"));

var _squatMarkerRedSvg = _interopRequireDefault(require("../uri-encoded-icons/squat-marker-red.svg.uri"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function redSquatClusterMarkerIcon(message) {
  return (0, _htmlIcon["default"])(_squatMarkerRedSvg["default"], message);
}
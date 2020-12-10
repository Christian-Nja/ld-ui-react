"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _leafletIcon = _interopRequireDefault(require("../functions/leafletIcon"));

var _LeafletIconParams = _interopRequireDefault(require("../classes/LeafletIconParams"));

var _squatMarkerRedSvg = _interopRequireDefault(require("../uri-encoded-icons/squat-marker-red.svg.uri"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var redMarkerIconParams = new _LeafletIconParams["default"]({
  iconUrl: _squatMarkerRedSvg["default"],
  className: 'ld-ui-div-icon',
  iconAnchor: [15, 50],
  popupAnchor: [0, -50]
});
/**
 * Marker icon
 */

var redSquatMarkerIcon = (0, _leafletIcon["default"])(redMarkerIconParams);
var _default = redSquatMarkerIcon;
exports["default"] = _default;
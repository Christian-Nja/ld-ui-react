"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = TimeIndexedTypedLocation;

var _react = _interopRequireDefault(require("react"));

var _reactLeaflet = require("react-leaflet");

require("leaflet/dist/leaflet.css");

require("./TimeIndexedTypedLocation.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function TimeIndexedTypedLocation(props) {
  console.log("I'm alive");
  var data = {
    timeIndexedTypedLocations: [{
      startTime: 1987,
      endTime: 2000,
      locationType: "CurrentPhysicalLocation",
      coordinates: {
        latitude: 41.8933203,
        longitude: 12.4829321
      }
    }]
  };
  var position = [data.timeIndexedTypedLocations[0].coordinates.latitude, data.timeIndexedTypedLocations[0].coordinates.longitude];
  var zoom = 13;
  return /*#__PURE__*/_react["default"].createElement("div", null, "                    ", /*#__PURE__*/_react["default"].createElement(_reactLeaflet.Map, {
    center: position,
    zoom: zoom
  }, /*#__PURE__*/_react["default"].createElement(_reactLeaflet.TileLayer, {
    attribution: "&copy <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  }), /*#__PURE__*/_react["default"].createElement(_reactLeaflet.Marker, {
    position: position
  }, /*#__PURE__*/_react["default"].createElement(_reactLeaflet.Popup, null, "A pretty CSS3 popup. ", /*#__PURE__*/_react["default"].createElement("br", null), " Easily customizable."))));
}
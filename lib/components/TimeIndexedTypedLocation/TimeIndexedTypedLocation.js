'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = TimeIndexedTypedLocation;

var _react = _interopRequireDefault(require('react'));

var _reactLeaflet = require('react-leaflet');

require('leaflet/dist/leaflet.css');

require('./TimeIndexedTypedLocation.css');

var _ldUiIcon = require('../../icon/ld-ui-icon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function TimeIndexedTypedLocation(props) {
    var position = [props.timeIndexedTypedLocations[0].latitude, props.timeIndexedTypedLocations[0].longitude];
    var zoom = 6;
    return /*#__PURE__*/_react['default'].createElement('div', null, /*#__PURE__*/_react['default'].createElement(_reactLeaflet.Map, {
        center: position,
        zoom: zoom
    }, /*#__PURE__*/_react['default'].createElement(_reactLeaflet.TileLayer, {
        attribution: '&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    }), /*#__PURE__*/_react['default'].createElement(_reactLeaflet.Marker, {
        position: position,
        icon: _ldUiIcon.locationIcon
    })));
}
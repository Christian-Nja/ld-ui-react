'use strict';

function _typeof(obj) { '@babel/helpers - typeof'; if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = TimeIndexedTypedLocation;

var _react = _interopRequireWildcard(require('react'));

var _reactLeaflet = require('react-leaflet');

var _reactLeafletArrowheads = _interopRequireDefault(require('react-leaflet-arrowheads'));

require('leaflet/dist/leaflet.css');

require('./TimeIndexedTypedLocation.css');

var _ldUiIcon = require('../../icon/ld-ui-icon');

var _ClickableTooltip = _interopRequireDefault(require('./ClickableTooltip'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== 'function') return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== 'object' && typeof obj !== 'function') { return { 'default': obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj['default'] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function TimeIndexedTypedLocation(props) {
    console.log(JSON.stringify(props.timeIndexedTypedLocations[0])); // optional as zoom is handled by markers

    var defaultCenter = [51, 0];
    var defaultZoom = 10;
    var lines = getTimeOrientedCoordinates(props.timeIndexedTypedLocations);
    var mapRef = (0, _react.useRef)(null); // fit map focus to markers

    var onFeatureGroupAdd = function onFeatureGroupAdd(e) {
        mapRef.current.leafletElement.fitBounds(e.target.getBounds(), {
            padding: [50, 50]
        });
    };

    return /*#__PURE__*/_react['default'].createElement('div', null, /*#__PURE__*/_react['default'].createElement(_reactLeaflet.Map, {
        center: defaultCenter,
        zoom: defaultZoom,
        ref: mapRef,
        zoomControl: false,
        attributionControl: false
    }, /*#__PURE__*/_react['default'].createElement(_reactLeaflet.TileLayer, {
        attribution: '&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    }), /*#__PURE__*/_react['default'].createElement(_reactLeafletArrowheads['default'], {
        positions: lines,
        arrowheads: {
            fill: true,
            size: '1%',
            proportionalToTotal: true
        }
    }), /*#__PURE__*/_react['default'].createElement(_reactLeaflet.FeatureGroup, {
        onAdd: onFeatureGroupAdd
    }, props.timeIndexedTypedLocations.map(function (tITL, index) {
        return /*#__PURE__*/_react['default'].createElement(_reactLeaflet.Marker, {
            position: [tITL.latitude, tITL.longitude],
            icon: _ldUiIcon.locationIcon,
            key: index
        }, /*#__PURE__*/_react['default'].createElement(_ClickableTooltip['default'], {
            timeInterval: ''.concat(tITL.startTime, ' - ').concat(tITL.endTime !== '' ? tITL.endTime : 'Today'),
            siteLabel: tITL.siteLabel,
            city: tITL.city
        }));
    }))));
}

function getTimeOrientedCoordinates(timeIndexedTypedLocations) {
    // here we're assuming time as years
    // bugs my arise if you pass datetime
    timeIndexedTypedLocations.sort(function (a, b) {
        return parseInt(a.startTime) - parseInt(b.startTime);
    });
    var coordinatesArray = [];
    timeIndexedTypedLocations.forEach(function (element) {
        coordinatesArray.push([element.latitude, element.longitude]);
    });
    return coordinatesArray;
}
/*
<button onClick={handleClick}>Zoom</button>

const handleClick = () => {
    const map = mapRef.current.leafletElement;
    const group = groupRef.current.leafletElement;
    map.fitBounds(group.getBounds());
};
*/
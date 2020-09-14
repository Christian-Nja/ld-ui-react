'use strict';

function _typeof(obj) { '@babel/helpers - typeof'; if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = TimeIndexedTypedLocation;

var _react = _interopRequireWildcard(require('react'));

var _leaflet = _interopRequireDefault(require('leaflet'));

require('leaflet.markercluster/dist/leaflet.markercluster');

require('leaflet.markercluster/dist/MarkerCluster.css');

require('leaflet.markercluster/dist/MarkerCluster.Default.css');

require('@elfalem/leaflet-curve');

require('leaflet-polylinedecorator');

require('leaflet/dist/leaflet.css');

require('./TimeIndexedTypedLocation.css');

var _ldUiHooks = require('../hooks/ld-ui-hooks');

var _ldUiIcon = require('../../icon/ld-ui-icon');

var _tITLPopup = _interopRequireDefault(require('./tITLPopup'));

var _math = require('../../utilities/math');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== 'function') return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== 'object' && typeof obj !== 'function') { return { 'default': obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj['default'] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * css
 */

/**
 * Internal modules
 */
function TimeIndexedTypedLocation(props) {
    var lines = getTimeOrientedCoordinates(props.timeIndexedTypedLocations);
    var mapRef = (0, _react.useRef)(null);
    var markerRefs = (0, _react.useRef)([]);
    (0, _ldUiHooks.useMap)(mapRef);
    (0, _react.useEffect)(function () {
        var mcg = _leaflet['default'].markerClusterGroup();
        /** display markers */


        var bounds = _leaflet['default'].latLngBounds();

        props.timeIndexedTypedLocations.forEach(function (tITL, index) {
            var markerPosition = [parseFloat(tITL.latitude), parseFloat(tITL.longitude)];
            var popupContent = {
                city: tITL.city,
                siteLabel: tITL.siteLabel,
                timeInterval: ''.concat(tITL.startTime, ' - ').concat(tITL.endTime !== '' ? tITL.endTime : 'Today')
            };

            var popup = _leaflet['default'].popup().setContent((0, _tITLPopup['default'])(popupContent)).setLatLng(markerPosition);

            markerRefs.current[index] = _leaflet['default'].marker(markerPosition, {
                icon: _ldUiIcon.blueMarkerIcon
            }).addTo(mcg).bindPopup(popup);
            bounds.extend(markerPosition); //            sleep(1000, index).then(() => {});
        });
        mapRef.current.fitBounds(bounds, {
            padding: [50, 50]
        });
        mapRef.current.addLayer(mcg);
        var arrows = [];

        for (var i = 0; i < lines.length - 1; i++) {
            var path = drawCurve(lines[i], lines[i + 1], mapRef);
            arrows.push(path);
            var arrowhead = arrowHead(lines[i + 1]);
            arrowhead.addTo(mapRef.current);
        }

        arrows.forEach(function (arrow) {
            arrow.addTo(mapRef.current);
        }); //var path = drawCurve(lines[0], lines[1]);
    //path.addTo(mapRef.current);
    }, []);
    return /*#__PURE__*/_react['default'].createElement('div', {
        id: 'map'
    });
}

function arrowHead(coordinates) {
    return _leaflet['default'].marker(coordinates, {
        icon: _ldUiIcon.blackArrowHeadIcon
    });
}

function drawCurve(coordinates_1, coordinates_2, mapRef) {
    var controlPointXoffset = 1;

    var path = _leaflet['default'].curve(['M', coordinates_1, 'Q', (0, _math._getControlPoint)(coordinates_1, coordinates_2, controlPointXoffset), coordinates_2], {
        color: 'red',
        fill: false
    });

    return path;
}

function getTimeOrientedCoordinates(timeIndexedTypedLocations) {
    // here we're assuming time as years
    // bugs my arise if you pass datetime
    timeIndexedTypedLocations.sort(function (a, b) {
        return parseInt(a.startTime) - parseInt(b.startTime);
    });
    var coordinatesArray = [];
    timeIndexedTypedLocations.forEach(function (element) {
        coordinatesArray.push([parseFloat(element.latitude), parseFloat(element.longitude)]);
    });
    return coordinatesArray;
}

function sleep(ms, index) {
    console.log(index, ms);
    return new Promise(function (resolve) {
        return setTimeout(resolve, index * ms);
    });
}
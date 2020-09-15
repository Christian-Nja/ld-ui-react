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

require('leaflet-arrowheads');

require('leaflet-arc');

require('leaflet/dist/leaflet.css');

require('./TimeIndexedTypedLocation.css');

var _config = _interopRequireDefault(require('./config'));

var _ldUiHooks = require('../hooks/ld-ui-hooks');

var _tITLPopup = _interopRequireDefault(require('./tITLPopup'));

var _math = require('../../utilities/math');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== 'function') return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== 'object' && typeof obj !== 'function') { return { 'default': obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj['default'] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === 'string') return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) n = o.constructor.name; if (n === 'Map' || n === 'Set') return Array.from(o); if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === 'undefined' || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return'] != null) _i['return'](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 *
 * @param {Object} props React properties
 */
function TimeIndexedTypedLocation(props) {
    var lines = getTimeOrientedCoordinates(props.timeIndexedTypedLocations);
    var DARK_PROVIDER = 0;
    var DAY_PROVIDER = 1;
    /* configuration state 
   _______________________*/

    var _useState = (0, _react.useState)({
            url: _config['default'].MAP[DAY_PROVIDER].PROVIDER,
            attribution: _config['default'].MAP[DAY_PROVIDER].ATTRIBUTION
        }),
        _useState2 = _slicedToArray(_useState, 2),
        mapProvider = _useState2[0],
        setMapProvider = _useState2[1];

    var _useState3 = (0, _react.useState)(_config['default'].DEPICTION),
        _useState4 = _slicedToArray(_useState3, 2),
        isDepiction = _useState4[0],
        setDepiction = _useState4[1];

    var _useState5 = (0, _react.useState)({
            color: _config['default'].ARROW.COLOR,
            headColor: _config['default'].ARROW.HEAD_COLOR,
            fillColor: _config['default'].ARROW.FILL_COLOR,
            size: _config['default'].ARROW.SIZE
        }),
        _useState6 = _slicedToArray(_useState5, 2),
        arrowState = _useState6[0],
        setArrowState = _useState6[1];

    var _useState7 = (0, _react.useState)({
            open: _config['default'].POPUP.OPEN,
            close: _config['default'].POPUP.CLOSE,
            openCluster: _config['default'].POPUP.OPEN_CLUSTER
        }),
        _useState8 = _slicedToArray(_useState7, 2),
        popupState = _useState8[0],
        setPopupState = _useState8[1];
    /** refs */


    var mapRef = (0, _react.useRef)(null);
    var markerRefs = (0, _react.useRef)([]);
    (0, _ldUiHooks.useMap)(mapRef, mapProvider);
    (0, _react.useEffect)(function () {
        var mcg = _leaflet['default'].markerClusterGroup({
            iconCreateFunction: function iconCreateFunction(cluster) {
                return _leaflet['default'].divIcon({
                    html: ''.concat(_config['default'].MARKER_ICON[1](cluster.getChildCount())),
                    className: 'cluster-icon',
                    iconAnchor: [15, 50]
                });
            }
        }).on(popupState.openCluster, function (e) {
            e.layer.spiderfy();
        }); // .on("clustermouseout", function (e) {
        //     // setTimeout(() => {
        //     //     e.layer.unspiderfy();
        //     // }, 4000);
        //     // clear timeout
        // });

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
                icon: _config['default'].MARKER_ICON[0]
            }).addTo(mcg).bindPopup(popup).on(popupState.open, function (e) {
                this.openPopup();
            }).on(popupState.close, function (e) {
                this.closePopup();
            });
            bounds.extend(markerPosition); //            sleep(1000, index).then(() => {});
        });
        mapRef.current.fitBounds(bounds, {
            padding: [50, 50]
        });
        mapRef.current.addLayer(mcg);
        var arrows = [];

        for (var i = 0; i < lines.length - 1; i++) {
            var arrow = getArrow(lines[i], lines[i + 1], arrowState);
            arrows.push(arrow);
        }

        arrows.forEach(function (arrow, index) {
            sleep(2000, index).then(function () {
                arrow.addTo(mapRef.current);
            });
        });
    }, []);
    return /*#__PURE__*/_react['default'].createElement('div', null, isDepiction ? /*#__PURE__*/_react['default'].createElement('img', {
        className: 'depiction',
        src: props.timeIndexedTypedLocations[0].depiction
    }) : null, /*#__PURE__*/_react['default'].createElement('div', {
        id: 'map'
    }));
}

function getArrow(coordinates_1, coordinates_2, arrowState) {
    return _leaflet['default'].Polyline.Arc(coordinates_1, coordinates_2, {
        vertices: 300,
        className: 'arrowheads',
        color: arrowState.color
    }).arrowheads({
        yawn: 40,
        fill: true,
        size: arrowState.size,
        frequency: 'endonly',
        color: arrowState.headColor,
        fillColor: arrowState.fillColor
    });
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
    return new Promise(function (resolve) {
        return setTimeout(resolve, index * ms);
    });
}
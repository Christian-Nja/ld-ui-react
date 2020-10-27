'use strict';

function _typeof(obj) { '@babel/helpers - typeof'; if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = TimeIndexedTypedLocation;

var _react = _interopRequireWildcard(require('react'));

var _leaflet = _interopRequireDefault(require('leaflet'));

var d3 = _interopRequireWildcard(require('d3'));

require('leaflet.markercluster/dist/leaflet.markercluster');

require('leaflet.markercluster/dist/MarkerCluster.css');

require('leaflet.markercluster/dist/MarkerCluster.Default.css');

require('leaflet/dist/leaflet.css');

require('./TimeIndexedTypedLocation.css');

var _config = _interopRequireDefault(require('./config'));

var _ldUiHooks = require('../hooks/ld-ui-hooks');

var _tITLPopup = _interopRequireDefault(require('./tITLPopup'));

var _d3leaflet = require('../../utilities/d3leaflet');

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

/* Define constants
 */
var GEO_JSON_LATITUDE = 1;
var GEO_JSON_LONGITUDE = 0;
var ORIGIN = 0;
var FIRST_ARROWHEAD = 1;
/**
 * A component to visualize TimeIndexedTypedLocation 's
 *
 *
 * @param {Object} props React properties
 * @param ...
 *
 * @TODO - describe props interface
 *       - add style to props interface
 */

function TimeIndexedTypedLocation(props) {
    /** mapRef */
    var mapRef = (0, _react.useRef)(null);
    /** initialize map */

    (0, _ldUiHooks.useMap)(mapRef, {
        url: _config['default'].MAP[_config['default'].DEFAULT_PROVIDER].PROVIDER,
        attribution: _config['default'].MAP[_config['default'].DEFAULT_PROVIDER].ATTRIBUTION
    });
    /** initialize d3 layer */

    (0, _ldUiHooks.usePane)(mapRef, 'd3-layer', 625);
    /**
   * This function is a d3 transform @see {@link https://github.com/d3/d3-geo/blob/v2.0.0/README.md#transforms|d3-transform} for further infos
   *
   * You can use it like this:
    * @example
   * var transform = d3.geoTransform({ point: projectPoint })
   * var path = d3.geoPath(transform)
   * 
   * You can now project points on an svg surface on a leaflet map
   *
   * @param {number} long Geojson point longitude
   * @param {number} lat Geojson point latitude
   */

    function projectGeoPointToLeafletSvg(_long, lat) {
        var point = mapRef.current.latLngToLayerPoint(new _leaflet['default'].LatLng(lat, _long));
        this.stream.point(point.x, point.y);
    }

    var path = (0, _d3leaflet.leafletTransform)(projectGeoPointToLeafletSvg);
    (0, _react.useEffect)(function () {
        console.log(props.timeIndexedTypedLocations);
        /* Defining an svg layer for D3 
    ________________________________*/

        var svg = d3.select(mapRef.current.getPane('d3-layer')).append('svg').attr('style', 'position:relative');
        var g = svg.append('g').attr('class', 'leaflet-zoom-hide');
        /* Iterating over data:
       - Creating markers and popup (Leaflet layer) 
       - Preparing GeoJSON for D3 Layer  
    ___________________________________*/

        var mcg = _leaflet['default'].markerClusterGroup({
            iconCreateFunction: function iconCreateFunction(cluster) {
                return _leaflet['default'].divIcon({
                    html: ''.concat(_config['default'].MARKER_ICON[1](cluster.getChildCount())),
                    className: 'cluster-icon',
                    iconAnchor: [15, 50]
                });
            }
        }).on(_config['default'].POPUP.OPEN_CLUSTER, function (e) {
            e.layer.spiderfy();
        });

        var geoJSON = {
            type: 'FeatureCollection',
            features: []
        };
        sortByTime(props.timeIndexedTypedLocations);
        props.timeIndexedTypedLocations.forEach(function (tITL, index) {
            geoJSON.features.push({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [parseFloat(tITL.longitude), parseFloat(tITL.latitude)]
                }
            });
            var markerPosition = [geoJSON.features[index].geometry.coordinates[GEO_JSON_LATITUDE], geoJSON.features[index].geometry.coordinates[GEO_JSON_LONGITUDE]];
            var popupContent = {
                city: tITL.city,
                siteLabel: tITL.siteLabel,
                timeInterval: ''.concat(tITL.startTime, ' - ').concat(tITL.endTime !== '' ? tITL.endTime : 'Today'),
                locationType: tITL.locationType
            };

            var popup = _leaflet['default'].popup().setContent((0, _tITLPopup['default'])(popupContent)).setLatLng(markerPosition);

            _leaflet['default'].marker(markerPosition, {
                icon: _config['default'].MARKER_ICON[0]
            }).addTo(mcg).bindPopup(popup).on(_config['default'].POPUP.OPEN, function (e) {
                this.openPopup();
            }).on(_config['default'].POPUP.CLOSE, function (e) {
                this.closePopup();
            });
        });
        /* Add marker to maps and fit zoom
    ___________________________________ */

        mapRef.current.fitBounds(mcg.getBounds(), {
            padding: [120, 120]
        });
        mapRef.current.addLayer(mcg);
        /* Draw line connecting locations and arrowheads
    _________________________________________________*/

        var linePath = g.selectAll('.locationsLine').data([geoJSON.features]).enter().append('path').attr('class', 'locationsLine').attr('style', 'stroke:'.concat(_config['default'].ARROW.COLOR));
        var arrowheads = g.selectAll('.arrowheads').data(geoJSON.features).enter().append('svg:path').attr('class', 'arrowheads').attr('d', d3.symbol().type(d3.symbolTriangle).size(_config['default'].ARROW.ARROWHEAD_SIZE)).style('stroke', 'blue').style('fill', 'blue');
        var depiction = g.append('svg:image').attr('x', -20).attr('y', -20).attr('height', 60).attr('width', 50).attr('xlink:href', props.timeIndexedTypedLocations[0].depiction);
        var arrowheadsNodes;
        mapRef.current.on('zoomend', adaptD3Layer);
        adaptD3Layer();

        function adaptD3Layer() {
            // Get bounding box of points / coordinates / data / markers in the map
            var bounds = path.bounds(geoJSON),
                topLeft = bounds[0],
                bottomRight = bounds[1]; // Setting the size and location of the overall SVG container

            (0, _d3leaflet.fitSvg)(svg, bounds); // translate group

            g.attr('transform', 'translate('.concat(-topLeft[0] + 50, ',').concat(-topLeft[1] + 50, ')'));
            depiction.attr('transform', function () {
                var x = geoJSON.features[ORIGIN].geometry.coordinates[GEO_JSON_LONGITUDE];
                var y = geoJSON.features[ORIGIN].geometry.coordinates[GEO_JSON_LATITUDE];
                return 'translate('.concat(mapRef.current.latLngToLayerPoint(new _leaflet['default'].LatLng(y, x)).x, ',').concat(mapRef.current.latLngToLayerPoint(new _leaflet['default'].LatLng(y, x)).y, ')');
            }); // make arrowheads transparent

            arrowheadsNodes = arrowheads.nodes(); // make arrowheads transparent at first time

            arrowheadsNodes.forEach(function (a) {
                a.style.opacity = 0;
            }); // translate and rotate arrowheads

            arrowheads.attr('transform', function (d, i) {
                if (i === ORIGIN) {
                    return;
                }

                var rotationAngle = (0, _math.getAngle)(arrowheadsNodes[i].__data__.geometry.coordinates, arrowheadsNodes[i - 1].__data__.geometry.coordinates);
                return 'translate('.concat((0, _d3leaflet.getLayerPoint)(d, mapRef.current).x, ',').concat((0, _d3leaflet.getLayerPoint)(d, mapRef.current).y, ') rotate(').concat(rotationAngle, ')');
            }); // https://stackoverflow.com/a/25946400/12506641 check this for arc

            linePath.attr('d', (0, _d3leaflet.projectLine)(mapRef.current));
            moveLine();
        }

        function moveLine() {
            linePath.transition().ease(d3.easeLinear).duration(_config['default'].TRANSITION_DURATION).attrTween('stroke-dasharray', tweenDash);
        }

        function tweenDash() {
            return function (t) {
                //total length of path (single value)
                var l = linePath.node().getTotalLength();
                var interpolate = d3.interpolateString('0,'.concat(l), ''.concat(l, ',').concat(l)); // p is the point on the line (coordinates) at a given length
                // along the line. In this case if l=50 and we're midway through
                // the time then this would 25.

                var p = linePath.node().getPointAtLength(t * l); // if there's some arrow to appear

                if (arrowheadsNodes[FIRST_ARROWHEAD]) {
                    var arrow = (0, _d3leaflet.getLayerPoint)(arrowheadsNodes[FIRST_ARROWHEAD].__data__, mapRef.current);
                    var tolerance = 5;

                    if ((0, _d3leaflet.passOver)([p.x, p.y], [arrow.x, arrow.y], tolerance)) {
                        arrowheadsNodes[FIRST_ARROWHEAD].style.opacity = 1; // make arrowhead visible

                        arrowheadsNodes.splice(FIRST_ARROWHEAD, 1); // remove from arrowheads to appear
                    }
                } //Move the image to that point


                depiction.attr('transform', 'translate('.concat(p.x, ',').concat(p.y, ')'));
                return interpolate(t);
            };
        }
    }, []);
    return /*#__PURE__*/_react['default'].createElement('div', null, /*#__PURE__*/_react['default'].createElement('div', {
        id: 'map'
    }));
}
/**
 * Sort the resources by time
 * modify the original array
 *
 * @param {Object[]} timeIndexedTypedLocations
 */


function sortByTime(timeIndexedTypedLocations) {
    timeIndexedTypedLocations.sort(function (a, b) {
        return parseInt(a.startTime) - parseInt(b.startTime);
    });
    return timeIndexedTypedLocations;
}
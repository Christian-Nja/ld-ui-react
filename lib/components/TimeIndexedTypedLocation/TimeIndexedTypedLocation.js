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
var DARK_PROVIDER = 0;
var DAY_PROVIDER = 1;
var GEO_JSON_LATITUDE = 1;
var GEO_JSON_LONGITUDE = 0;
/**
 *
 * @param {Object} props React properties
 */

function TimeIndexedTypedLocation(props) {
    /** mapRef */
    var mapRef = (0, _react.useRef)(null);
    /** initialize map */

    (0, _ldUiHooks.useMap)(mapRef, {
        url: _config['default'].MAP[DAY_PROVIDER].PROVIDER,
        attribution: _config['default'].MAP[DAY_PROVIDER].ATTRIBUTION
    });
    /** initialize d3 layer */

    (0, _ldUiHooks.usePane)(mapRef, 'd3-layer');
    /**
   * Prepare d3 functions
   */

    var projectLine = d3.line().x(function (d) {
        return getLayerPoint(d).x;
    }).y(function (d) {
        return getLayerPoint(d).y;
    }).curve(d3.curveLinear); // this is used just to get bounds of d3 layer

    var transform = d3.geoTransform({
            point: projectGeoPointToLeafletSvg
        }),
        path = d3.geoPath().projection(transform); // transform and map geoJson to map

    /**
   * inputs a GeoJSON data and returns the projected leaflet svg point
   * coordinates
   *
   * @param {object} d GeoJSON Point @see {@link https://en.wikipedia.org/wiki/GeoJSON|GeoJSON}
   * @returns {object} Leaflet Point @see {@link https://leafletjs.com/reference-1.7.1.html#point|Leaflet_Point}
   */

    function getLayerPoint(d) {
        var x = d.geometry.coordinates[GEO_JSON_LATITUDE];
        var y = d.geometry.coordinates[GEO_JSON_LONGITUDE];
        return mapRef.current.latLngToLayerPoint(new _leaflet['default'].LatLng(x, y));
    }
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
    /**
   * THE VISUALIZATION EFFECT
   */


    (0, _react.useEffect)(function () {
    /* Defining an svg layer for D3 
    ________________________________*/
        var svg = d3.select(mapRef.current.getPane('d3-layer')).append('svg').attr('style', 'position:relative');
        var g = svg.append('g').attr('class', 'leaflet-zoom-hide');
        /* Iterating over data:
       - Creating markers and popup (Leaflet layer) 
       - Preparing GeoJSON for D3 Layer  @TODO: evaluate if moving markers on d3 layer
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
                timeInterval: ''.concat(tITL.startTime, ' - ').concat(tITL.endTime !== '' ? tITL.endTime : 'Today')
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
        /* Draw line connecting locations  
    ____________________________________*/

        var linePath = g.selectAll('.locationsLine').data([geoJSON.features]).enter().append('path').attr('class', 'locationsLine').attr('style', 'stroke:'.concat(_config['default'].ARROW.COLOR)); // This will be our traveling circle it will
        // travel along our path

        var travelMarker = g.append('circle').attr('r', 10).attr('id', 'marker').attr('class', 'travelMarker');
        mapRef.current.on('zoomend', adaptD3Layer);
        adaptD3Layer();
        moveCulturalProperty();

        function adaptD3Layer() {
            // Get bounding box of points
            var bounds = path.bounds(geoJSON),
                topLeft = bounds[0],
                bottomRight = bounds[1]; // Setting the size and location of the overall SVG container

            svg.attr('width', bottomRight[0] - topLeft[0] + 120).attr('height', bottomRight[1] - topLeft[1] + 120).style('left', topLeft[0] - 50 + 'px').style('top', topLeft[1] - 50 + 'px'); // translate group

            g.attr('transform', 'translate('.concat(-topLeft[0] + 50, ',').concat(-topLeft[1] + 50, ')'));
            travelMarker.attr('transform', function () {
                var START_POINT = 0;
                var x = geoJSON.features[START_POINT].geometry.coordinates[GEO_JSON_LONGITUDE];
                var y = geoJSON.features[START_POINT].geometry.coordinates[GEO_JSON_LATITUDE];
                return 'translate('.concat(mapRef.current.latLngToLayerPoint(new _leaflet['default'].LatLng(y, x)).x, ',').concat(mapRef.current.latLngToLayerPoint(new _leaflet['default'].LatLng(y, x)).y, ')');
            });
            linePath.attr('d', projectLine);
        }

        function moveCulturalProperty() {
            linePath.transition().duration(_config['default'].TRANSITION_DURATION).attrTween('stroke-dasharray', tweenDash);
        }

        function tweenDash() {
            return function (t) {
                //total length of path (single value)
                var l = linePath.node().getTotalLength();
                var interpolate = d3.interpolateString('0,'.concat(l), ''.concat(l, ',').concat(l)); //t is fraction of time 0-1 since transition began

                var marker = d3.select('#marker'); // p is the point on the line (coordinates) at a given length
                // along the line. In this case if l=50 and we're midway through
                // the time then this would 25.

                var p = linePath.node().getPointAtLength(t * l); //Move the marker to that point

                marker.attr('transform', 'translate('.concat(p.x, ',').concat(p.y, ')'));
                return interpolate(t);
            };
        }
    }, []);
    return /*#__PURE__*/_react['default'].createElement('div', null, _config['default'].DEPICTION ? /*#__PURE__*/_react['default'].createElement('img', {
        className: 'depiction',
        src: props.timeIndexedTypedLocations[0].depiction
    }) : null, /*#__PURE__*/_react['default'].createElement('div', {
        id: 'map'
    }));
}
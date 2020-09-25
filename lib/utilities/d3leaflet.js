'use strict';

function _typeof(obj) { '@babel/helpers - typeof'; if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.projectLine = projectLine;
exports.getLayerPoint = getLayerPoint;
exports.leafletTransform = leafletTransform;
exports.fitSvg = fitSvg;

var d3 = _interopRequireWildcard(require('d3'));

var _leaflet = _interopRequireDefault(require('leaflet'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== 'function') return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== 'object' && typeof obj !== 'function') { return { 'default': obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj['default'] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var GEO_JSON_LATITUDE = 1;
var GEO_JSON_LONGITUDE = 0;
var TOP_LEFT = 0;
var BOTTOM_RIGHT = 1;
var X = 0;
var Y = 1;
/**
 * Use the function to connect points on a leaflet map
 * @example
 * let linePath = g
 *                .selectAll(".locationsLine")
 *                .data([geoJSON.features])
 *                .enter()
 *                .append("path")
 *                .attr("class", "locationsLine")
 *
 *
 * linePath.attr("d", projectLine(leafletMap));
 *
 * @param {object} map Leaflet Map @see {}
 */

function projectLine(map) {
    return d3.line().x(function (d) {
        return getLayerPoint(d, map).x;
    }).y(function (d) {
        return getLayerPoint(d, map).y;
    }).curve(d3.curveLinear);
}
/**
 * inputs a GeoJSON data and returns the projected leaflet svg point
 * coordinates
 *
 * @param {object} d GeoJSON Point @see {@link https://en.wikipedia.org/wiki/GeoJSON|GeoJSON}
 * @returns {object} Leaflet Point @see {@link https://leafletjs.com/reference-1.7.1.html#point|Leaflet_Point}
 */


function getLayerPoint(d, map) {
    var x = d.geometry.coordinates[GEO_JSON_LATITUDE];
    var y = d.geometry.coordinates[GEO_JSON_LONGITUDE];
    return map.latLngToLayerPoint(new _leaflet['default'].LatLng(x, y));
}

function leafletTransform(transform) {
    return d3.geoPath().projection(d3.geoTransform({
        point: transform
    }));
}
/**
 * Fit svg to canvas to contain all the points
 *
 * @param {object} svg the svg d3 canvas to fit in Leaflet map
 * @param {*} bounds bounds of all the GeoJSON points
 */


function fitSvg(svg, bounds) {
    var widthHeightOffset = 120;
    svg.attr('width', bounds[BOTTOM_RIGHT][X] - bounds[TOP_LEFT][X] + widthHeightOffset).attr('height', bounds[BOTTOM_RIGHT][Y] - bounds[TOP_LEFT][Y] + widthHeightOffset).style('left', bounds[TOP_LEFT][X] - 50 + 'px').style('top', bounds[TOP_LEFT][Y] - 50 + 'px');
}
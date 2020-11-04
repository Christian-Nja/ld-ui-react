'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.useMap = useMap;
exports.usePane = usePane;
exports.useWindowDimensions = useWindowDimensions;

var _react = require('react');

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === 'string') return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) n = o.constructor.name; if (n === 'Map' || n === 'Set') return Array.from(o); if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === 'undefined' || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return'] != null) _i['return'](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Display a Leaflet map in react component
 *
 * @param {Object} mapRef
 * @param {Object} mapProvider
 * @param {string} mapProvider.url
 * @param {string} mapProvider.attribution
 */
function useMap(mapRef, mapProvider) {
    (0, _react.useEffect)(function () {
    /** mounts map */
        mapRef.current = L.map('map', {
            center: [0, 0],
            zoom: 1,
            layers: [L.tileLayer(mapProvider.url, {
                attribution: mapProvider.attribution
            })],
            zoomControl: false,
            attributionControl: false
        });
        return function cleanup() {
            mapRef.current.remove();
        };
    }, []);
}
/**
 * Mount a pane to the Leaflet map.
 * You can mount a layer for d3 or other graphic libraries or FeatureGroups.
 *
 * @param {Object} mapRef a ref to a Leaflet map
 * @param {string} paneName a name for the pane
 * @param {number} paneZIndex default 450
 */


function usePane(mapRef, paneName) {
    var paneZIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 450;
    (0, _react.useEffect)(function () {
        mapRef.current.createPane(paneName);
        mapRef.current.getPane(paneName).style.zIndex = paneZIndex; // overlay-pane is 400 https://github.com/Leaflet/Leaflet/blob/v1.0.0/dist/leaflet.css#L87

        mapRef.current.getPane(paneName).style.pointerEvents = 'none';
    }, []);
}
/**
 * Returns window dimensions, listening to resize event.
 *
 * Example:
 *
 * const Component = () => {
 *     const { height, width } = useWindowDimensions();
 * }
 */


function useWindowDimensions() {
    var _useState = (0, _react.useState)(getWindowDimensions()),
        _useState2 = _slicedToArray(_useState, 2),
        windowDimensions = _useState2[0],
        setWindowDimensions = _useState2[1];

    (0, _react.useEffect)(function () {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return function () {
            return window.removeEventListener('resize', handleResize);
        };
    }, []);
    return windowDimensions;
}
/**
 * Returns an object with browser window dimension
 * @returns {Object} {width, height}
 */


function getWindowDimensions() {
    var _window = window,
        width = _window.innerWidth,
        height = _window.innerHeight;
    return {
        width: width,
        height: height
    };
}
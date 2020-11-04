'use strict';

function _typeof(obj) { '@babel/helpers - typeof'; if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = PatternNetwork;

var _react = _interopRequireWildcard(require('react'));

var _reactSigma = require('react-sigma');

var _graphology = require('graphology');

require('./PatternNetwork.css');

var _ldUiHooks = require('../hooks/ld-ui-hooks');

function _getRequireWildcardCache() { if (typeof WeakMap !== 'function') return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== 'object' && typeof obj !== 'function') { return { 'default': obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj['default'] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === 'undefined' || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === 'number') { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError('Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it['return'] != null) it['return'](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === 'string') return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) n = o.constructor.name; if (n === 'Map' || n === 'Set') return Array.from(o); if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === 'undefined' || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return'] != null) _i['return'](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// define keys to semantically access elements
var SUB_PATTERN = 'subPattern';
var SUPER_PATTERN = 'pattern'; // globals

var containerID = 'graph-container';

function PatternNetwork(props) {
    var _useWindowDimensions = (0, _ldUiHooks.useWindowDimensions)(),
        height = _useWindowDimensions.height,
        width = _useWindowDimensions.width;

    var containerStyle = {
        height: height * 80 / 100,
        // 80%
        width: width
    };
    var simpleGraph = {
        nodes: [{
            id: 'id0',
            label: 'Tom'
        }, {
            id: 'id1',
            label: 'Jerry'
        }],
        edges: [{
            id: 'e0',
            source: 'id0',
            target: 'id1',
            label: 'eat'
        }]
    };

    var _useState = (0, _react.useState)(new _graphology.DirectedGraph()),
        _useState2 = _slicedToArray(_useState, 2),
        g = _useState2[0],
        setGraph = _useState2[1];

    (0, _react.useEffect)(function () {
        var updateG = new _graphology.DirectedGraph();

        if (props.patterns.patternSpecializations) {
            // for (const specialization of props.patterns
            //     .patternSpecializations) {
            //     const subPattern = specialization[SUB_PATTERN];
            //     const superPattern = specialization[SUPER_PATTERN];
            //     if (!g.hasNode(subPattern)) {
            //         let patternLabel = extractPatternNameFromURI(subPattern);
            //         g.addNode(subPattern, {
            //             label: patternLabel,
            //         });
            //     }
            //     if (!g.hasNode(superPattern)) {
            //         let patternLabel = extractPatternNameFromURI(superPattern);
            //         g.addNode(superPattern, {
            //             label: patternLabel,
            //         });
            //     }
            //     if (!g.hasEdge(superPattern, subPattern)) {
            //         g.addEdge(superPattern, subPattern, {});
            //     }
            // }
            updateG.addNode('id0', {
                label: 'Tom'
            });
            updateG.addNode('id1', {
                label: 'Jerry'
            });
            updateG.addEdge('id0', 'id1');
        }

        console.log(updateG.asSigmaGraph());
        setGraph(updateG);
    }, [props.patterns.patternSpecializations]);
    return /*#__PURE__*/_react['default'].createElement(_reactSigma.Sigma, {
        renderer: 'webgl',
        style: containerStyle,
        onOverNode: function onOverNode(e) {
            return console.log('Mouse over node');
        },
        graph: g.asSigmaGraph(),
        settings: {
            drawEdges: true,
            clone: false
        }
    }, /*#__PURE__*/_react['default'].createElement(_reactSigma.RelativeSize, {
        initialSize: 15
    }), /*#__PURE__*/_react['default'].createElement(_reactSigma.RandomizeNodePositions, null));
}
/**
 * Extract name of a pattern From URI
 * it works for '/' namespaces.
 *
 * Warning: Not working for '#' namespaces yet
 *
 * @param {String} uri pattern uri
 */


function extractPatternNameFromURI(uri) {
    var uriChunks = uri.split('/');
    return uriChunks[uriChunks.length - 1];
}
/**
 * Extension of graphology implementation
 */


_graphology.DirectedGraph.prototype.sigmaNodes = function () {
    var nodes = [];

    var _iterator = _createForOfIteratorHelper(this.nodeEntries()),
        _step;

    try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = _slicedToArray(_step.value, 2),
                node = _step$value[0],
                attributes = _step$value[1];

            nodes.push(_objectSpread({
                id: node
            }, attributes));
        }
    } catch (err) {
        _iterator.e(err);
    } finally {
        _iterator.f();
    }

    return nodes;
};

_graphology.DirectedGraph.prototype.sigmaEdges = function () {
    var edges = [];

    var _iterator2 = _createForOfIteratorHelper(this.edgeEntries()),
        _step2;

    try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _step2$value = _slicedToArray(_step2.value, 4),
                edge = _step2$value[0],
                attributes = _step2$value[1],
                source = _step2$value[2],
                target = _step2$value[3];

            // HERE check if attributes is a subObject and you need to pass it attributes:attributes
            edges.push(_objectSpread({
                id: edge,
                source: source,
                target: target
            }, attributes));
        }
    } catch (err) {
        _iterator2.e(err);
    } finally {
        _iterator2.f();
    }

    return edges;
};

_graphology.DirectedGraph.prototype.asSigmaGraph = function () {
    var g = {
        nodes: this.sigmaNodes(),
        edges: this.sigmaEdges()
    };
    console.log(g);
    return {
        nodes: this.sigmaNodes(),
        edges: this.sigmaEdges()
    };
};
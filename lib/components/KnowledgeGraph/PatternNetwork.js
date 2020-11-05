'use strict';

function _typeof(obj) { '@babel/helpers - typeof'; if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _graphin = _interopRequireWildcard(require('@antv/graphin'));

require('@antv/graphin/dist/index.css');

require('./PatternNetwork.css');

var _ldUiHooks = require('../hooks/ld-ui-hooks');

var _uri = require('../../utilities/uri');

function _getRequireWildcardCache() { if (typeof WeakMap !== 'function') return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== 'object' && typeof obj !== 'function') { return { 'default': obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj['default'] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Don't forget to import css

/**
 * css
 */
//# define CONSTANTS
var SUB_PATTERN = 'subPattern';
var SUPER_PATTERN = 'pattern'; // globals

var containerID = 'graph-container';
var specializationEdgeColor = '#000';
var compositionEdgeColor = '#000';

function PatternNetwork(props) {
    var _useWindowDimensions = (0, _ldUiHooks.useWindowDimensions)(),
        height = _useWindowDimensions.height,
        width = _useWindowDimensions.width;

    var containerStyle = {
        height: height * 80 / 100,
        // 80%
        width: width
    };
    console.log(props);

    var data = _graphin.Utils.mock(10).circle().graphin();

    console.log(data);

    if (props.patterns.patternSpecializations || props.patterns.patternCompositions) {
        return /*#__PURE__*/_react['default'].createElement(_graphin['default'], {
            data: transform(props.patterns.patternSpecializations)
        });
    } else {
        return null;
    }
}

var _default = PatternNetwork;
exports['default'] = _default;

var transform = function transform(relations) {
    if (relations) {
        var nodes = [];
        var edges = [];
        relations.map(function (relation) {
            var subPattern = relation[SUB_PATTERN];
            var superPattern = relation[SUPER_PATTERN];

            if (!nodes.find(function (node) {
                return node.id === subPattern;
            })) {
                nodes.push({
                    id: subPattern,
                    label: (0, _uri.getURILabel)(subPattern),
                    data: subPattern,
                    shape: 'CircleNode',
                    type: 'company',
                    style: {
                        nodeSize: 24
                    }
                });
            }

            if (!nodes.find(function (node) {
                return node.id === superPattern;
            })) {
                nodes.push({
                    id: superPattern,
                    label: (0, _uri.getURILabel)(superPattern),
                    data: subPattern,
                    shape: 'CircleNode',
                    type: 'company',
                    style: {
                        nodeSize: 24
                    }
                });
            }

            var edgeId = ''.concat(subPattern, '->').concat(superPattern);

            if (!edges.find(function (edge) {
                return edge.id === edgeId;
            })) {
                edges.push({
                    id: edgeId,
                    data: edgeId,
                    source: superPattern,
                    target: subPattern
                });
            }
        });
        console.log({
            nodes: nodes,
            edges: edges
        });
        return {
            nodes: nodes,
            edges: edges
        };
    }
};
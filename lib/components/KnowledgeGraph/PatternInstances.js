'use strict';

function _typeof(obj) { '@babel/helpers - typeof'; if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = PatternInstances;

var _react = _interopRequireWildcard(require('react'));

var _graphin = _interopRequireDefault(require('@antv/graphin'));

var _Graph = _interopRequireDefault(require('../classes/Graph'));

var _PatternMenu = _interopRequireDefault(require('./PatternMenu'));

var _ldUiHooks = require('../hooks/ld-ui-hooks');

require('@antv/graphin/dist/index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== 'function') return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== 'object' && typeof obj !== 'function') { return { 'default': obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj['default'] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function PatternInstances(props) {
    var graphRef = (0, _react.useRef)(null);
    var layoutHandler = (0, _ldUiHooks.useLayout)();
    var graph = new _Graph['default']();
    graph.addNodes(props.instances.map(function (instance) {
        return {
            id: instance.instance
        };
    }));

    var filter = function filter(node, id) {
        node.style.primaryColor = graph.nodeGradient()[id];
        console.log('node size');
        console.log(node.syle.nodeSize);
        console.log('new size');
        console.log(graph.degree(node) * node.style.nodeSize);
        node.style.nodeSize = graph.degree(node) * node.style.nodeSize;
    };

    graph.breadthFirstSearch(filter);
    return /*#__PURE__*/_react['default'].createElement('div', {
        style: props.graphContainerStyle
    }, /*#__PURE__*/_react['default'].createElement(_PatternMenu['default'], {
        layoutHandler: layoutHandler
    }), /*#__PURE__*/_react['default'].createElement(_graphin['default'], {
        data: graph.toJson(),
        layout: layoutHandler.name,
        ref: graphRef
    }));
}
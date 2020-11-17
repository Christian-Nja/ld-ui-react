'use strict';

function _typeof(obj) { '@babel/helpers - typeof'; if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = PatternNetwork;

var _react = _interopRequireWildcard(require('react'));

var _generics = require('../../utilities/generics');

var _math = require('../../utilities/math');

var _Graph = _interopRequireDefault(require('../classes/Graph'));

var _SelectButton = _interopRequireDefault(require('./SelectButton'));

var _PatternMenu = _interopRequireDefault(require('./PatternMenu'));

var _PatternList = _interopRequireDefault(require('../classes/PatternList'));

require('./PatternNetwork.css');

var _graphin = _interopRequireDefault(require('@antv/graphin'));

var _graphinComponents = require('@antv/graphin-components');

require('@antv/graphin/dist/index.css');

var _ldUiHooks = require('../hooks/ld-ui-hooks');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== 'function') return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== 'object' && typeof obj !== 'function') { return { 'default': obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj['default'] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// React
// Class and functions
// Components for Patterns
// Graphin Components
// Don't forget to import css
// a defined hook for graphin layout
function PatternNetwork(props) {
    // parse and initialize props
    var specializations = (0, _generics.defineProp)(props.patterns.specializations, []);
    var compositions = (0, _generics.defineProp)(props.patterns.compositions, []);
    var list = (0, _generics.defineProp)(props.patterns.list, []); // graphRef for mix React virtual DOM and graphin imperative operation on DOM

    var graphRef = (0, _react.useRef)(null); // pass this to PatternMenu component to have a panel to switch layouts

    var layoutHandler = (0, _ldUiHooks.useLayout)(); // an intermidiate class that receives pattern data and creates a graph to be passed to Graphin instance

    var graph = new _Graph['default']();
    var patternList = new _PatternList['default'](list); // add specialization relations to graph

    graph.addRelations(specializations, _Graph['default'].relType.SUB, 'CircleNode', 24); // add compositions relations to graph pattern

    graph.addRelations(compositions, _Graph['default'].relType.COMPONENT, 'CircleNode', 24); // this filter is passed to a bfs algorithm to apply colors and size scaling to every node
    // we use bfs to assign similar color to semantically close nodes

    var nodeColorSizeFilter = function nodeColorSizeFilter(node, id) {
    // set colors according to a gradient
        node.style.primaryColor = graph.nodeGradient()[id]; // set size as a proportion of occurrences

        var occurences = patternList.getOccurencesByPattern(node.id);
        node.style.nodeSize = occurences < 300 ? 12 + occurences : 12 + 300 + occurences * 0.01;
        console.log(node.style.nodeSize);
    };

    graph.breadthFirstSearch(nodeColorSizeFilter); // on node double click load pattern instances

    (0, _ldUiHooks.useGraphinDoubleClick)(graphRef, props.getInstances);
    return /*#__PURE__*/_react['default'].createElement('div', {
        style: graphContainerStyle
    }, /*#__PURE__*/_react['default'].createElement(_PatternMenu['default'], {
        layoutHandler: layoutHandler,
        getInstances: props.getInstances
    }), /*#__PURE__*/_react['default'].createElement(_graphin['default'], {
        data: graph.toJson(),
        ref: graphRef,
        layout: layoutHandler.name
    }, /*#__PURE__*/_react['default'].createElement(_graphinComponents.ContextMenu, null)));
}

var graphContainerStyle = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto'
};
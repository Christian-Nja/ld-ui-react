'use strict';

function _typeof(obj) { '@babel/helpers - typeof'; if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = PatternInstancesNetwork;

var _react = _interopRequireWildcard(require('react'));

var _Graph = _interopRequireDefault(require('../classes/Graph'));

var _generics = require('../../utilities/generics');

var _PatternList = _interopRequireDefault(require('../classes/PatternList'));

var _PatternMenu = _interopRequireDefault(require('./PatternMenu'));

var _graphin = _interopRequireDefault(require('@antv/graphin'));

var _ldUiHooks = require('../hooks/ld-ui-hooks');

require('@antv/graphin/dist/index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== 'function') return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== 'object' && typeof obj !== 'function') { return { 'default': obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj['default'] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// React
// function and classes
// Pattern components
// Graphin components
function PatternInstancesNetwork(props) {
    console.log(props); // graphRef for mix React virtual DOM and graphin imperative operation on DOM

    var graphRef = (0, _react.useRef)(null); // parse instances

    var instances = (0, _generics.defineProp)(props.patterns.instances, []);
    var instancesList = new _PatternList['default'](instances); // pass this to Layout component to have a panel to switch layouts

    var layoutHandler = (0, _ldUiHooks.useLayout)(); // an intermidiate class that receives pattern data and creates a graph to be passed to Graphin instance

    var graph = new _Graph['default'](); // add instances to Graph

    graph.addNodes(instances.map(function (instance) {
        return {
            id: instance.instance
        };
    })); // TODO: set a color for each instance, set size based on node degree

    var filter = function filter(node, id) {
    // node.style.primaryColor = graph.nodeGradient()[id];
        node.style.primaryColor = graph.nodeGradient()[2];
        var degree = instancesList.getDegreeByPattern(node.id);
        node.style.nodeSize = degree * node.style.nodeSize;
    };

    graph.breadthFirstSearch(filter); // on instance doubleclick visualize instance

    (0, _ldUiHooks.useGraphinDoubleClick)(graphRef, props.getInstance);
    return /*#__PURE__*/_react['default'].createElement('div', {
        style: graphContainerStyle
    }, /*#__PURE__*/_react['default'].createElement(_PatternMenu['default'], {
        layoutHandler: layoutHandler
    }), /*#__PURE__*/_react['default'].createElement(_graphin['default'], {
        data: graph.toJson(),
        layout: layoutHandler.name,
        ref: graphRef
    }));
} // TODO: pass this to global theme useContext react mechanism


var graphContainerStyle = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto'
};
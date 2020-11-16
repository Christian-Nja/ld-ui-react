'use strict';

function _typeof(obj) { '@babel/helpers - typeof'; if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = PatternNetwork;

var _react = _interopRequireWildcard(require('react'));

var _generics = require('../../utilities/generics');

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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError('Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'); }

function _iterableToArray(iter) { if (typeof Symbol !== 'undefined' && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === 'string') return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) n = o.constructor.name; if (n === 'Map' || n === 'Set') return Array.from(o); if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === 'undefined' || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return'] != null) _i['return'](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// globals TODO : REMOVE and set only OCCURENCES SWITCH
var OCCURENCES_SWITCH = 0;
var PATTERN_DEGREE_SWITCH = 1;

function PatternNetwork(props) {
    // parse and initialize props
    var specializations = (0, _generics.defineProp)(props.patterns.specializations, []);
    var compositions = (0, _generics.defineProp)(props.patterns.compositions, []);
    var list = (0, _generics.defineProp)(props.patterns.list, []); // graphRef for mix React virtual DOM and graphin imperative operation on DOM

    var graphRef = (0, _react.useRef)(null); // node selected with right click menu

    var _useState = (0, _react.useState)([]),
        _useState2 = _slicedToArray(_useState, 2),
        selectedNodes = _useState2[0],
        setSelectedNodes = _useState2[1]; // clicked node


    var _useState3 = (0, _react.useState)(null),
        _useState4 = _slicedToArray(_useState3, 2),
        clicked = _useState4[0],
        setClicked = _useState4[1];

    var _useState5 = (0, _react.useState)(OCCURENCES_SWITCH),
        _useState6 = _slicedToArray(_useState5, 2),
        nodeSizeSwitch = _useState6[0],
        setNodeSizeSwitch = _useState6[1]; // pass this to PatternMenu component to have a panel to switch layouts


    var layoutHandler = (0, _ldUiHooks.useLayout)(); // an intermidiate class that receives pattern data and creates a graph to be passed to Graphin instance

    var graph = new _Graph['default']();
    var patternList = new _PatternList['default'](list); // add specialization relations to graph

    graph.addRelations(specializations, _Graph['default'].relType.SUB, 'CircleNode', 24); // add compositions relations to graph pattern

    graph.addRelations(compositions, _Graph['default'].relType.COMPONENT, 'CircleNode', 24); // this filter is passed to a bfs algorithm to apply colors and size scaling to every node
    // we use bfs to assign similar color to semantically close nodes

    var filter = function filter(node, id) {
    // set colors according to a gradient
        node.style.primaryColor = graph.nodeGradient()[id]; // set size

        switch (nodeSizeSwitch) {
            case OCCURENCES_SWITCH:
                node.style.nodeSize = graph.degree(node) * node.style.nodeSize;
                break;

            case PATTERN_DEGREE_SWITCH:
                node.style.nodeSize = patternList.getOccurencesByPattern(node.id) * node.style.nodeSize;
                break;
        }
    };

    graph.breadthFirstSearch(filter); // effect to handle node click and selected nodes

    (0, _react.useEffect)(function () {
        var graph = graphRef.current.graph;
        graph.on('node:click', function (e) {
            var nodeId = e.item._cfg.id;
            console.log(e); // console.log("node click");
            // console.log(e.item);
            // console.log("graph");
            // console.log(graphRef.current);

            setClicked(nodeId);
        });
        graph.on('canvas:click', function (e) {
            setClicked(null);
        }); // on double click trigger getInstances

        graph.on('node:dblclick', function (e) {
            var nodeId = e.item._cfg.id;
            props.getInstances([nodeId]);
        }); // TODO: return graph.off(...registered events)
    }, []); // options for right-click-on-node menu

    var menuOptions = [{
        key: 'select',
        title: '',
        visible: true,
        iconType: /*#__PURE__*/_react['default'].createElement(_SelectButton['default'], {
            active: selectedNodes.includes(clicked) ? true : false
        }),
        onClick: function onClick(e) {
            // find node selected in the Graphin instance
            var nodes = e.graph.findAllByState('node', 'selected');
            var nodeId = nodes.map(function (node) {
                return node.get('id');
            })[0]; // add the node to this selection

            if (nodeId.length === 0) {
                console.log('Node not found');
            } else {
                selectedNodes.includes(nodeId) ? setSelectedNodes(function (selectedNodes) {
                    selectedNodes.splice(selectedNodes.indexOf(nodeId), 1);
                    setSelectedNodes(function (selectedNodes) {
                        return _toConsumableArray(selectedNodes);
                    });
                }) : setSelectedNodes(function (selectedNodes) {
                    return [].concat(_toConsumableArray(selectedNodes), [nodeId]);
                });
            }
        }
    }];
    return /*#__PURE__*/_react['default'].createElement('div', {
        style: graphContainerStyle
    }, /*#__PURE__*/_react['default'].createElement(_PatternMenu['default'], {
        layoutHandler: layoutHandler,
        selectedNodes: selectedNodes,
        getInstances: props.getInstances
    }), /*#__PURE__*/_react['default'].createElement(_graphin['default'], {
        data: graph.toJson(),
        ref: graphRef,
        layout: layoutHandler.name // register={{
        //     behavior: (G6) => [
        //         {
        //             mode: "default", // see document of G6 mode for details
        //             options: {},
        //             name: "custom",
        //             register: () => {
        //                 G6.registerBehavior("custom", {}); // see document of  G6 registerBehavior for details
        //             },
        //         },
        //     ],
        // }}

    }, /*#__PURE__*/_react['default'].createElement(_graphinComponents.ContextMenu, null)));
}

var graphContainerStyle = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto'
};
'use strict';

function _typeof(obj) { '@babel/helpers - typeof'; if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = Patterns;

var _react = _interopRequireWildcard(require('react'));

var _propTypes = _interopRequireWildcard(require('prop-types'));

var _SelectButton = _interopRequireDefault(require('./SelectButton'));

var _PatternMenu = _interopRequireDefault(require('./PatternMenu'));

var _ldUiHooks = require('../hooks/ld-ui-hooks');

var _Graph = _interopRequireDefault(require('../classes/Graph'));

var _graphin = _interopRequireDefault(require('@antv/graphin'));

var _graphinComponents = require('@antv/graphin-components');

var _PatternList = _interopRequireDefault(require('../classes/PatternList'));

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

var OCCURENCES_SWITCH = 0;
var PATTERN_DEGREE_SWITCH = 1;

function Patterns(props) {
    var graphRef = (0, _react.useRef)(null);

    var _useState = (0, _react.useState)([]),
        _useState2 = _slicedToArray(_useState, 2),
        selectedNodes = _useState2[0],
        setSelectedNodes = _useState2[1];

    var _useState3 = (0, _react.useState)(null),
        _useState4 = _slicedToArray(_useState3, 2),
        clicked = _useState4[0],
        setClicked = _useState4[1];

    var _useState5 = (0, _react.useState)(OCCURENCES_SWITCH),
        _useState6 = _slicedToArray(_useState5, 2),
        nodeSizeSwitch = _useState6[0],
        setNodeSizeSwitch = _useState6[1];

    var layoutHandler = (0, _ldUiHooks.useLayout)();
    var graph = new _Graph['default']();
    var patternList = new _PatternList['default'](props.patternList);
    graph.addRelations(props.specializations, _Graph['default'].relType.SUB, 'CircleNode', 24);
    graph.addRelations(props.compositions, _Graph['default'].relType.COMPONENT, 'CircleNode', 24);

    var filter = function filter(node, id) {
    // set colors
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

    graph.breadthFirstSearch(filter);
    (0, _react.useEffect)(function () {
        var graph = graphRef.current.graph;
        graph.on('node:click', function (e) {
            var nodeId = e.item._cfg.id;
            setClicked(nodeId);
        });
        graph.on('canvas:click', function (e) {
            setClicked(null);
        });
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
        style: props.graphContainerStyle
    }, /*#__PURE__*/_react['default'].createElement(_PatternMenu['default'], {
        layoutHandler: layoutHandler,
        selectedNodes: selectedNodes,
        getInstances: props.getInstances
    }), /*#__PURE__*/_react['default'].createElement(_graphin['default'], {
        data: graph.toJson(),
        ref: graphRef,
        layout: layoutHandler.name
    }, /*#__PURE__*/_react['default'].createElement(_graphinComponents.ContextMenu, {
        options: menuOptions
    })));
}
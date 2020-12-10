"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = PatternNetwork;

var _react = _interopRequireWildcard(require("react"));

var _generics = require("../../utilities/generics");

var _Graph = _interopRequireDefault(require("../classes/Graph"));

var _math = require("../../utilities/math");

var _PatternMenu = _interopRequireDefault(require("./PatternMenu"));

var _PatternList = _interopRequireDefault(require("../classes/PatternList"));

var _PropertyFilter = _interopRequireDefault(require("./facets/PropertyFilter"));

var _SliderFilter = _interopRequireDefault(require("./facets/SliderFilter"));

var _graphin = _interopRequireDefault(require("@antv/graphin"));

var _graphinComponents = require("@antv/graphin-components");

require("@antv/graphin/dist/index.css");

var _ldUiHooks = require("../hooks/ld-ui-hooks");

require("./PatternNetwork.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function PatternNetwork(props) {
  // parse and initialize props
  var specializations = (0, _generics.defineProp)(props.patterns.specializations, []);
  var compositions = (0, _generics.defineProp)(props.patterns.compositions, []);
  var list = (0, _generics.defineProp)(props.patterns.list, []); // graphRef for mix React virtual DOM and graphin imperative operation on DOM

  var graphRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(new _Graph["default"]()),
      _useState2 = _slicedToArray(_useState, 2),
      graph = _useState2[0],
      setGraph = _useState2[1]; // pass this to PatternMenu component to have a panel to switch layouts


  var layoutHandler = (0, _ldUiHooks.useLayout)(); // list of patterns with occurences for each pattern

  var patternList = new _PatternList["default"](list); // add specialization relations to graph

  graph.addRelations(specializations, _Graph["default"].relType.SUB, "CircleNode", 24); // add compositions relations to graph pattern

  graph.addRelations(compositions, _Graph["default"].relType.COMPONENT, "CircleNode", 24); // this filter is passed to a bfs algorithm to apply colors and size scaling to every node
  // we use bfs to assign similar color to semantically close nodes

  var nodeColorSizeFilter = function nodeColorSizeFilter(node, id) {
    // set colors according to a gradient
    node.style.primaryColor = graph.nodeGradient()[id]; // set size as a proportion of occurrences

    var occurences = patternList.getOccurencesByPattern(node.id); // we add this as we can filter on this with slider filter

    node.data.occurences = occurences;

    if (occurences !== 0) {
      node.style.cursor = "pointer";
    }

    if (occurences === 0) {
      node.style.opacity = 0.3;
    } // compute dynamically max and min degree
    // with 0 occurrences -> -Infinity


    node.style.nodeSize = Math.round((0, _math.scaleData)(occurences, 0, 600, 12, 70));
  };

  graph.breadthFirstSearch(nodeColorSizeFilter);
  var properties = graph.nodes.map(function (node) {
    var occurences = patternList.getOccurencesByPattern(node.id);
    return {
      title: node.label,
      value: occurences,
      color: node.style.primaryColor,
      uri: node.id
    };
  });

  var handleTypeFilter = function handleTypeFilter(filterNodes) {
    graph.addFilter({
      key: "id",
      mask: filterNodes,
      "class": "cat"
    });
    var newData = new _Graph["default"](graph.nodes, graph.edges, graph.filters);
    setGraph(newData);
  }; // on node double click load pattern instances


  (0, _ldUiHooks.useGraphinDoubleClick)(graphRef, props.getInstances);
  (0, _ldUiHooks.useGraphinHover)(graphRef); // min/max

  var instancesRange = [0, 0];
  var occurencesFrequency = [];
  graph.nodes.forEach(function (node) {
    var occur = patternList.getOccurencesByPattern(node.id);
    occurencesFrequency.push(occur);
  });
  occurencesFrequency.sort(function (a, b) {
    return a - b;
  });
  instancesRange = [Math.min.apply(Math, occurencesFrequency), Math.max.apply(Math, occurencesFrequency)];

  var handleSliderFilter = function handleSliderFilter(range) {
    graph.addFilter({
      key: "occurences",
      range: range,
      "class": "num"
    });
    var newData = new _Graph["default"](graph.nodes, graph.edges, graph.filters);
    setGraph(newData);
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: graphContainerStyle
  }, /*#__PURE__*/_react["default"].createElement(_PatternMenu["default"], {
    layoutHandler: layoutHandler,
    getInstances: props.getInstances
  }, /*#__PURE__*/_react["default"].createElement(_PropertyFilter["default"], {
    properties: properties,
    title: "Filter by pattern",
    onFilter: function onFilter(filtered) {
      handleTypeFilter(filtered);
    }
  }), /*#__PURE__*/_react["default"].createElement(_SliderFilter["default"], {
    title: "Filter by number of instances",
    domain: instancesRange,
    onFilter: function onFilter(range) {
      handleSliderFilter(range);
    }
  })), /*#__PURE__*/_react["default"].createElement(_graphin["default"], {
    data: graph.toVisual(),
    ref: graphRef,
    layout: layoutHandler.name,
    options: {
      modes: {
        "default": [{
          type: "tooltip",
          formatText: function formatText(model) {
            var label = model.label,
                id = model.id;
            var text = "occurrences:<br/> ".concat(model.data.occurences);
            return text;
          }
        }]
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(_graphinComponents.ContextMenu, null)));
}

var graphContainerStyle = {
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  margin: "auto"
};
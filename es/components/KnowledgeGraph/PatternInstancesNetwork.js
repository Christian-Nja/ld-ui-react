"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = PatternInstancesNetwork;

var _react = _interopRequireWildcard(require("react"));

var _Graph = _interopRequireDefault(require("../classes/Graph"));

var _generics = require("../../utilities/generics");

var _math = require("../../utilities/math");

var _InstancesList = _interopRequireDefault(require("../classes/InstancesList"));

var _PatternMenu = _interopRequireDefault(require("./PatternMenu"));

var _PropertyFilter = _interopRequireDefault(require("./facets/PropertyFilter"));

var _TimeIntervalFilter = _interopRequireDefault(require("./facets/TimeIntervalFilter"));

var _graphin = _interopRequireDefault(require("@antv/graphin"));

var _ldUiHooks = require("../hooks/ld-ui-hooks");

require("@antv/graphin/dist/index.css");

var _SliderFilter = _interopRequireDefault(require("./facets/SliderFilter"));

var _SearchBarFilter = _interopRequireDefault(require("./facets/SearchBarFilter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//import TimeIntervalFilter from "./facets/TimeIntervalFilter";
// TODO: possible todo : instances should be in a central state store (redux) such that when components such as filters
//                      update them you don't need to pass them down to all the filters.
//                      Every filter should be able to trigger an action modifying the component on change/filtering
//                      PatternInstancesNetwork observe those instances in the central state and rerender when modified
// TODO : actually we are receiving not instances but node of instance and reconstructing data here
//         every node of props.instances is a node of the instance not the instance itself
function PatternInstancesNetwork(props) {
  // graphRef for mix React virtual DOM and graphin imperative operation on DOM
  var graphRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(new _Graph["default"]()),
      _useState2 = _slicedToArray(_useState, 2),
      graph = _useState2[0],
      setGraph = _useState2[1]; // parse instances. This is the initial state of this component


  var instances = (0, _generics.defineProp)(props.patterns.instances, []);
  var initialStartTime = 1400;
  var initialEndTime = 1450; // filtering instances !

  instances = instances.filter(function (instance) {
    if (instance.pattern === "https://w3id.org/arco/ontology/location/time-indexed-typed-location") {
      console.log("time index instance");
      console.log(instance);

      if (instance.startTime === "") {
        instance.startTime = initialStartTime;
        initialStartTime++;
      }

      if (instance.endTime === "") {
        instance.endTime = initialEndTime;
        initialEndTime++;
      }

      return instance.lat !== "" && instance["long"] !== "" || instance.type === "https://w3id.org/italia/onto/TI/TimeInterval" // instance.startTime !== ""
      ;
    }

    if (instance.pattern === "https://w3id.org/arco/ontology/denotative-description/measurement-collection") {
      return instance;
    }

    if (instance.pattern === "https://w3id.org/arco/ontology/location/cultural-property-component-of") {
      return instance;
    }
  });
  console.log("Cleaned instances:");
  console.log(instances); // a list of instances and degree for each instance

  var instancesList = new _InstancesList["default"](instances); // pass this to Layout component to have a panel to switch layouts

  var layoutHandler = (0, _ldUiHooks.useLayout)();
  instances.sort(function (b, a) {
    return a.locationType > b.locationType ? 1 : b.locationType > a.locationType ? -1 : 0;
  }); // add instances to Graph

  graph.addNodes(instances.map(function (instance) {
    return {
      id: instance.instance,
      data: instance
    };
  }));
  (0, _react.useEffect)(function () {
    // TODO: set a color for each instance, set size based on node degree
    var filter = function filter(node, id) {
      // node.style.primaryColor = graph.nodeGradient()[id];
      node.style.primaryColor = props.color;
      var degree = instancesList.getPatternInstanceDegree(node.id); // compute dynamically max and min degree

      node.style.nodeSize = Math.round((0, _math.scaleData)(degree, 1, 50, 12, 70));
    };

    graph.breadthFirstSearch(filter);
  }, []); // on instance doubleclick visualize instance

  (0, _ldUiHooks.useGraphinDoubleClick)(graphRef, props.getInstance); ////////// TODO : ALL THIS LOGIC SHOULD BE MOVED OUTSIDE !
  //////////        THIS IS RELATED TO DEFINE A GOOD INTERFACE FOR THIS COMPONENT
  //////////        THIS COMPONENT SHOULD RECEIVE ALL THE INSTANCES AND FOR EVERY INSTANCE YOU SHOULD HAVE DATA !
  //////////        DATA OF THE SINGLE INSTANCE MUST GO HERE AND ARE ALREADY AVAILABLE WHEN YOU GO TO VISUALIZE
  //////////        OR AT LEAST MINIMUM REQUIRED DATA TO MAKE FILTERS TO WORK !

  var locationTypes = graph.nodes.map(function (node) {
    return node.data.locationType;
  }); // count location occurrences

  var counts = {};

  for (var j = 0; j < locationTypes.length; j++) {
    var num = locationTypes[j];
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  var hardcodedPatternIf = instances && instances[0] ? instances[0].pattern : null;
  var i = 0;
  var properties = Object.keys(counts).map(function (locationType) {
    i = i + 1;
    return {
      title: locationType.split("/").slice(-1)[0],
      value: counts[locationType],
      color: graph.nodeGradient()[i],
      uri: locationType
    };
  });

  var handleLocationTypeFilter = function handleLocationTypeFilter(filterNodes) {
    graph.addFilter({
      key: "locationType",
      mask: filterNodes,
      "class": "cat"
    });
    var newData = new _Graph["default"](graph.nodes, graph.edges, graph.filters);
    setGraph(newData);
  }; // min/max


  var measRange = [0, 1];
  var partRange = [0, 1];
  var measOccurencesFreq = [];
  var partsOccurrencesFreq = [];
  graph.nodes.forEach(function (node) {
    var measurements = instancesList.getAggregateCount("https://w3id.org/arco/ontology/denotative-description/Measurement", node.id);
    var parts = instancesList.getAggregateCount("https://w3id.org/arco/ontology/arco/CulturalPropertyComponent", // HERE
    node.id);
    node.data.measurements = measurements;
    node.data.parts = parts;
    measOccurencesFreq.push(measurements);
    partsOccurrencesFreq.push(parts);
  });
  measRange = [Math.min.apply(Math, measOccurencesFreq), Math.max.apply(Math, measOccurencesFreq)];
  partRange = [Math.min.apply(Math, partsOccurrencesFreq), Math.max.apply(Math, partsOccurrencesFreq)];

  var handleSliderFilterMeasurements = function handleSliderFilterMeasurements(range) {
    graph.addFilter({
      key: "measurements",
      range: range,
      "class": "num"
    });
    var newData = new _Graph["default"](graph.nodes, graph.edges, graph.filters);
    setGraph(newData);
  };

  var handleSliderFilterParts = function handleSliderFilterParts(range) {
    graph.addFilter({
      key: "parts",
      range: range,
      "class": "num"
    });
    var newData = new _Graph["default"](graph.nodes, graph.edges, graph.filters);
    setGraph(newData);
  };

  var handleTimeFilter = function handleTimeFilter(filterNodes) {
    graph.addFilter({
      key: "instance",
      mask: filterNodes,
      "class": "time"
    });
    var newData = new _Graph["default"](graph.nodes, graph.edges, graph.filters);
    setGraph(newData);
  };

  var handleSearchFilter = function handleSearchFilter(search) {
    graph.addFilter({
      key: "siteAddress",
      mask: search,
      "class": "search"
    });
    var newData = new _Graph["default"](graph.nodes, graph.edges, graph.filters);
    setGraph(newData);
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: graphContainerStyle
  }, /*#__PURE__*/_react["default"].createElement(_PatternMenu["default"], {
    layoutHandler: layoutHandler
  }, hardcodedPatternIf === "https://w3id.org/arco/ontology/location/time-indexed-typed-location" ? /*#__PURE__*/_react["default"].createElement(_TimeIntervalFilter["default"], {
    instances: instances,
    title: "Filter by time interval",
    onFilter: handleTimeFilter
  }) : null, hardcodedPatternIf === "https://w3id.org/arco/ontology/location/time-indexed-typed-location" ? /*#__PURE__*/_react["default"].createElement(_SearchBarFilter["default"], {
    title: "Filter by address",
    onFilter: handleSearchFilter
  }) : null, hardcodedPatternIf === "https://w3id.org/arco/ontology/location/time-indexed-typed-location" ? /*#__PURE__*/_react["default"].createElement(_PropertyFilter["default"], {
    title: "Filter by location type",
    properties: properties,
    onFilter: handleLocationTypeFilter
  }) : null, hardcodedPatternIf === "https://w3id.org/arco/ontology/denotative-description/measurement-collection" ? /*#__PURE__*/_react["default"].createElement(_SliderFilter["default"], {
    title: "Filter by number of measurements",
    onFilter: handleSliderFilterMeasurements,
    domain: measRange
  }) : null, hardcodedPatternIf === "https://w3id.org/arco/ontology/location/cultural-property-component-of" ? /*#__PURE__*/_react["default"].createElement(_SliderFilter["default"], {
    title: "Filter by parts",
    onFilter: handleSliderFilterParts,
    domain: partRange
  }) : null), /*#__PURE__*/_react["default"].createElement(_graphin["default"], {
    data: graph.toVisual(),
    layout: layoutHandler.name,
    ref: graphRef
  }));
} // TODO: pass this to global theme useContext react mechanism


var graphContainerStyle = {
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  margin: "auto"
};
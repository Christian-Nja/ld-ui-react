"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBinaryState = useBinaryState;
exports.useBinaryArrayState = useBinaryArrayState;
exports.useMap = useMap;
exports.usePane = usePane;
exports.useLayout = useLayout;
exports.useGraphinDoubleClick = useGraphinDoubleClick;
exports.useGraphinHover = useGraphinHover;
exports.useWindowDimensions = useWindowDimensions;

var _react = require("react");

var _generics = require("../../utilities/generics");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* LD-UI-REACT
_____________________________________________________________ */

/**
 * @description A function to invert binary state.
 * @example 
 *  const [open, handleOpen] = useBinaryState(false)
 *  const [isLoaded, handleLoaded] = useBinaryState(true) 

 * @author Christian Colonna
 * @date 22-11-2020
 * @export
 * @param {boolean} [open=false]
 * @returns {function} the handler arrow function to change state set it onClick|Hover.. listeners
 */
function useBinaryState() {
  var startOpen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  var _useState = (0, _react.useState)(startOpen),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var handleOpen = function handleOpen() {
    var newOpen = !open;
    setOpen(newOpen);
  };

  return [open, handleOpen];
}
/**
 * @description An hook for array with binary values
 *              Returns a function to update the state.
 *              Function accept an element as arg, if element is in state
 *              array it removes it else it add it.
 * @author Christian Colonna
 * @date 30-11-2020
 * @export
 * @param {any[]} [initialArg=[]] initial state
 * @returns {(item: any)=>{}} if item is in state array remove it else add it
 */


function useBinaryArrayState() {
  var initialArg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var _useState3 = (0, _react.useState)(initialArg),
      _useState4 = _slicedToArray(_useState3, 2),
      state = _useState4[0],
      setState = _useState4[1];

  var updateState = function updateState(index) {
    state.includes(index) ? // index in array then pull out
    setState(state.filter(function (item) {
      return item !== index;
    })) : // index not in array then push in
    setState(function (state) {
      return [].concat(_toConsumableArray(state), [index]);
    });
  };

  return [state, updateState];
}
/* LEAFLET
_____________________________________________________________ */

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
    mapRef.current = L.map("map", {
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

    mapRef.current.getPane(paneName).style.pointerEvents = "none";
  }, []);
}
/* GRAPHIN
_____________________________________________________________ */

/**
 * @description A hook for Graphin visualization library. Returns layout and a function to set layout.
 * @author Christian Colonna
 * @date 10-11-2020
 * @export
 * @param {Object} baseLayout
 * @param {string} [baseLayout.name=force]
 * @param {Object} [baseLayout.options={}]
 * @returns {Object} layoutHandler
 */


function useLayout(baseLayout) {
  var defaultLayout = (0, _generics.defineProp)(baseLayout, {
    name: "force",
    options: {}
  });

  var _useState5 = (0, _react.useState)(defaultLayout),
      _useState6 = _slicedToArray(_useState5, 2),
      layout = _useState6[0],
      _setLayout = _useState6[1];

  return {
    name: layout,
    setLayout: function setLayout(newLayout) {
      _setLayout(_objectSpread(_objectSpread({}, layout), {}, {
        name: newLayout
      }));
    }
  };
}
/**
 * @description A hook for Graphin visualization library. Bind filter function on node doubleclick
 * @author Christian Colonna
 * @date 16-11-2020
 * @export
 * @param {*} graphRef
 * @param {callback} filter (node) => {}
 */


function useGraphinDoubleClick(graphRef, filter) {
  (0, _react.useEffect)(function () {
    var graph = graphRef.current.graph;

    var handleNodeDoubleClick = function handleNodeDoubleClick(e) {
      var node = e.item._cfg;
      if (node.model.data.occurences !== 0) filter(node);
    };

    graph.on("node:dblclick", handleNodeDoubleClick); // release listener when component unmount

    return function () {
      graph.off("node:dblclick", handleNodeDoubleClick);
    };
  }, []);
}

function useGraphinHover(graphRef) {
  (0, _react.useEffect)(function () {
    var graph = graphRef.current.graph;

    var clearAllStats = function clearAllStats() {
      graph.setAutoPaint(false);
      graph.getNodes().forEach(function (node) {
        graph.clearItemStates(node);
      });
      graph.getEdges().forEach(function (edge) {
        graph.clearItemStates(edge);
      });
      graph.paint();
      graph.setAutoPaint(true);
    };

    var onMouseEnter = function onMouseEnter(e) {
      var item = e.item;
      graph.setAutoPaint(false);
      graph.getNodes().forEach(function (node) {
        graph.clearItemStates(node);
        graph.setItemState(node, "highlight.dark", true);
      });
      graph.setItemState(item, "highlight.dark", false);
      graph.setItemState(item, "highlight.light", true);
      graph.getEdges().forEach(function (edge) {
        if (edge.getSource() === item) {
          graph.setItemState(edge.getTarget(), "highlight.dark", false);
          graph.setItemState(edge.getTarget(), "highlight.light", true);
          graph.setItemState(edge, "highlight.light", true);
          edge.toFront();
        } else if (edge.getTarget() === item) {
          graph.setItemState(edge.getSource(), "highlight.dark", false);
          graph.setItemState(edge.getSource(), "highlight.light", true);
          graph.setItemState(edge, "highlight.light", true);
          edge.toFront();
        } else {
          graph.setItemState(edge, "highlight.light", false);
        }
      });
      graph.paint();
      graph.setAutoPaint(true);
    };

    graph.on("node:mouseenter", onMouseEnter);
    graph.on("node:mouseleave", clearAllStats);
    graph.on("canvas:click", clearAllStats);
    return function () {
      graph.off("node:mouseenter", onMouseEnter);
      graph.on("node:mouseleave", clearAllStats);
      graph.on("canvas:click", clearAllStats);
    };
  }, []);
}
/* GENERICS
_____________________________________________________________ */

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
  var _useState7 = (0, _react.useState)(getWindowDimensions()),
      _useState8 = _slicedToArray(_useState7, 2),
      windowDimensions = _useState8[0],
      setWindowDimensions = _useState8[1];

  (0, _react.useEffect)(function () {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return function () {
      return window.removeEventListener("resize", handleResize);
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
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = PropertyFilter;

var _react = _interopRequireWildcard(require("react"));

var _reactMinimalPieChart = require("react-minimal-pie-chart");

var _ldUiHooks = require("../../hooks/ld-ui-hooks");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * @description Filter data
 * @author Christian Colonna
 * @date 29-11-2020
 * @export
 * @param {[{ label : string, count : number, color : string, uri : string
 * }]} {Object[]} { properties } label: Property label, count: number of instances, color: color
 * @param {function} onFilter callback is called every time change filtered array,
 *                            it receives as argument the array of element filtered out.
 *                            Array contains index of the element as it passed as input to the filter.
 * @returns {JSX.Element}
 */
function PropertyFilter(_ref) {
  var properties = _ref.properties,
      _ref$onFilter = _ref.onFilter,
      onFilter = _ref$onFilter === void 0 ? function (filtered) {} : _ref$onFilter;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      hovered = _useState2[0],
      setHovered = _useState2[1];

  var _useBinaryArrayState = (0, _ldUiHooks.useBinaryArrayState)([]),
      _useBinaryArrayState2 = _slicedToArray(_useBinaryArrayState, 2),
      filtered = _useBinaryArrayState2[0],
      setFiltered = _useBinaryArrayState2[1];

  (0, _react.useEffect)(function () {
    console.log(filtered);
    onFilter(filtered);
  }, [filtered]);
  var data = properties.map(function (entry) {
    return _objectSpread(_objectSpread({}, entry), {}, {
      color: filtered.includes(entry.uri) ? "grey" : entry.color
    });
  });
  return /*#__PURE__*/_react["default"].createElement(_reactMinimalPieChart.PieChart, {
    lengthAngle: -360,
    animate: true,
    paddingAngle: 1,
    data: data,
    label: function label() {
      return data[hovered] ? data[hovered].value : null;
    },
    segmentsStyle: {
      transition: "stroke .3s",
      cursor: "pointer"
    },
    labelStyle: {
      fontSize: "20px",
      fontFamily: "sans-serif",
      fill: data[hovered] ? data[hovered].color : null
    },
    onMouseOver: function onMouseOver(_, index) {
      setHovered(index);
    },
    onMouseOut: function onMouseOut() {
      setHovered(null);
    },
    onClick: function onClick(_, index) {
      setFiltered(data[index].uri);
    },
    lineWidth: 30,
    labelPosition: 0
  });
}
/**
 * node.id  ----> id del pattern  WRONG come dice misael c'è già il node
 *
 * { nodi con varie proprietà
 * }
 *
 * filtro
 * {
 *  proprietà : id
 * }
 *
 *
 * graph.filter(nodi.data)
 *
 * ritorna tutti nodi con la proprietà non selezionata
 *
 */